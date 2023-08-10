package com.app.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.dao.LoanRepository;
import com.app.backend.model.Loan;

@Service
public class LoanService {
	@Autowired
	LoanRepository loanRepository;
	
	public Loan saveLoan(Loan loan)
	{
		Loan obj=loanRepository.save(loan);
		return obj;
		
	}
}