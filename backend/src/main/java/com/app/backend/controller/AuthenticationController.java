package com.app.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.communication.request.JWTLoginRequest;
import com.app.backend.communication.request.JWTRefreshRequest;
import com.app.backend.communication.response.JWTResponse;
import com.app.backend.service.auth.AuthenticationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/login")
    public ResponseEntity<JWTResponse> login(
            @Valid @RequestBody JWTLoginRequest request) {
        return ResponseEntity.ok(service.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JWTResponse> refresh(
            @Valid @RequestBody JWTRefreshRequest request) {
        return ResponseEntity.ok(service.refresh(request));
    }

}
