package com.app.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.model.ItemCategory;
import com.app.backend.service.ItemCategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/category")
@CrossOrigin
@RequiredArgsConstructor
public class ItemCategoryController {
    
    private final ItemCategoryService itemCategoryService;

    @GetMapping("/")
	public List<ItemCategory> getCategories(){
		return itemCategoryService.getAll();
	}

}
