package com.ecommerce.project.payload.response;

import com.ecommerce.project.security.response.UserInfoResponse;
import lombok.Data;

@Data
public class AuthenticationResult {

    private final UserInfoResponse userInfo;

    private final String jwtToken;
}
