package com.app.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Employee {

	@Id
	@NotBlank
	private String employeeID;
	
	@NotBlank
	@Size(max=28)
	private String name;
	private String designation;
	private String department;
	
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date dob;
	
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date doj;
	
//	@OneToOne(mappedBy="Employee")
//	private User user;
	
	public Employee() {

	}

	public String getEmployeeID() {
		return employeeID;
	}

	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public Date getDoj() {
		return doj;
	}

	public void setDoj(Date doj) {
		this.doj = doj;
	}
	
}
