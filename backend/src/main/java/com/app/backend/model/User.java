package com.app.backend.model;

import jakarta.persistence.*;

@Entity
public class User {

	@Id
	private String email;
	private String password;
	private String userType;
	
	@OneToOne(optional=true,cascade=CascadeType.ALL)
	private Employee emp;

	public Employee getEmp() {
		return emp;
	}

	public void setEmp(Employee emp) {
		this.emp = emp;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

}
