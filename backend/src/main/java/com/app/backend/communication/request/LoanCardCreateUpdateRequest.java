package com.app.backend.communication.request;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoanCardCreateUpdateRequest {

    @NotNull
    private UUID categoryID;

    @NotNull
    private int duration;

}
