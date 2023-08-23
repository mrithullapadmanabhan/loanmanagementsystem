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

import com.app.backend.communication.request.ItemCardCreateUpdateRequest;
import com.app.backend.communication.response.ItemCardResponse;
import com.app.backend.service.ItemCardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/itemcard")
@CrossOrigin
@RequiredArgsConstructor
public class ItemCardController {

	private final ItemCardService service;

	@GetMapping("")
	public ResponseEntity<List<ItemCardResponse>> get() {
		return ResponseEntity.ok(service.get());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ItemCardResponse> get(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(service.get(id));
	}

	@GetMapping("/make/{makeID}")
	public ResponseEntity<ItemCardResponse> getByMake(
			@PathVariable("makeID") UUID makeID) {
		return ResponseEntity.ok(service.getByMake(makeID));
	}

	@GetMapping("/employee/{employeeID}")
	public ResponseEntity<List<ItemCardResponse>> getByEmployee(
			@PathVariable("employeeID") UUID employeeID) {
		return ResponseEntity.ok(service.getByEmployee(employeeID));
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("")
	public ResponseEntity<ItemCardResponse> create(@Valid @RequestBody ItemCardCreateUpdateRequest item) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.create(item));
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<ItemCardResponse> update(
			@PathVariable("id") UUID id,
			@Valid @RequestBody ItemCardCreateUpdateRequest request) {
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