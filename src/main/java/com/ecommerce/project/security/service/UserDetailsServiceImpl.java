package com.ecommerce.project.security.service;

import com.ecommerce.project.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Data
public class UserDetailsServiceImpl implements UserDetailsService {

    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return UserDetailsImpl
                .build(
                        userRepository.findByUsername(username)
                                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username))
                );
    }
}
