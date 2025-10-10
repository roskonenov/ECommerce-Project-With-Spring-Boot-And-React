package com.ecommerce.project.init;


import com.ecommerce.project.model.Role;
import com.ecommerce.project.model.RoleName;
import com.ecommerce.project.model.User;
import com.ecommerce.project.repositories.RoleRepository;
import com.ecommerce.project.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class InitDatabase implements CommandLineRunner {

    private final RoleRepository roleRepository;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initRoles();
        initUsers();
    }

    void initRoles() {
        if (roleRepository.count() != Arrays.stream(RoleName.values()).count()) {

            Arrays.stream(RoleName.values())
                    .map(RoleName::toString)
                    .filter(role -> !roleRepository.findAll()
                            .stream()
                            .map(Role::getName)
                            .map(RoleName::toString)
                            .toList()
                            .contains(role))
                    .forEach(role -> roleRepository.save(new Role(RoleName.valueOf(role))));
        }
    }

    private void initUsers() {
        if (userRepository.count() != 0) return;

        userRepository.saveAll(List.of(
                new User("user",
                        passwordEncoder.encode("userPass"),
                        "user@example.com")
                        .setRoles(Set.of(roleRepository.findByName(RoleName.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("User role not found!")))),

                new User("seller",
                        passwordEncoder.encode("sellerPass"),
                        "seller@example.com")
                        .setRoles(Set.of(roleRepository.findByName(RoleName.ROLE_USER)
                                        .orElseThrow(() -> new RuntimeException("User role not found!")),
                                roleRepository.findByName(RoleName.ROLE_SELLER)
                                        .orElseThrow(() -> new RuntimeException("Seller role not found!")))),

                new User("admin",
                        passwordEncoder.encode("adminPass"),
                        "admin@example.com")
                        .setRoles(Set.of(roleRepository.findByName(RoleName.ROLE_USER)
                                        .orElseThrow(() -> new RuntimeException("User role not found!")),
                                roleRepository.findByName(RoleName.ROLE_ADMIN)
                                        .orElseThrow(() -> new RuntimeException("Admin role not found!")))))
        );
    }
}
