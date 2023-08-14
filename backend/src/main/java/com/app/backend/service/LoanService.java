package com.app.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.model.Loan;
import com.app.backend.repository.LoanRepository;

@Service
public class LoanService {
	@Autowired
	LoanRepository loanRepository;
	
	public Loan saveLoan(Loan loan)
	{
		Loan obj=loanRepository.save(loan);
		return obj;
		
	}
	
	public List<Loan> getLoan(){
		List<Loan> loanList = loanRepository.findAll();
		return loanList;
	}
}