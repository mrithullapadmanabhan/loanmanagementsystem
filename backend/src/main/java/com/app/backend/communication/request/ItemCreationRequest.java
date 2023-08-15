package com.app.backend.communication.request;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemCreationRequest {
    
    @NotBlank(message="Description cannot be blank")
	private String description;
	
	@NotNull(message="Value cannot be empty")
	private Double value;

    @NotNull
    private UUID makeID;

}
