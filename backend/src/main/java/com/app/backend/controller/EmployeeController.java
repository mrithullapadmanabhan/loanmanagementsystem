package com.app.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.backend.model.Employee;
import com.app.backend.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
//@CrossOrigin("http://localhost:3000")
@CrossOrigin("*")
public class EmployeeController {
	
	@Autowired
	EmployeeService empService;
	
	@PostMapping("/addEmployee")
	public Employee saveEmployee(@Valid @RequestBody Employee emp)
	{
		Employee e=empService.saveEmployee(emp);
		return e;
	}

}