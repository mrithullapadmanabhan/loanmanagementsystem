package com.app.backend.model;

import java.sql.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Employee {

	@Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
	
	@NotBlank(message = "Name cannot be blank")
	@Size(min=5, max=28, message="Name can only be from 5 to 15 characters")
	private String name;
	
	@NotBlank(message="Designation cannot be blank")
	private String designation;
	
	@NotBlank(message="Department cannot be blank")
	private String department;
	
	@NotBlank(message="Gender cannot be blank")
	private String gender;

	@JsonFormat(pattern="yyyy-mm-dd")
	private Date dob;

	@JsonFormat(pattern="yyyy-mm-dd")
	private Date doj;
	
	@OneToOne(mappedBy="employee")
	private User user;
	
}