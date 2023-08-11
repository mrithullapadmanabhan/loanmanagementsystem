package com.app.backend.service;

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

	public String validateUser(LoginModel lm) {

		String result="";
		User user=null;
		Optional<User>obj=userRepository.findById(lm.getEmail());
		if(obj.isPresent())
			user=obj.get();
		if(user==null)
			result="Invalid user";
		else if(lm.getPassword().equals(user.getPassword()))
			result="Login success";
		else result="Login failed";
		//System.out.println(result);
		return result;
	}
}