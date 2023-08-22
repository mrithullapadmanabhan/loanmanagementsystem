package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import com.app.backend.communication.request.EmployeeCreateUpdateRequest;
import com.app.backend.communication.response.EmployeeResponse;

import jakarta.validation.Valid;

public interface EmployeeService {

    public abstract List<EmployeeResponse> get();

    public abstract EmployeeResponse get(UUID id);

    public abstract EmployeeResponse create(@Valid EmployeeCreateUpdateRequest request);

    public abstract EmployeeResponse update(UUID id, @Valid EmployeeCreateUpdateRequest request);

    public abstract String delete(UUID id);

}
