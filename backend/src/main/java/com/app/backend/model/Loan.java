package com.app.backend.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

	@NotNull
	private int duration;
	
	@Enumerated(EnumType.STRING)
	@NotEmpty
	private LoanStatusEnum status;

	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "employee_id")
    private Employee employee;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "item_id")
    private Item item;
	
}