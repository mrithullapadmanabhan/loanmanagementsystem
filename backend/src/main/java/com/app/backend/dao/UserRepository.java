package com.app.backend.dao;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.User;

public interface UserRepository extends JpaRepository<User, String>{

}
