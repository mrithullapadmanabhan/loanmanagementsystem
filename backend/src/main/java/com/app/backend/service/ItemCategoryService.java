package com.app.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.backend.model.ItemCategory;
import com.app.backend.repository.ItemCategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemCategoryService {
    
    private final ItemCategoryRepository itemCategoryRepository;

    public List<ItemCategory> getAll() {
        return itemCategoryRepository.findAll();
    }
    
}
