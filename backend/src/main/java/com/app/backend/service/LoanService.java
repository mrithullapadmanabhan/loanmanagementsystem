package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.backend.communication.request.LoanCreationRequest;
import com.app.backend.communication.response.LoanCreationResponse;
import com.app.backend.model.Employee;
import com.app.backend.model.Item;
import com.app.backend.model.Loan;
import com.app.backend.model.LoanStatusEnum;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.repository.ItemRepository;
import com.app.backend.repository.LoanRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoanService {
	
	private final LoanRepository loanRepository;

	private final EmployeeRepository employeeRepository;
	private final ItemRepository itemRepository;


	public LoanCreationResponse addLoan(LoanCreationRequest request) {
		Employee employee = employeeRepository.findById(request.getEmployeeID()).orElseThrow();
		Item item = itemRepository.findById(request.getItem_id()).orElseThrow();

		Loan loan = Loan.builder()
			.duration(request.getDuration())
			.employee(employee)
			.item(item)
			.status(LoanStatusEnum.STARTED)
			.build();

		loanRepository.save(loan);

		return LoanCreationResponse.builder()
			.loanID(loan.getId())
			.build();
	}

	public Loan getLoan(UUID loanID) {
		return loanRepository.findById(loanID).orElseThrow();
	}

	public void markCompleted(UUID loanID) {
		Loan loan = loanRepository.findById(loanID).orElseThrow();
		loan.setStatus(LoanStatusEnum.COMPLETED);
	}

	public List<Loan> getLoans() {
		return loanRepository.findAll();
	}

	public List<Loan> getLoans(UUID employeeID) {
		Employee employee = employeeRepository.findById(employeeID).orElseThrow();
		return employee.getLoans();
	}

}