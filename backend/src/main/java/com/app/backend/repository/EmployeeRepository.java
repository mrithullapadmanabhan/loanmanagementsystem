package com.app.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, String>{

}
