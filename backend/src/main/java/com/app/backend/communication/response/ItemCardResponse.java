package com.app.backend.communication.response;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemCardResponse {

    private UUID id;

    private String description;

    private Double value;

    private UUID make;

}
