package com.app.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.EmployeeLoan;
import com.app.backend.model.ItemCard;
import com.app.backend.model.LoanCard;

public interface EmployeeLoanRepository extends JpaRepository<EmployeeLoan, UUID> {

    List<EmployeeLoan> findByItem(ItemCard itemCard);

    List<EmployeeLoan> findByLoan(LoanCard loanCard);
}
