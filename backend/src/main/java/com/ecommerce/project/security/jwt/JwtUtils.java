package com.ecommerce.project.security.jwt;

import com.ecommerce.project.security.service.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String JWT_SECRET;

    @Value("${jwt.expiration}")
    private Long JWT_EXPIRATION_MS;

    @Value("${jwt.cookie}")
    private String jwtCookie;

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtUtils.class);

    private SecretKey getSigningKey() {
        return Keys
                .hmacShaKeyFor(JWT_SECRET
                        .getBytes(StandardCharsets.UTF_8));
    }

    public String getJwtTokenFromHeader(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        LOGGER.debug("authHeader: {}", authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader
                .replace("Bearer ", "");
    }

    public String generateJwtFromUsername(UserDetails userDetails) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_MS))
                .signWith(getSigningKey())
                .compact();
    }

    public String getJwtFromCookie(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, jwtCookie);
        return cookie == null ? null : cookie.getValue();
    }

    public ResponseCookie generateJwtCookie(UserDetailsImpl userDetails) {
        return ResponseCookie
                .from(jwtCookie, generateJwtFromUsername(userDetails))
                .httpOnly(false)
                .secure(false)
                .path("/api")
                .maxAge(JWT_EXPIRATION_MS / 1000)
                .build();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public void validateJwtToken(String token) throws JwtException {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
    }

    public ResponseCookie getCleanJwtCookie() {
        return ResponseCookie
                .from(jwtCookie, null)
                .path("/api")
                .build();
    }
}
