package com.app.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.communication.request.LoanCreationRequest;
import com.app.backend.communication.response.LoanCreationResponse;
import com.app.backend.model.EmployeeLoan;
import com.app.backend.service.EmployeeLoanService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/loan")
@CrossOrigin
@RequiredArgsConstructor
public class EmployeeLoanController {
    
    private final EmployeeLoanService employeeLoanService;

    @GetMapping("/")
    public List<EmployeeLoan> get() {
        return employeeLoanService.get();
    }

    @GetMapping("/employee/{employeeID}")
    public List<EmployeeLoan> get(@PathVariable("employeeID") UUID employeeID) {
        return employeeLoanService.get(employeeID);
    }

    @PostMapping("/create")
    public ResponseEntity<LoanCreationResponse> create(@RequestBody LoanCreationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeLoanService.create(request));
    }

    @GetMapping("/{loanCardID}/status/completed")
    public ResponseEntity<String> markCompleted(@PathVariable("loanCardID") UUID employeeCardID) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Updated Successfully");
    }

}
