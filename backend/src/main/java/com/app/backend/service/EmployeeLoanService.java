package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import com.app.backend.communication.request.LoanCreateRequest;
import com.app.backend.model.EmployeeLoan;

import jakarta.validation.Valid;

public interface EmployeeLoanService {

    public abstract List<EmployeeLoan> get();

    public abstract List<EmployeeLoan> get(UUID employeeID);

    public abstract EmployeeLoan create(@Valid LoanCreateRequest request);

    public abstract EmployeeLoan setCompleted(UUID id);

}
