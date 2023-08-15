package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.backend.model.ItemCategory;
import com.app.backend.model.ItemMake;
import com.app.backend.repository.ItemCategoryRepository;
import com.app.backend.repository.ItemMakeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemMakeService {
    
    private final ItemMakeRepository itemMakeRepository;

    private final ItemCategoryRepository itemCategoryRepository;


    public List<ItemMake> getMakes() {
        return itemMakeRepository.findAll();
    }

    public List<ItemMake> getMakes(UUID categoryID) {
        ItemCategory category = itemCategoryRepository.findById(categoryID).orElseThrow();
        return category.getMakes();
    }

}
