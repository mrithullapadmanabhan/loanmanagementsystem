package com.app.backend;
import com.app.backend.controller.AuthenticationController;
import com.app.backend.service.auth.AuthenticationService;
import com.app.backend.service.auth.JWTService;
import com.app.backend.communication.request.JWTLoginRequest;
import com.app.backend.communication.request.JWTRefreshRequest;
import  com.app.backend.communication.response.JWTResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;
import com.fasterxml.jackson.databind.ObjectMapper;
public class AuthenticationControllerTest {

    @Mock
    private AuthenticationService authService;

    @InjectMocks
    private AuthenticationController authController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = standaloneSetup(authController).build();
    }

    @Test
    public void testLogin() throws Exception {
        JWTLoginRequest loginRequest = new JWTLoginRequest("username", "password");
        JWTResponse jwtResponse = new JWTResponse();

        when(authService.login(loginRequest)).thenReturn(jwtResponse);

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(loginRequest)))
                .andExpect(status().isOk());
    }

    @Test
    public void testRefresh() throws Exception {
        JWTRefreshRequest refreshRequest = new JWTRefreshRequest("refreshToken");
        JWTResponse jwtResponse = new JWTResponse();

        when(authService.refresh(refreshRequest)).thenReturn(jwtResponse);

        mockMvc.perform(post("/refresh")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(refreshRequest)))
                .andExpect(status().isOk());
    }

    // Helper method to convert objects to JSON string
    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

