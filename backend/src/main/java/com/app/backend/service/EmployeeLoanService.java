package com.app.backend.service;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.backend.model.Employee;
import com.app.backend.model.EmployeeLoan;
import com.app.backend.model.ItemCard;
import com.app.backend.model.LoanCard;
import com.app.backend.model.LoanStatusEnum;
import com.app.backend.repository.EmployeeLoanRepository;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.repository.ItemCardRepository;
import com.app.backend.repository.LoanCardRepository;
import com.app.backend.communication.request.LoanCreationRequest;
import com.app.backend.communication.response.LoanCreationResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeLoanService {
    
    private final EmployeeLoanRepository employeeLoanRepository;

    private final EmployeeRepository employeeRepository;
    private final LoanCardRepository loanCardRepository;
    private final ItemCardRepository itemCardRepository;


    public List<EmployeeLoan> get() {
        return employeeLoanRepository.findAll();
    }

    public List<EmployeeLoan> get(UUID employeeID) {
        Employee employee = employeeRepository.findById(employeeID).orElseThrow();
        return employee.getLoans();
    }

    public LoanCreationResponse create(LoanCreationRequest request) {
        LoanCard loanCard = loanCardRepository.findByMake(request.getMakeID()).orElseThrow();
        ItemCard itemCard = itemCardRepository.findByMake(request.getMakeID()).orElseThrow();

        EmployeeLoan loan = EmployeeLoan.builder()
            .issueDate(new Date(System.currentTimeMillis()))
            .loan(loanCard)
            .item(itemCard)
            .build();

        employeeLoanRepository.save(loan);

        return LoanCreationResponse.builder()
            .loanID(loan.getId())
            .build();
    }

    public void setCompleted(UUID employeeLoanID) {
        EmployeeLoan loan = employeeLoanRepository.findById(employeeLoanID).orElseThrow();
        loan.setStatus(LoanStatusEnum.COMPLETED);
        employeeLoanRepository.save(loan);
    }

}
