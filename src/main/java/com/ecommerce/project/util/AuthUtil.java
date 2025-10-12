package com.ecommerce.project.util;

import com.ecommerce.project.model.User;
import com.ecommerce.project.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthUtil {

    private final UserRepository userRepository;

    public String loggedInUserEmail() {
        return getUserFromSecurityContext()
                .getEmail();
    }

    public Long loggedInUserId() {
        return getUserFromSecurityContext()
                .getId();
    }

    public User loggedInUser() {
        return getUserFromSecurityContext();
    }

    private User getUserFromSecurityContext () {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }
}
