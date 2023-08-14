package com.app.backend.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
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
public class Item {

	@Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
	
	@NotBlank(message="Category cannot be blank")
	private ItemCategoryEnum category;
	
	@NotBlank(message="Description cannot be blank")
	private String description;
	
	@NotNull(message="Value cannot be empty")
	private Integer value;
	
	@NotEmpty(message="Make cannot be blank")
	private String make;
	
	@NotEmpty(message="i")
	private String issueStatus;
	
}