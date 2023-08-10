package com.app.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.model.Loan;
import com.app.backend.service.LoanService;

@RestController
@CrossOrigin("http://localhost:3000")
public class LoanController {
	@Autowired
	LoanService loanService;
	
	@PostMapping("/addloan")
	public Loan saveLoan(@RequestBody Loan loan)
	{
		Loan l=loanService.saveLoan(loan);
		return l;
	}

}