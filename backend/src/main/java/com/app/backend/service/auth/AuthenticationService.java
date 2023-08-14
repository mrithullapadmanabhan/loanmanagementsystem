package com.app.backend.service.auth;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.backend.communication.request.JWTLoginRequest;
import com.app.backend.communication.request.JWTRefreshRequest;
import com.app.backend.communication.request.UserRegisterRequest;
import com.app.backend.communication.response.JWTResponse;
import com.app.backend.model.Employee;
import com.app.backend.model.RoleEnum;
import com.app.backend.model.User;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.repository.RoleRepository;
import com.app.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final EmployeeRepository employeeRepository;

    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public JWTResponse login(JWTLoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        User user = repository.findByEmail(request.getEmail()).orElseThrow();
        
        return authResponse(user);
    }

    public JWTResponse refresh(JWTRefreshRequest request) {
        String refreshToken = request.getRefreshToken();
        String userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null) {
            User user = repository.findByEmail(userEmail).orElseThrow();

            if (jwtService.isTokenValid(refreshToken, user)) {
                return authRefreshResponse(user, refreshToken);
            }
        }

        return null;
    }

    public JWTResponse register(UserRegisterRequest request) {
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

        repository.save(user);

        return authResponse(user);
    }

    private JWTResponse authResponse(User user) {
        String jwtRefreshToken = jwtService.generateRefreshToken(user);

        return authRefreshResponse(user, jwtRefreshToken);
    }

    private JWTResponse authRefreshResponse(User user, String refreshToken) {
        String jwtToken = jwtService.generateToken(user);

        return JWTResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
    }

}
