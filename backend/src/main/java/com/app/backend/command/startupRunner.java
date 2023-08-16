package com.app.backend.command;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.app.backend.model.Category;
import com.app.backend.model.Make;
import com.app.backend.model.Role;
import com.app.backend.model.RoleEnum;
import com.app.backend.model.User;
import com.app.backend.repository.CategoryRepository;
import com.app.backend.repository.MakeRepository;
import com.app.backend.repository.RoleRepository;
import com.app.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class startupRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    
    private final CategoryRepository itemCategoryRepository;
    private final MakeRepository itemMakeRepository;

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
        roleRepository.save(adminRole);

        Role userRole = Role.builder()
            .name(RoleEnum.USER)
            .build();
        roleRepository.save(userRole);

        User user = User.builder()
            .email(superuserEmail)
            .password(passwordEncoder.encode(superuserPassword))
            .roles(List.of(adminRole, userRole))
            .build();
        userRepository.save(user);


        Category furniture = Category.builder()
            .name("Furniture")
            .makes(List.of())
            .build();

        Category vehicles = Category.builder()
            .name("Vehicles")
            .makes(List.of())
            .build();

        Category jewellery = Category.builder()
            .name("Jewellery")
            .makes(List.of())
            .build();

        itemCategoryRepository.save(furniture);
        itemCategoryRepository.save(vehicles);
        itemCategoryRepository.save(jewellery);

        Make wood = Make.builder()
            .category(furniture)
            .name("Wood")
            .build();

        Make metal = Make.builder()
            .category(furniture)
            .name("Metal")
            .build();

        Make auto = Make.builder()
            .category(vehicles)
            .name("Automatic")
            .build();

        Make manual = Make.builder()
            .category(vehicles)
            .name("Manual")
            .build();

        Make gold = Make.builder()
            .category(jewellery)
            .name("Gold")
            .build();

        Make silver = Make.builder()
            .category(jewellery)
            .name("Silver")
            .build();

        itemMakeRepository.save(wood);
        itemMakeRepository.save(metal);
        itemMakeRepository.save(auto);
        itemMakeRepository.save(manual);
        itemMakeRepository.save(gold);
        itemMakeRepository.save(silver);

    }
    
}
