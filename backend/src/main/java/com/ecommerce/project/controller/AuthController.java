package com.ecommerce.project.controller;

import com.ecommerce.project.payload.response.AuthenticationResult;
import com.ecommerce.project.security.request.LoginRequest;
import com.ecommerce.project.security.request.SignupRequest;
import com.ecommerce.project.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        AuthenticationResult result = authService.login(loginRequest);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, result.getJwtToken())
                .body(result.getUserInfo());

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        return authService.register(signupRequest);
    }

    @GetMapping("username")
    public String getCurrentUser(Authentication authentication) {
        return authService.getLoggedInUser(authentication);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserInfo(Authentication authentication) {
        return authService.userInfo(authentication);
    }

    @PostMapping("/signout")
    public ResponseEntity<?> signOutUser() {
        return authService.logOut();
    }
}
