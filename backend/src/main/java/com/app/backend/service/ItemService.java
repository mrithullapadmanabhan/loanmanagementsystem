package com.app.backend.service;

import com.app.backend.model.Item;
import com.app.backend.repository.ItemRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemService {

	private final ItemRepository itemRepository;

	public Item saveItem(Item item) {
		Item obj = itemRepository.save(item);
		return obj;

	}

	public List<Item> getItems() {
		List<Item> itemList = itemRepository.findAll();
		return itemList;
	}
}