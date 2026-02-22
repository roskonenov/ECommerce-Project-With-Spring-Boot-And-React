package com.ecommerce.project.service;

import com.ecommerce.project.payload.response.AuthenticationResult;
import com.ecommerce.project.security.request.LoginRequest;
import com.ecommerce.project.security.request.SignupRequest;
import com.ecommerce.project.security.response.MessageResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface AuthService {
    AuthenticationResult login(LoginRequest loginRequest);

    ResponseEntity<MessageResponse> register(@Valid SignupRequest signupRequest);

    String getLoggedInUser(Authentication authentication);

    ResponseEntity<?> userInfo(Authentication authentication);

    ResponseEntity<?> logOut();
}
