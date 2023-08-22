package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import com.app.backend.communication.request.ItemCardCreateUpdateRequest;
import com.app.backend.communication.response.ItemCardResponse;

import jakarta.validation.Valid;

public interface ItemCardService {

    public abstract List<ItemCardResponse> get();

    public abstract ItemCardResponse get(UUID id);

    public abstract ItemCardResponse getByMake(UUID makeID);

    public abstract List<ItemCardResponse> getByEmployee(UUID employeeID);

    public abstract ItemCardResponse create(@Valid ItemCardCreateUpdateRequest item);

    public abstract ItemCardResponse update(UUID id, @Valid ItemCardCreateUpdateRequest request);

    public abstract String delete(UUID id);

}
