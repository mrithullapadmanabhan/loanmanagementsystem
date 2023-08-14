package com.app.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Employee {

	@Id
	@NotBlank(message = "Employee ID cannot be blank")
	private String employeeID;
	
	@NotBlank(message = "Name cannot be blank")
	@Size(min=5, max=28, message="Name can only be from 5 to 15 characters")
	private String name;
	
	@NotBlank(message="Designation cannot be blank")
	private String designation;
	
	@NotBlank(message="Department cannot be blank")
	private String department;
	
	@NotBlank(message="Gender cannot be blank")
	private String gender;
	
	@NotBlank(message="Username cannot be blank")
	private String username;
	
	
	@NotBlank(message="Date of birth cannot be empty")
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date dob;
	
	@NotBlank(message="Date of joining cannot be blank")
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date doj;
	
//	@OneToOne(mappedBy="Employee")
//	private User user;
	
	public Employee() {

	}
	
	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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
