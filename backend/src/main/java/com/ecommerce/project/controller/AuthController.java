package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConstants;
import com.ecommerce.project.model.RoleName;
import com.ecommerce.project.payload.dto.UserDTO;
import com.ecommerce.project.payload.response.AuthenticationResult;
import com.ecommerce.project.payload.response.UserResponse;
import com.ecommerce.project.security.request.LoginRequest;
import com.ecommerce.project.security.request.SignupRequest;
import com.ecommerce.project.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/admin/sellers")
    public ResponseEntity<UserResponse> getAllSellers(
            @RequestParam(defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber
    ) {
        return new ResponseEntity<>(
                authService.getAllUsersByRole(RoleName.ROLE_SELLER, pageNumber),
                HttpStatus.OK
        );
    }

    @GetMapping("/admin/user")
    public ResponseEntity<UserResponse> getAllUsers(
            @RequestParam(defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber
    ) {
        return new ResponseEntity<>(
                authService.getAllUsersByRole(RoleName.ROLE_USER, pageNumber),
                HttpStatus.OK
        );
    }

    @PutMapping("/admin/role/add/{userId}")
    public ResponseEntity<UserDTO> addRole(
            @PathVariable Long userId,
            @RequestParam(defaultValue = AppConstants.DEFAULT_ROLE, required = false) String role
    ) {
        return new ResponseEntity<>(
                authService.addNewRole(userId, role),
                HttpStatus.OK
        );
    }

    @PutMapping("/admin/role/remove/{userId}")
    public ResponseEntity<UserDTO> removeRole(
            @PathVariable Long userId,
            @RequestParam(defaultValue = AppConstants.DEFAULT_ROLE, required = false) String role
    ) {
        return new ResponseEntity<>(
                authService.removeRole(userId, role),
                HttpStatus.OK
        );
    }
}
