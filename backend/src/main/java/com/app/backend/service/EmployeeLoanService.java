package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import com.app.backend.communication.request.LoanCreateRequest;
import com.app.backend.communication.response.EmployeeLoanResponse;

import jakarta.validation.Valid;

public interface EmployeeLoanService {

    public abstract List<EmployeeLoanResponse> get();

    public abstract List<EmployeeLoanResponse> get(UUID employeeID);

    public abstract EmployeeLoanResponse create(@Valid LoanCreateRequest request);

    public abstract EmployeeLoanResponse setCompleted(UUID id);

}
