package com.app.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.model.Loan;
import com.app.backend.service.LoanService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class LoanController {

	private final LoanService loanService;
	
	@PostMapping("/addloan")
	public Loan saveLoan(@RequestBody Loan loan)
	{
		Loan l=loanService.saveLoan(loan);
		return l;
	}
	
	@GetMapping("/getloan")
	public List<Loan> getLoan(){
		return loanService.getLoan();
	}

}