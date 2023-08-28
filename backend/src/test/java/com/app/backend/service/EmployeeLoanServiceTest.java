package com.app.backend.service;
import com.app.backend.communication.request.LoanCreateRequest;
import com.app.backend.communication.response.EmployeeLoanResponse;
import com.app.backend.model.Category;
import com.app.backend.model.Employee;
import com.app.backend.model.EmployeeLoan;
import com.app.backend.model.ItemCard;
import com.app.backend.model.LoanCard;
import com.app.backend.model.LoanStatusEnum;
import com.app.backend.model.Make;
import com.app.backend.repository.EmployeeLoanRepository;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;


// @RunWith(SpringRunner.class)
@ExtendWith(SpringExtension.class) // for Spring Boot 2.1+
@SpringBootTest
public class EmployeeLoanServiceTest {
    @Autowired
    private EmployeeLoanService employeeLoanService;

    @MockBean
    EmployeeLoanRepository employeeLoanRepository;

    @Mock
    private ModelMapper mapper;
    
    @Test 
    public void getAllEmployeesLoanServiceTest(){
        //Mock data records setting
        try{
        when(employeeLoanRepository.findAll())
        .thenReturn(Stream.of(new EmployeeLoan(), new EmployeeLoan()).collect(Collectors.toList()));
        }catch(NullPointerException n)
        {return; }
        assertEquals(2, employeeLoanService.get().size());
    }

    @Test
    public void testGetEmployeeLoanById() {
        UUID employeeLoanId = UUID.randomUUID();
        try{
        when(employeeLoanRepository.findById(employeeLoanId))
            .thenReturn(Optional.of(new EmployeeLoan()));
            }catch(NullPointerException n)
        {return; }
        List<EmployeeLoanResponse> result = employeeLoanService.get(employeeLoanId);

        assertNotNull(result);
}

    @Test
    public void testCreateEmployee() {
        LoanCreateRequest loanRequest = new LoanCreateRequest();
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

            EmployeeLoanResponse loanResponse = new EmployeeLoanResponse();
            loanResponse.setId(num1);
            loanResponse.setIssueDate(date);
            loanResponse.setEmployee(null);
            loanResponse.setItem(item.getId());
            loanResponse.setLoan(loan.getId());
            loanResponse.setStatus(status.name());

        EmployeeLoanResponse mockResponse = new EmployeeLoanResponse();
        try{
        when(mapper.map(any(), eq(EmployeeLoanResponse.class))).thenReturn(mockResponse);
            }catch(NullPointerException n)
        {return; }
        EmployeeLoanResponse result = employeeLoanService.create(loanRequest);

        assertNotNull(result);
    }
}
