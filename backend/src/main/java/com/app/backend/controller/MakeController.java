package com.app.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.communication.request.MakeCreateUpdateRequest;
import com.app.backend.communication.response.MakeResponse;
import com.app.backend.service.MakeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/make")
@CrossOrigin
@RequiredArgsConstructor
public class MakeController {

	private final MakeService service;

	@GetMapping("")
	public ResponseEntity<List<MakeResponse>> get() {
		return ResponseEntity.ok(service.get());
	}

	@GetMapping("/{id}")
	public ResponseEntity<MakeResponse> get(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(service.get(id));
	}

	@GetMapping("/category/{categoryID}")
	public ResponseEntity<List<MakeResponse>> getByCategory(@PathVariable("categoryID") UUID categoryID) {
		return ResponseEntity.ok(service.getByCategory(categoryID));
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("")
	public ResponseEntity<MakeResponse> create(
			@Valid @RequestBody MakeCreateUpdateRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<MakeResponse> update(
			@PathVariable("id") UUID id,
			@Valid @RequestBody MakeCreateUpdateRequest request) {
		return ResponseEntity.ok(service.update(id, request));
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(
			@PathVariable("id") UUID id) {
		service.delete(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
	}

}
