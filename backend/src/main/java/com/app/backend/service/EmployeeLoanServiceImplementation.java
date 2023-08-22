package com.app.backend.service;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

import org.modelmapper.TypeMap;
import org.springframework.stereotype.Service;

import com.app.backend.communication.request.LoanCreateRequest;
import com.app.backend.communication.response.EmployeeLoanResponse;
import com.app.backend.exception.ResourceNotFoundException;
import com.app.backend.model.Employee;
import com.app.backend.model.EmployeeLoan;
import com.app.backend.model.ItemCard;
import com.app.backend.model.LoanCard;
import com.app.backend.model.LoanStatusEnum;
import com.app.backend.model.Make;
import com.app.backend.repository.EmployeeLoanRepository;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.repository.ItemCardRepository;
import com.app.backend.repository.LoanCardRepository;
import com.app.backend.repository.MakeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeLoanServiceImplementation implements EmployeeLoanService {

	private final EmployeeLoanRepository employeeLoanRepository;

	private final EmployeeRepository employeeRepository;
	private final LoanCardRepository loanCardRepository;
	private final MakeRepository makeRepository;
	private final ItemCardRepository itemCardRepository;

	private final TypeMap<EmployeeLoan, EmployeeLoanResponse> mapper;

	@Override
	public List<EmployeeLoanResponse> get() {
		return employeeLoanRepository.findAll().stream().map(loan -> mapper.map(loan)).toList();
	}

	@Override
	public List<EmployeeLoanResponse> get(UUID employeeID) {
		Employee employee = employeeRepository.findById(employeeID)
				.orElseThrow(() -> new ResourceNotFoundException(
						"Employee with this ID does not exist"));
		return employee.getLoans().stream().map(loan -> mapper.map(loan)).toList();
	}

	@Transactional
	@Override
	public EmployeeLoanResponse create(LoanCreateRequest request) {
		Make make = makeRepository.findById(request.getMakeID())
				.orElseThrow(() -> new ResourceNotFoundException("Make with this ID does not exist"));
		LoanCard loanCard = loanCardRepository.findByCategory(make.getCategory())
				.orElseThrow(() -> new ResourceNotFoundException(
						"LoanCard with this ID does not exist"));
		ItemCard itemCard = itemCardRepository.findByMake(make)
				.orElseThrow(() -> new ResourceNotFoundException(
						"ItemCard with this ID does not exist"));
		Employee employee = employeeRepository.findById(request.getEmployeeID())
				.orElseThrow(() -> new ResourceNotFoundException(
						"Employee with this ID does not exist"));

		EmployeeLoan loan = EmployeeLoan.builder()
				.issueDate(new Date(System.currentTimeMillis()))
				.status(LoanStatusEnum.STARTED)
				.loan(loanCard)
				.item(itemCard)
				.employee(employee)
				.build();

		return mapper.map(employeeLoanRepository.save(loan));
	}

	@Override
	public EmployeeLoanResponse setCompleted(UUID employeeLoanID) {
		EmployeeLoan loan = employeeLoanRepository.findById(employeeLoanID)
				.orElseThrow(() -> new ResourceNotFoundException(
						"Employee with this ID does not exist"));
		loan.setStatus(LoanStatusEnum.COMPLETED);

		return mapper.map(employeeLoanRepository.save(loan));
	}

}
