package com.app.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Loan {

	@Id
	@NotEmpty
	private String loanID;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employeeID")
    private Employee employee;
	
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "itemID")
    private Item item;

	@NotNull
	private int duration;
	
	@NotEmpty
	private String issueStatus;
	
	public Loan() {

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
