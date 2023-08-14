package com.app.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.model.Item;
import com.app.backend.service.ItemService;

@RestController
@CrossOrigin("http://localhost:3000")
public class ItemController {
	@Autowired
	ItemService itemService;
	
	@PostMapping("/addItem")
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