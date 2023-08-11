package com.app.backend.dao;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, String>{

}
