package com.app.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.Loan;


public interface LoanRepository extends JpaRepository <Loan, UUID> {}