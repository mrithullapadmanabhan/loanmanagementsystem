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

import com.app.backend.communication.request.LoanCardCreateUpdateRequest;
import com.app.backend.model.LoanCard;
import com.app.backend.service.LoanCardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/loancard")
@CrossOrigin
@RequiredArgsConstructor
public class LoanCardController {

	private final LoanCardService service;

	@GetMapping("")
	public ResponseEntity<List<LoanCard>> get() {
		return ResponseEntity.ok(service.get());
	}

	@GetMapping("/{id}")
	public ResponseEntity<LoanCard> get(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(service.get(id));
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/create")
	public ResponseEntity<LoanCard> create(@Valid @RequestBody LoanCardCreateUpdateRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body((service.create(request)));
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<LoanCard> update(
			@PathVariable("id") UUID id,
			@Valid @RequestBody LoanCardCreateUpdateRequest request) {
		return ResponseEntity.ok(service.update(id, request));
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(
			@PathVariable("id") UUID id) {
		service.delete(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
	}

}