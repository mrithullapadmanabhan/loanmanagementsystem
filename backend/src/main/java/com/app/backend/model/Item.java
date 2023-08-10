package com.app.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;


@Entity
public class Item {

	@Id
	@NotBlank
	private String itemId;
	
	@NotBlank
	private String category;
	private String description;
	
	@NotNull
	private Integer value;
	
	@NotEmpty
	private String make;
	private String issueStatus;
	public String getItemId() {
		return itemId;
	}
	public void setItemId(String itemId) {
		this.itemId = itemId;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getValue() {
		return value;
	}
	public void setValue(Integer value) {
		this.value = value;
	}
	public String getMake() {
		return make;
	}
	public void setMake(String make) {
		this.make = make;
	}
	public String getIssueStatus() {
		return issueStatus;
	}
	public void setIssueStatus(String issueStatus) {
		this.issueStatus = issueStatus;
	}
	
	
}
