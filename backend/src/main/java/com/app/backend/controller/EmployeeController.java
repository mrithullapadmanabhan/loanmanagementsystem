package com.app.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.model.Employee;
import com.app.backend.service.EmployeeService;

@RestController
//@CrossOrigin("http://localhost:3000")
@CrossOrigin("*")
public class EmployeeController {
	@Autowired
	EmployeeService empService;
	
	@PostMapping("/addEmployee")
	public Employee saveEmployee(@RequestBody Employee emp)
	{
		Employee e=empService.saveEmployee(emp);
		return e;
	}

}