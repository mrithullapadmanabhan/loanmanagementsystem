package com.app.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.dao.EmployeeRepository;
import com.app.backend.model.Employee;

@Service
public class EmployeeService {
	@Autowired
	EmployeeRepository empRepository;
	
	public Employee saveEmployee(Employee emp)
	{
		Employee obj=empRepository.save(emp);
		return obj;
		
	}
}
