package com.app.backend.service.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.app.backend.communication.request.JWTLoginRequest;
import com.app.backend.communication.request.JWTRefreshRequest;
import com.app.backend.communication.response.JWTResponse;
import com.app.backend.exception.ResourceNotFoundException;
import com.app.backend.model.User;
import com.app.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImplementation implements AuthenticationService {

    private final UserRepository repository;

    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public JWTResponse login(JWTLoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist"));

        return authResponse(user);
    }

    @Override
    public JWTResponse refresh(JWTRefreshRequest request) {
        String refreshToken = request.getRefreshToken();
        String userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null) {
            User user = repository.findByEmail(userEmail)
                    .orElseThrow(() -> new ResourceNotFoundException("User does not exist"));

            if (jwtService.isTokenValid(refreshToken, user)) {
                return authRefreshResponse(user, refreshToken);
            }
        }

        return null;
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
                .userRoles(user.getRoles())
                .employeeID(user.getEmployee() != null ? user.getEmployee().getId() : null)
                .build();
    }

}
