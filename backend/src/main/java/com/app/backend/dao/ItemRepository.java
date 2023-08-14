package com.app.backend.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.backend.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, String>{

}
