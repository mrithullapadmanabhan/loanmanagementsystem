package com.app.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.model.Admin;
import com.app.backend.service.AdminService;

@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {
	
	@Autowired
	AdminService admService;
	
	@PostMapping("/addAdmin")
	public Admin saveAdmin(@RequestBody Admin adm)
	{
		Admin a=admService.saveAdmin(adm);
		return a;
	}

}