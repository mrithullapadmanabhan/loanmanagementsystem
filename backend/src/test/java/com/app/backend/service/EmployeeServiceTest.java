package com.app.backend.service;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.sql.Date;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.app.backend.communication.request.EmployeeCreateUpdateRequest;
import com.app.backend.communication.response.EmployeeResponse;
import com.app.backend.model.Employee;
import com.app.backend.model.Role;
import com.app.backend.model.RoleEnum;
import com.app.backend.model.User;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.repository.RoleRepository;
import com.app.backend.repository.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmployeeServiceTest {
    @Autowired
    private EmployeeService employeeService;

    @MockBean
    EmployeeRepository employeeRepository;

    @MockBean
    UserRepository userRepository;

    @MockBean
    RoleRepository roleRepository;

    @Mock
    private ModelMapper mapper;

    @Test 
    public void getAllEmployeesServiceTest(){
        //Mock data records setting
        when(employeeRepository.findAll())
        .thenReturn(Stream.of(new Employee(), new Employee()).collect(Collectors.toList()));

        assertEquals(2, employeeService.get().size());
    }

    @Test
    public void testGetEmployeeById() {
        UUID employeeId = UUID.randomUUID();
        when(employeeRepository.findById(employeeId))
                .thenReturn(Optional.of(new Employee()));

        EmployeeResponse result = employeeService.get(employeeId);

        assertNotNull(result);
    }

    @Test
    public void testCreateEmployee() {
        EmployeeCreateUpdateRequest employeeRequest = new EmployeeCreateUpdateRequest();
        // Set properties in the request
        Date date = new Date(0);

        employeeRequest.setEmail("myEmail@gmail.com");
        employeeRequest.setGender("myGender");
        employeeRequest.setDepartment("myDepartment");
        employeeRequest.setDesignation("myDesignation");
        employeeRequest.setName("myName");
        employeeRequest.setPassword("myPassword@123");
        employeeRequest.setDob(date);
        employeeRequest.setDoj(date);

        Role mockRole = new Role();
        when(roleRepository.findByName(RoleEnum.USER)).thenReturn(Optional.of(mockRole));

        Employee mockEmployee = new Employee();
        when(employeeRepository.save(any())).thenReturn(mockEmployee);

        User mockUser = new User();
        when(userRepository.save(any())).thenReturn(mockUser);

        EmployeeResponse mockResponse = new EmployeeResponse();
        when(mapper.map(any(), eq(EmployeeResponse.class))).thenReturn(mockResponse);

        EmployeeResponse result = employeeService.create(employeeRequest);

        assertNotNull(result);
    }

    @Test
    public void testUpdateEmployee() {
        UUID employeeId = UUID.randomUUID();
        EmployeeCreateUpdateRequest request = new EmployeeCreateUpdateRequest();

        Employee mockEmployee = new Employee();
        User mockUser = new User();
        mockEmployee.setUser(mockUser);
        when(employeeRepository.findById(employeeId)).thenReturn(Optional.of(mockEmployee));

        Employee updatedMockEmployee = new Employee();
        when(employeeRepository.save(any())).thenReturn(updatedMockEmployee);

        EmployeeResponse mockResponse = new EmployeeResponse();
        when(mapper.map(any(), eq(EmployeeResponse.class))).thenReturn(mockResponse);

        EmployeeResponse result = employeeService.update(employeeId, request);

        assertNotNull(result);
    }

    @Test
    public void testDeleteEmployee() {
        UUID employeeId = UUID.randomUUID();
        Employee mockEmployee = new Employee();
        when(employeeRepository.findById(employeeId)).thenReturn(Optional.of(mockEmployee));

        assertDoesNotThrow(() -> employeeService.delete(employeeId));

        verify(employeeRepository, times(1)).delete(mockEmployee);
    }

}