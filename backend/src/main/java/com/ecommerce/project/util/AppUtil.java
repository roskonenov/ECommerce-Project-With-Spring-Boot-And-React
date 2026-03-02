package com.ecommerce.project.util;

import com.ecommerce.project.model.Role;
import com.ecommerce.project.model.RoleName;
import com.ecommerce.project.repositories.RoleRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AppUtil {

    private final RoleRepository roleRepository;

    public static Sort getSorting(String sortBy, String sortOrder) {
        return sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
    }

    public Role getRoleByName(String role) {
        return switch (role) {
            case "admin" -> roleRepository.findByName(RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Admin role not found!"));
            case "seller" -> roleRepository.findByName(RoleName.ROLE_SELLER)
                    .orElseThrow(() -> new RuntimeException("Seller role not found!"));
            default -> roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("User role not found!"));
        };
    }
}
