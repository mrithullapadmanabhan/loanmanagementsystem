package com.app.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.app.backend.communication.request.EmployeeCreateUpdateRequest;
import com.app.backend.model.Employee;
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
@AutoConfigureMockMvc(addFilters = false)
public class EmployeeControllerTest {

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

    @MockBean
    private CategoryRepository categoryRepository;

    @MockBean
    private EmployeeRepository employeeRepository;

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

    ObjectMapper mapper = new ObjectMapper()
            .findAndRegisterModules()
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    @Test
    public void createTest() throws Exception {

        EmployeeCreateUpdateRequest employeeRequest = new EmployeeCreateUpdateRequest();
        Employee employeeResponse = new Employee();

        UUID num = UUID.fromString("acde070d-8c4c-4f0d-9d8a-162843c10333");
        Date date = new Date(0);

        employeeRequest.setEmail("myEmail@gmail.com");
        employeeRequest.setGender("myGender");
        employeeRequest.setDepartment("myDepartment");
        employeeRequest.setDesignation("myDesignation");
        employeeRequest.setName("myName");
        employeeRequest.setPassword("myPassword@123");
        employeeRequest.setDob(date);
        employeeRequest.setDoj(date);

        employeeResponse.setId(num);
        employeeResponse.setGender("myGender");
        employeeResponse.setDepartment("myDepartment");
        employeeResponse.setDesignation("myDesignation");
        employeeResponse.setName("myName");
        employeeResponse.setDob(date);
        employeeResponse.setDoj(date);

        Mockito.when(employeeService.create(ArgumentMatchers.any())).thenReturn(employeeResponse);

        String employeeRequestString = mapper.writeValueAsString(employeeRequest);
        String employeeResponseString = mapper.writeValueAsString(employeeResponse);

        MvcResult requestResult = mvc.perform(post("/api/employee")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8")
                .content(employeeRequestString))
                .andExpect(status().isCreated())
                .andReturn();

        String employeeRequestResult = requestResult.getResponse().getContentAsString();
        assertEquals(employeeResponseString, employeeRequestResult);
    }

    @Test
    public void getTest() throws Exception {

        List<Employee> employeeList = new ArrayList<Employee>();
        Employee employee = new Employee();
        employee.setId(UUID.fromString("acde070d-8c4c-4f0d-9d8a-162843c10333"));
        employee.setGender("myGender");
        employee.setDepartment("myDepartment");
        employee.setDesignation("myDesignation");
        employee.setName("myName");
        employee.setDob(new Date(0));
        employee.setDoj(new Date(0));

        employeeList.add(employee);

        Mockito.when(employeeService.get()).thenReturn(employeeList);

        mvc.perform(get("/api/employee")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id", Matchers.equalTo(employeeList.get(0).getId().toString())));
    }

    @Test
    public void deleteTest() throws Exception {
        UUID num = UUID.fromString("acde070d-8c4c-4f0d-9d8a-162843c10333");
        String string = "string";
        Mockito.when(employeeService.delete(num)).thenReturn(string);
        mvc.perform(delete("/api/employee/{num}", num)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
        // .andExpect(jsonPath("$[0].id",
        // Matchers.equalTo(employeeList.get(0).getId().toString())));

    }

    @Test
    public void update() throws Exception {

        EmployeeCreateUpdateRequest employeeRequest = new EmployeeCreateUpdateRequest();
        UUID num = UUID.fromString("acde070d-8c4c-4f0d-9d8a-162843c10333");
        Date date = new Date(0);

        employeeRequest.setEmail("myEmail@gmail.com");
        employeeRequest.setGender("myGender");
        employeeRequest.setDepartment("myDepartment");
        employeeRequest.setDesignation("myDesignation");
        employeeRequest.setName("myName");
        employeeRequest.setPassword("myPassword@123");
        employeeRequest.setDob(date);
        employeeRequest.setDoj(date);

        Employee employeeResponse = new Employee();

        employeeResponse.setId(num);
        employeeResponse.setGender("myGender");
        employeeResponse.setDepartment("myDepartment");
        employeeResponse.setDesignation("myDesignation");
        employeeResponse.setName("myName");
        employeeResponse.setDob(date);
        employeeResponse.setDoj(date);

        Mockito.when(employeeService.update(num, employeeRequest)).thenReturn(employeeResponse);

        mvc.perform(put("/api/employee/{num}", num)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", Matchers.equalTo(employeeResponse.getId().toString())));

    }

}