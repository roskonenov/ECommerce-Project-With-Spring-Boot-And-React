package com.ecommerce.project.security.jwt;

import com.ecommerce.project.security.service.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        LOGGER.debug("JwtAuthenticationFilter called for URI: {}", request.getRequestURI());
            String jwtToken = jwtUtils.getJwtFromCookie(request) != null
                    ?
                    jwtUtils.getJwtFromCookie(request)
                    :
                    jwtUtils.getJwtTokenFromHeader(request);

            if (jwtToken != null &&
                    !jwtToken.isBlank() &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                jwtUtils.validateJwtToken(jwtToken);

                UserDetails userDetails = userDetailsService.loadUserByUsername(jwtUtils.getUsernameFromToken(jwtToken));

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authentication.setDetails(new WebAuthenticationDetailsSource()
                        .buildDetails(request));

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);

                LOGGER.debug("Roles from JWT token: {}", userDetails.getAuthorities());
            }
        filterChain.doFilter(request, response);
    }
}
