package com.app.backend.service;

import com.app.backend.model.Item;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.dao.ItemRepository;


@Service
public class ItemService {
	@Autowired
	ItemRepository itemRepository;
	
	public Item saveItem(Item item)
	{
		Item obj=itemRepository.save(item);
		return obj;
		
	}
	
	public List<Item> getItems()
{
		List<Item> itemList = itemRepository.findAll();
		return itemList;
}}