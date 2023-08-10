package com.app.backend.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.app.backend.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String>{

}
