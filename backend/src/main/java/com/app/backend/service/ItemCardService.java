package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import com.app.backend.communication.request.ItemCardCreateUpdateRequest;
import com.app.backend.model.ItemCard;

import jakarta.validation.Valid;

public interface ItemCardService {

    public abstract List<ItemCard> get();

    public abstract ItemCard get(UUID id);

    public abstract ItemCard getByMake(UUID makeID);

    public abstract List<ItemCard> getByEmployee(UUID employeeID);

    public abstract ItemCard create(@Valid ItemCardCreateUpdateRequest item);

    public abstract ItemCard update(UUID id, @Valid ItemCardCreateUpdateRequest request);

    public abstract String delete(UUID id);

}
