package com.app.backend.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.model.Item;
import com.app.backend.service.ItemService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class ItemController {
	private final ItemService itemService;
	
	@PostMapping("/addItem")
	@PreAuthorize("hasAuthority('ADMIN')")
	public Item saveItem(@RequestBody Item item)
	{
		Item i=itemService.saveItem(item);
		return i;
	}
	
	@GetMapping("/getAllItems")
	public List<Item> getItems(){
		return itemService.getItems();
	}

}