package com.app.backend;

// import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.app.backend.communication.request.LoanCreationRequest;
import com.app.backend.communication.response.LoanCreationResponse;
import com.app.backend.model.EmployeeLoan;
import com.app.backend.repository.CategoryRepository;
import com.app.backend.repository.EmployeeLoanRepository;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.repository.ItemCardRepository;
import com.app.backend.repository.LoanCardRepository;
import com.app.backend.repository.MakeRepository;
import com.app.backend.repository.RoleRepository;
import com.app.backend.repository.UserRepository;
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
@AutoConfigureMockMvc(addFilters=false)
public class EmployeeLoanControllerTest {


    @Autowired
    private MockMvc mvc;

    @MockBean
    private JwtTokenGenerator jwtTokenGenerator;

    @MockBean
    private EmployeeService employeeService;

    @MockBean
    private CategoryService categoryService;

    @MockBean
    private EmployeeLoanService employeeLoanService;

    @MockBean
    private ItemCardService itemCardService;

    @MockBean
    private LoanCardService loanCardService;

    @MockBean
    private MakeService makeService;

    @MockBean
    private EmployeeRepository employeeRepository;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private JWTService jwtService;

    @MockBean
    private CategoryRepository categoryRepository;

    @MockBean
    private EmployeeLoanRepository employeeLoanRepository;

    @MockBean
    private ItemCardRepository itemCardRepository;

    @MockBean
    private LoanCardRepository loanCardRepository;

    @MockBean
    private MakeRepository makeRepository;

    @MockBean
    private RoleRepository roleRepository;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    JdbcTemplate jdbcTemplate;



    ObjectMapper mapper = new ObjectMapper().findAndRegisterModules().disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    /**
     * @return
     * @throws Exception
     */

     @Test
     public void create() throws Exception{
        
        LoanCreationRequest loanRequest = new LoanCreationRequest();
        LoanCreationResponse loanResponse = new LoanCreationResponse();
        UUID num = UUID.fromString("acde070d-8c4c-4f0d-9d8a-162843c10333");
        UUID num1 = UUID.fromString("123e4567-e89b-12d3-a456-426614174000");
        loanRequest.setEmployeeID(num);
        loanRequest.setMakeID(num1);

        loanResponse.setLoanID(num);
        Mockito.when(employeeLoanService.create(ArgumentMatchers.any())).thenReturn(loanResponse);
        String request = mapper.writeValueAsString(loanRequest);
        String response = mapper.writeValueAsString(loanResponse);

        MvcResult requestResult = mvc.perform(post("/api/loan/create")
        .contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8")
        .content(request))
        .andExpect(status().isCreated())
        .andReturn();

        String result = requestResult.getResponse().getContentAsString();
        System.out.print(result);
        assertEquals(response, result);


     }

     @Test
     public void markCompleted() throws Exception{
        EmployeeLoan employeeLoan = new EmployeeLoan();

        Date date = new Date(0);
        UUID num = UUID.fromString("acde070d-8c4c-4f0d-9d8a-162843c10333");
        String id = "acde070d-8c4c-4f0d-9d8a-162843c10333";
        employeeLoan.setId(num);
        employeeLoan.setIssueDate(date);
        // employeeLoan.setItem(null);
        // employeeLoan.setLoan(null);
        employeeLoan.setStatus(null);
        // employeeLoan.setEmployee(null);
        List<EmployeeLoan> list = new ArrayList<>();
        list.add(employeeLoan);
        Mockito.when(employeeLoanService.setCompleted(num)).thenReturn(id);
      //   String string = "Updated Successfully";
        mvc.perform(get("/api/loan/acde070d-8c4c-4f0d-9d8a-162843c10333/status/completed"))
      //   .contentType(MediaType.APPLICATION_JSON)
            .andExpect(status().isAccepted())
            .andExpect(content().string(id));

     }

}
