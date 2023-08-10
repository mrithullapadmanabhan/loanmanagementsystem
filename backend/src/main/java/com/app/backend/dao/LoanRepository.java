package com.app.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.Loan;

public interface LoanRepository extends JpaRepository <Loan, String>{

}
