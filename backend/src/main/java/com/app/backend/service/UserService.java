package com.app.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.dao.UserRepository;
import com.app.backend.model.User;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	public User saveUser(User user)
	{
		User obj=userRepository.save(user);
		return obj;
		
	}
}