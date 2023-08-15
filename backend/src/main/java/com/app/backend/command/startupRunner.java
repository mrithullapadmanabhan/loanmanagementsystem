package com.app.backend.command;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.app.backend.model.ItemCategory;
import com.app.backend.model.ItemMake;
import com.app.backend.model.Role;
import com.app.backend.model.RoleEnum;
import com.app.backend.model.User;
import com.app.backend.repository.ItemCategoryRepository;
import com.app.backend.repository.ItemMakeRepository;
import com.app.backend.repository.RoleRepository;
import com.app.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class startupRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    
    private final ItemCategoryRepository itemCategoryRepository;
    private final ItemMakeRepository itemMakeRepository;

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


        ItemCategory furniture = ItemCategory.builder()
            .name("Furniture")
            .makes(List.of())
            .build();

        ItemCategory vehicles = ItemCategory.builder()
            .name("Vehicles")
            .makes(List.of())
            .build();

        ItemCategory jewellery = ItemCategory.builder()
            .name("Jewellery")
            .makes(List.of())
            .build();

        itemCategoryRepository.save(furniture);
        itemCategoryRepository.save(vehicles);
        itemCategoryRepository.save(jewellery);

        ItemMake wood = ItemMake.builder()
            .category(furniture)
            .name("Wood")
            .build();

        ItemMake metal = ItemMake.builder()
            .category(furniture)
            .name("Metal")
            .build();

        ItemMake auto = ItemMake.builder()
            .category(vehicles)
            .name("Automatic")
            .build();

        ItemMake manual = ItemMake.builder()
            .category(vehicles)
            .name("Manual")
            .build();

        ItemMake gold = ItemMake.builder()
            .category(jewellery)
            .name("Gold")
            .build();

        ItemMake silver = ItemMake.builder()
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
