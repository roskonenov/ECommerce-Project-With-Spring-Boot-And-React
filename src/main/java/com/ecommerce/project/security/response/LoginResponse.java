package com.ecommerce.project.security.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
public class LoginResponse {

    private String username;

    private String jwtToken;

    private List<String> roles;
}
