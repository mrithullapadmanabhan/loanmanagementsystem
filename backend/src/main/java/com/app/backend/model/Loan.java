package com.app.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Loan {

	@Id
	private String loanID;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employeeID")
    private Employee employee;
	
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "itemID")
    private Item item;

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
