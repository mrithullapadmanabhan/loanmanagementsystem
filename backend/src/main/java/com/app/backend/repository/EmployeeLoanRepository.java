package com.app.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.EmployeeLoan;

public interface EmployeeLoanRepository extends JpaRepository<EmployeeLoan, UUID> {}
