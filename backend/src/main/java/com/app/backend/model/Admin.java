package com.app.backend.model;

import jakarta.persistence.*;

@Entity
public class Admin {

	@Id
	private String AdminID;
	private String name;
	
	public Admin() {
		// TODO Auto-generated constructor stub
	}

	public String getAdminID() {
		return AdminID;
	}

	public void setAdminID(String adminID) {
		AdminID = adminID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
}
