package com.app.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.dao.ItemRepository;
import com.app.backend.model.Item;

@Service
public class ItemService {
	@Autowired
	ItemRepository itemRepository;
	
	public Item saveItem(Item item)
	{
		Item obj=itemRepository.save(item);
		return obj;
		
	}
}