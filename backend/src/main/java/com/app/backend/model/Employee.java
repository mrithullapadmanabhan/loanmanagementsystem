package com.app.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import java.util.*;

@Entity
public class Employee {

	@Id
	private String employeeID;
	private String name;
	private String designation;
	private String department;
	private Date dob;
	private Date doj;
	
	public Employee() {
		// TODO Auto-generated constructor stub
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
