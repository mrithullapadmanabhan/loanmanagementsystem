package com.app.backend.communication.request;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoanCardCreationRequest {

    @NotBlank
    private UUID makeID;

    @NotBlank
    private int duration;

}
