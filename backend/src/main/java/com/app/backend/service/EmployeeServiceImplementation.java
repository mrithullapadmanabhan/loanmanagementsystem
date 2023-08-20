package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.backend.communication.request.EmployeeCreateUpdateRequest;
import com.app.backend.exception.ResourceNotFoundException;
import com.app.backend.model.Employee;
import com.app.backend.model.RoleEnum;
import com.app.backend.model.User;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.repository.RoleRepository;
import com.app.backend.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImplementation implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<Employee> get() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee create(@Valid EmployeeCreateUpdateRequest request) {
        Employee employee = Employee.builder()
                .name(request.getName())
                .designation(request.getDesignation())
                .department(request.getDepartment())
                .gender(request.getGender())
                .dob(request.getDob())
                .doj(request.getDoj())
                .build();

        employeeRepository.save(employee);

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(List.of(roleRepository.findByName(RoleEnum.USER)
                        .orElseThrow(() -> new ResourceNotFoundException("User Role does not exist"))))
                .employee(employee)
                .build();

        userRepository.save(user);

        return employee;
    }

    @Override
    public Employee update(UUID id, @Valid EmployeeCreateUpdateRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee with this ID doesn't exist"));

        employee.setName(request.getName());
        employee.setDesignation(request.getDesignation());
        employee.setDepartment(request.getDepartment());
        employee.setDob(request.getDob());
        employee.setDoj(request.getDoj());
        employee.setGender(request.getGender());

        User user = employee.getUser();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return employeeRepository.save(employee);
    }

    @Override
    public void delete(UUID id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee with this ID doesn't exist"));

        employeeRepository.delete(employee);
    }
}
