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
                    .forEach(role -> roleRepository.saveAndFlush(new Role(RoleName.valueOf(role))));
        }
    }

    private void initUsers() {
        if (userRepository.count() != 0) return;

        userRepository.saveAllAndFlush(List.of(
                new User("user",
                        passwordEncoder.encode("userPass"),
                        "user@example.com")
                        .setRoles(Set.of(roleRepository.findByName((RoleName.ROLE_USER)))),

                new User("seller",
                        passwordEncoder.encode("sellerPass"),
                        "seller@example.com")
                        .setRoles(Set.of(roleRepository.findByName(RoleName.ROLE_SELLER))),

                new User("admin",
                        passwordEncoder.encode("adminPass"),
                        "admin@example.com")
                        .setRoles(Set.of(roleRepository.findByName(RoleName.ROLE_ADMIN))))
        );
    }
}
