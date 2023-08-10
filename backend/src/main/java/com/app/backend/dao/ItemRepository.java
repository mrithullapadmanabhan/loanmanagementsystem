package com.app.backend.dao;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.Item;

public interface ItemRepository extends JpaRepository<Item, String>{

}
