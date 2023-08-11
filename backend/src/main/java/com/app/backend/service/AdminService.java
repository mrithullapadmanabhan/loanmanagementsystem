package com.app.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.dao.AdminRepository;
import com.app.backend.model.Admin;

@Service
public class AdminService {
	@Autowired
	AdminRepository admRepository;
	
	public Admin saveAdmin(Admin adm)
	{
		Admin obj = admRepository.save(adm);
		return obj;
		
	}
}
