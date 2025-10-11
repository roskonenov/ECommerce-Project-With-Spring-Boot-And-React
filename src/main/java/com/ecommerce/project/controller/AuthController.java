package com.ecommerce.project.controller;

import com.ecommerce.project.model.Role;
import com.ecommerce.project.model.RoleName;
import com.ecommerce.project.model.User;
import com.ecommerce.project.repositories.RoleRepository;
import com.ecommerce.project.repositories.UserRepository;
import com.ecommerce.project.security.jwt.JwtUtils;
import com.ecommerce.project.security.request.LoginRequest;
import com.ecommerce.project.security.response.UserInfoResponse;
import com.ecommerce.project.security.request.SignupRequest;
import com.ecommerce.project.security.response.MessageResponse;
import com.ecommerce.project.security.service.UserDetailsImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch (AuthenticationException e) {
            return new ResponseEntity<>(
                    Map.of(
                            "message", "Bad credentials",
                            "status", false
                    ),
                    HttpStatus.NOT_FOUND
            );
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtUtils.generateJwtCookie(userDetails).toString())
                .body(
                        new UserInfoResponse(
                                userDetails.getId(),
                                userDetails.getUsername(),
                                authentication
                                        .getAuthorities()
                                        .stream()
                                        .map(GrantedAuthority::getAuthority)
                                        .toList()
                        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {

        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Username already exists"));
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("This Email is already used"));
        }

        Set<Role> roles = signupRequest.getRoles() == null
                ?
                Set.of(roleRepository.findByName(RoleName.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("User role not found!")))
                :
                signupRequest.getRoles()
                        .stream()
                        .map(role -> switch (role) {
                            case "admin" -> roleRepository.findByName(RoleName.ROLE_ADMIN)
                                    .orElseThrow(() -> new RuntimeException("Admin role not found!"));
                            case "seller" -> roleRepository.findByName(RoleName.ROLE_SELLER)
                                    .orElseThrow(() -> new RuntimeException("Seller role not found!"));
                            default -> roleRepository.findByName(RoleName.ROLE_USER)
                                    .orElseThrow(() -> new RuntimeException("User role not found!"));
                        })
                        .collect(Collectors.toSet());

        userRepository.save(
                new User().setUsername(signupRequest.getUsername())
                        .setPassword(passwordEncoder.encode(signupRequest.getPassword()))
                        .setEmail(signupRequest.getEmail())
                        .setRoles(roles)
        );
        return ResponseEntity.ok(new MessageResponse("User registered successfully"));
    }

    @GetMapping("username")
    public String getCurrentUser(Authentication authentication) {
        return authentication == null ? "Guest" : authentication.getName();
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserInfo(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails == null
                ?
                ResponseEntity.badRequest()
                        .body(new MessageResponse("User not found"))
                :
                ResponseEntity.ok(new UserInfoResponse(
                        userDetails.getId(),
                        userDetails.getUsername(),
                        authentication
                                .getAuthorities()
                                .stream()
                                .map(GrantedAuthority::getAuthority)
                                .toList()
                ));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> signOutUser() {
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtUtils.getCleanJwtCookie().toString())
                .body(new MessageResponse("You've been signed out!"));
    }
}
