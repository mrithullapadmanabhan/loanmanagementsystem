package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import com.app.backend.communication.request.EmployeeCreateUpdateRequest;
import com.app.backend.model.Employee;

import jakarta.validation.Valid;

public interface EmployeeService {

    public abstract List<Employee> get();

    public abstract Employee get(UUID id);

    public abstract Employee create(@Valid EmployeeCreateUpdateRequest request);

    public abstract Employee update(UUID id, @Valid EmployeeCreateUpdateRequest request);

    public abstract String delete(UUID id);

}
