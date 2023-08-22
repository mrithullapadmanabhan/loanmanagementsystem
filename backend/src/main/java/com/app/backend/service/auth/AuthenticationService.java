package com.app.backend.service.auth;

import com.app.backend.communication.request.JWTLoginRequest;
import com.app.backend.communication.request.JWTRefreshRequest;
import com.app.backend.communication.response.JWTResponse;

public interface AuthenticationService {

    public abstract JWTResponse login(JWTLoginRequest request);

    public abstract JWTResponse refresh(JWTRefreshRequest request);

}
