package com.app.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Loan {

	@Id
	private String loanID;
	private String employeeID;
	private String itemID;
	private int duration;
	private String issueStatus;
	
	
	public Loan() {
		// TODO Auto-generated constructor stub
	}


	public String getLoanID() {
		return loanID;
	}


	public void setLoanID(String loanID) {
		this.loanID = loanID;
	}


	public String getEmployeeID() {
		return employeeID;
	}


	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}


	public String getItemID() {
		return itemID;
	}


	public void setItemID(String itemID) {
		this.itemID = itemID;
	}


	public int getDuration() {
		return duration;
	}


	public void setDuration(int duration) {
		this.duration = duration;
	}


	public String getIssueStatus() {
		return issueStatus;
	}


	public void setIssueStatus(String issueStatus) {
		this.issueStatus = issueStatus;
	}
	

}
