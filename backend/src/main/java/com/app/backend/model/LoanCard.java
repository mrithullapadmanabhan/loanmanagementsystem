package com.app.backend.model;

import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class LoanCard {

	@Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

	@NotNull
	private int duration;

	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "make_id")
	private Make make;
	
}