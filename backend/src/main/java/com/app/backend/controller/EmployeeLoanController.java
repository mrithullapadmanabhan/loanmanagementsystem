package com.app.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.communication.request.LoanCreateRequest;
import com.app.backend.communication.response.EmployeeLoanResponse;
import com.app.backend.service.EmployeeLoanService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/loan")
@CrossOrigin
@RequiredArgsConstructor
public class EmployeeLoanController {

    private final EmployeeLoanService service;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("")
    public ResponseEntity<List<EmployeeLoanResponse>> get() {
        return ResponseEntity.ok(service.get());
    }

    @GetMapping("/employee/{employeeID}")
    public ResponseEntity<List<EmployeeLoanResponse>> get(@PathVariable("employeeID") UUID employeeID) {
        return ResponseEntity.ok(service.get(employeeID));
    }

    @PostMapping("")
    public ResponseEntity<EmployeeLoanResponse> create(@Valid @RequestBody LoanCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}/status/completed")
    public ResponseEntity<EmployeeLoanResponse> markCompleted(@PathVariable("id") UUID id) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.setCompleted(id));
    }

}
