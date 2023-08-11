package com.app.backend.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.dao.UserRepository;
import com.app.backend.model.LoginModel;
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

	public Map<String,Object> validateUser(LoginModel lm) {

		User user=null;
		Optional<User>obj=userRepository.findById(lm.getEmail());
		if(obj.isPresent())
			user=obj.get();
		Map<String,Object> response=new HashMap<>();
	
		if(user==null) {
			response.put("success",false);
			response.put("message", "Invalid user");
		}
		else if(lm.getPassword().equals(user.getPassword())) {
			response.put("success",true);
			response.put("message", "Login successful");
			response.put("user", user);
		}
		else {
			response.put("success",false);
			response.put("message", "Wrong password");
		}
		return response;
	}
}