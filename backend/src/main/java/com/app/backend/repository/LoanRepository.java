package com.app.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.Loan;

public interface LoanRepository extends JpaRepository <Loan, String>{

}
