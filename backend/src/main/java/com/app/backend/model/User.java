package com.app.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;


@Entity
public class User {
	
	@Id
	@NotEmpty
	@Email
	private String email;
	
	@NotEmpty
	@Size(min= 8, message="password should have atleast 8 characters")
	private String password;
	
	@NotEmpty
	private String userType;
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
