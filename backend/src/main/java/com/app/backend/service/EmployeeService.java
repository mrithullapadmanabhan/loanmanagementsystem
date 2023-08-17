package com.app.backend.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.backend.communication.request.EmployeeRegisterRequest;
import com.app.backend.communication.response.EmployeeRegisterResponse;
import com.app.backend.model.Employee;
import com.app.backend.model.RoleEnum;
import com.app.backend.model.User;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.repository.RoleRepository;
import com.app.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    
	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;

    
	public EmployeeRegisterResponse register(EmployeeRegisterRequest request) {
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
            .roles(List.of(roleRepository.findByName(RoleEnum.USER).orElseThrow()))
            .employee(employee)
            .build();

        userRepository.save(user);

        return EmployeeRegisterResponse.builder()
            .employeeID(employee.getId())
            .build();
    }
}
