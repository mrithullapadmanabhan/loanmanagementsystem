package com.app.backend.command;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.app.backend.model.Role;
import com.app.backend.model.RoleEnum;
import com.app.backend.model.User;
import com.app.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class startupRunner implements CommandLineRunner {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Value("${luma.app.superuserEmail}")
    private String superuserEmail;

    @Value("${luma.app.superuserPassword}")
    private String superuserPassword;
    
    @Override
    public void run(String... args) throws Exception {

        Role adminRole = Role.builder()
            .name(RoleEnum.ADMIN)
            .build();

        Role userRole = Role.builder()
            .name(RoleEnum.USER)
            .build();

        User user = User.builder()
            .email(superuserEmail)
            .password(passwordEncoder.encode(superuserPassword))
            .roles(List.of(adminRole, userRole))
            .build();
        userRepository.save(user);

    }
    
}
