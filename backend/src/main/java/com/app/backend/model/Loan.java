package com.app.backend.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Loan {

	@Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinTable(
        name = "employee_loans",
        joinColumns = @JoinColumn(name="loan_id"),
        inverseJoinColumns = @JoinColumn(name="employee_id")
    )
    private Employee employee;
	
	@OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id")
    private Item item;

	@NotNull
	private int duration;
	
	@NotEmpty
	private String issueStatus;
	
}