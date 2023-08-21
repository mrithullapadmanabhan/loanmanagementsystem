package com.app.backend;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.http.MediaType;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

// import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.app.backend.communication.request.EmployeeCreateUpdateRequest;
import com.app.backend.communication.request.LoanCreateRequest;
import com.app.backend.model.Category;
// import com.app.backend.communication.response.EmployeeRegisterResponse;
// import com.app.backend.communication.response.LoanCreateResponse;
import com.app.backend.model.Employee;
import com.app.backend.model.EmployeeLoan;
import com.app.backend.model.ItemCard;
import com.app.backend.model.LoanCard;
import com.app.backend.model.LoanStatusEnum;
import com.app.backend.model.Make;
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
        
        LoanCreateRequest loanRequest = new LoanCreateRequest();
      //   LoanCreationResponse loanResponse = new LoanCreationResponse();
        UUID num = UUID.fromString("acde070d-8c4c-4f0d-9d8a-162843c10333");
        UUID num1 = UUID.fromString("123e4567-e89b-12d3-a456-426614174000");
        Date date = new Date(0);

        Employee employee = new Employee();
        employee.setId(num1);
        employee.setDepartment("MyDpt");
        employee.setDesignation("MyDesig");
        employee.setDob(date);
        employee.setDoj(date);
        employee.setGender("Female");
        employee.setName("MyName");

        Category category = new Category();
        category.setId(num1);
        category.setName("Myname");

        LoanStatusEnum status = LoanStatusEnum.STARTED;

        Make make = new Make();
        make.setId(num1);
        make.setName("makeName");
        make.setCategory(category);

        LoanCard loan = new LoanCard();
        loan.setId(num1);
        loan.setCategory(category);
        loan.setDuration(2);

        ItemCard item = new ItemCard();
        item.setId(num1);
        item.setDescription("mydescription");
        item.setValue(20.0);
        item.setMake(make);
        

      
        loanRequest.setEmployeeID(num);
        loanRequest.setMakeID(num1);

        EmployeeLoan loanResponse = new EmployeeLoan();
        loanResponse.setId(num1);
        loanResponse.setIssueDate(date);
        loanResponse.setEmployee(null);
        loanResponse.setItem(item);
        loanResponse.setLoan(loan);
        loanResponse.setStatus(status);
   
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

     /**
    * @throws Exception
    */
   @Test
     public void markCompleted() throws Exception{
        EmployeeLoan employeeLoan = new EmployeeLoan();

        Date date = new Date(0);
        UUID num = UUID.fromString("acde070d-8c4c-4f0d-9d8a-162843c10333");
        employeeLoan.setId(num);
        employeeLoan.setIssueDate(date);
        employeeLoan.setStatus(null);
        // employeeLoan.setEmployee(null);
        List<EmployeeLoan> list = new ArrayList<>();
        list.add(employeeLoan);
        Mockito.when(employeeLoanService.setCompleted(num)).thenReturn(employeeLoan);
        mvc.perform(get("/api/loan/acde070d-8c4c-4f0d-9d8a-162843c10333/status/completed"))
            .andExpect(status().isAccepted());

     }

     @Test
     public void getTest() throws Exception{
        EmployeeLoan employeeLoan = new EmployeeLoan();

        Date date = new Date(0);
        UUID num = UUID.fromString("acde070d-8c4c-4f0d-9d8a-162843c10333");
        employeeLoan.setId(num);
        employeeLoan.setIssueDate(date);
        employeeLoan.setStatus(null);
        // employeeLoan.setEmployee(null);
        List<EmployeeLoan> list = new ArrayList<>();
        list.add(employeeLoan);
        Mockito.when(employeeLoanService.get(num)).thenReturn(list);
        mvc.perform(get("/api/loan/employee/acde070d-8c4c-4f0d-9d8a-162843c10333")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$", Matchers.hasSize(1)));

     }


}
