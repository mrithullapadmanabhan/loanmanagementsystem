package com.app.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.model.User;
import com.app.backend.service.UserService;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
	@Autowired
	UserService userService;
	
	@PostMapping("/addUser")
	public User saveUser(@RequestBody User user)
	{
		User u=userService.saveUser(user);
		return u;
	}

}