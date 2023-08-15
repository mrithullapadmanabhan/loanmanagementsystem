package com.app.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.communication.request.EmployeeRegisterRequest;
import com.app.backend.communication.response.EmployeeRegisterResponse;
import com.app.backend.service.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService service;

    @PostMapping("/register")
    public ResponseEntity<EmployeeRegisterResponse> register(
        @Valid @RequestBody EmployeeRegisterRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.register(request));
    }

}
