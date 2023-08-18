package com.app.backend;

import java.sql.Date;
import java.util.UUID;

import org.apache.tomcat.util.http.parser.MediaType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.app.backend.communication.request.EmployeeRegisterRequest;
import com.app.backend.communication.response.EmployeeRegisterResponse;
import com.app.backend.model.Employee;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.service.EmployeeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@RunWith(SpringRunner.class)
@WebMvcTest
@ContextConfiguration
public class EmployeeControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private EmployeeService employeeService;

    @MockBean
    private EmployeeRepository employeeRepository;

    @MockBean
    JdbcTemplate jdbcTemplate;

    ObjectMapper mapper = new ObjectMapper().findAndRegisterModules().disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    /**
     * @return
     * @throws Exception
     */
    @Test
    public void register() throws Exception{
        EmployeeRegisterRequest employee = new EmployeeRegisterRequest();
        EmployeeRegisterResponse emplresponse = new EmployeeRegisterResponse();
        UUID num = UUID.fromString("acde070d-8c4c-4f0d-9d8a-162843c10333");
        Date date = new Date(0);
        
        emplresponse.setEmployeeID(num);
        employee.setEmail("myEmail@gmail.com");
        employee.setGender("myGender");
        employee.setDepartment("myDepartment");
        employee.setDesignation("myDesignation");
        employee.setName("myName");
        employee.setDepartment("myPassword@123");
        employee.setDob(date);
        employee.setDoj(date);

        // employee.setDob(Date.now());
        // employee.setName("Myname");
        // employee.setDepartment("MyDpt");
        // employee.setDesignation("MyDesignation");

        Mockito.when(employeeService.register(ArgumentMatchers.any())).thenReturn(emplresponse);
        String json = mapper.writeValueAsString(emplresponse);
        MvcResult requestResult = mvc.perform(post("/api/employee/register")
        .characterEncoding("utf-8")
        .content(json))
        .andExpect(status().isForbidden())
        .andReturn();

        String result = requestResult.getResponse().getContentAsString();
        System.out.print(result);
        assertEquals(result, "User");

    }
    // @Test
    // public 
}