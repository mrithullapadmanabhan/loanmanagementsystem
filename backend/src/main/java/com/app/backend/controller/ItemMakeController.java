package com.app.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.model.ItemMake;
import com.app.backend.service.ItemMakeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/make")
@CrossOrigin
@RequiredArgsConstructor
public class ItemMakeController {
    
    private final ItemMakeService itemMakeService;

    @GetMapping("/")
	public List<ItemMake> getMakes(){
		return itemMakeService.getMakes();
	}

    @GetMapping("/{categoryID}")
	public List<ItemMake> getMakes(@PathVariable("categoryID") UUID categoryID){
		return itemMakeService.getMakes(categoryID);
	}

}
