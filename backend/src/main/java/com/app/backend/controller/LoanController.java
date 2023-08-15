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
import com.app.backend.model.Loan;
import com.app.backend.service.LoanService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/loans")
@CrossOrigin
@RequiredArgsConstructor
public class LoanController {

	private final LoanService loanService;
	
	@PostMapping("/add")
	public ResponseEntity<LoanCreationResponse> saveLoan(@RequestBody LoanCreationRequest loan)
	{
		return ResponseEntity.status(HttpStatus.CREATED).body((loanService.addLoan(loan)));
	}

	@GetMapping("/")
	public List<Loan> getLoans(){
		return loanService.getLoans();
	}

	@GetMapping("/{loanID}")
	public Loan getLoans(@PathVariable("loanID") UUID loanID){
		return loanService.getLoan(loanID);
	}

	@GetMapping("/{loanID}/complete")
	public void markLoanAsCompleted(@PathVariable("loanID") UUID loanID){
		loanService.markCompleted(loanID);
	}
	
	@GetMapping("/employee/{employeeID}")
	public List<Loan> getLoansByEmployee(@PathVariable("employeeID") UUID employeeID){
		return loanService.getLoans(employeeID);
	}

}