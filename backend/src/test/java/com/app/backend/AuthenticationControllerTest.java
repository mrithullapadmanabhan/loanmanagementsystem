package com.app.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.app.backend.communication.request.JWTLoginRequest;
import com.app.backend.communication.request.JWTRefreshRequest;
import com.app.backend.communication.response.JWTResponse;
import com.app.backend.model.Role;
import com.app.backend.model.RoleEnum;
import com.app.backend.service.CategoryService;
import com.app.backend.service.EmployeeLoanService;
import com.app.backend.service.EmployeeService;
import com.app.backend.service.ItemCardService;
import com.app.backend.service.LoanCardService;
import com.app.backend.service.MakeService;
import com.app.backend.service.auth.AuthenticationService;
import com.app.backend.service.auth.JWTService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@RunWith(SpringRunner.class)
@WebMvcTest
@AutoConfigureMockMvc(addFilters = false)
public class AuthenticationControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private CategoryService categoryService;

    @MockBean
    private EmployeeLoanService employeeLoanService;

    @MockBean
    private EmployeeService employeeService;

    @MockBean
    private ItemCardService itemCardService;

    @MockBean
    private LoanCardService loanCardService;

    @MockBean
    private MakeService makeService;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private JWTService jwtService;

    ObjectMapper mapper = new ObjectMapper()
            .findAndRegisterModules()
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    @Test
    public void loginTest() throws Exception {

        JWTLoginRequest jwtLoginRequest = new JWTLoginRequest("username@gmail.com", "Password123*");
        String accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2h1dG9zaHNocm01MjlAZ21haWwuY29tIiwiaWF0IjoxNjkyNjk2ODU0LCJleHAiOjE2OTI2OTc0NTR9.VpWwD2phNbMVMIB87AplHAP59g2wX0N5qgL0RUZEg3w";
        String refreshToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2h1dG9zaHNocm01MjlAZ21haWwuY29tIiwiaWF0IjoxNjkyNjk2ODU0LCJleHAiOjE2OTI3MDA0NTR9.gJzGfE8cq98dR9Su466mFMQ-0syeQxcsjs3ILzakVAg";
        Role role = new Role();
        role.setId(UUID.randomUUID());
        role.setName(RoleEnum.USER);
        List<Role> roles = new ArrayList<Role>();
        roles.add(role);
        UUID id = UUID.randomUUID();
        JWTResponse jwtResponse = new JWTResponse(accessToken, refreshToken, roles, id);

        Mockito.when(authenticationService.login(jwtLoginRequest)).thenReturn(jwtResponse);

        String loginRequestString = mapper.writeValueAsString(jwtLoginRequest);
        String jwtResponseString = mapper.writeValueAsString(jwtResponse);

        MvcResult requestResult = mvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8")
                .content(loginRequestString))
                .andExpect(status().isOk())
                .andReturn();

        String loginRequestResult = requestResult.getResponse().getContentAsString();
        assertEquals(jwtResponseString, loginRequestResult);
    }

    @Test
    public void refreshTest() throws Exception {

        JWTRefreshRequest jwtRefreshRequest = new JWTRefreshRequest(
                "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2h1dG9zaHNocm01MjlAZ21haWwuY29tIiwiaWF0IjoxNjkyNjk2ODU0LCJleHAiOjE2OTI3MDA0NTR9.gJzGfE8cq98dR9Su466mFMQ-0syeQxcsjs3ILzakVAg");
        String accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2h1dG9zaHNocm01MjlAZ21haWwuY29tIiwiaWF0IjoxNjkyNjk2ODU0LCJleHAiOjE2OTI2OTc0NTR9.VpWwD2phNbMVMIB87AplHAP59g2wX0N5qgL0RUZEg3w";
        String refreshToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2h1dG9zaHNocm01MjlAZ21haWwuY29tIiwiaWF0IjoxNjkyNjk2ODU0LCJleHAiOjE2OTI3MDA0NTR9.gJzGfE8cq98dR9Su466mFMQ-0syeQxcsjs3ILzakVAg";
        Role role = new Role();
        role.setId(UUID.randomUUID());
        role.setName(RoleEnum.USER);
        List<Role> roles = new ArrayList<Role>();
        roles.add(role);
        UUID id = UUID.randomUUID();
        JWTResponse jwtResponse = new JWTResponse(accessToken, refreshToken, roles, id);

        Mockito.when(authenticationService.refresh(jwtRefreshRequest)).thenReturn(jwtResponse);

        String refreshRequestString = mapper.writeValueAsString(jwtRefreshRequest);
        String jwtResponseString = mapper.writeValueAsString(jwtResponse);

        MvcResult requestResult = mvc.perform(post("/api/auth/refresh")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8")
                .content(refreshRequestString))
                .andExpect(status().isOk())
                .andReturn();

        String refreshRequestResult = requestResult.getResponse().getContentAsString();
        assertEquals(jwtResponseString, refreshRequestResult);
    }
}