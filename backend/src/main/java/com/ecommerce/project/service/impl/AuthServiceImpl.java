package com.ecommerce.project.service.impl;

import com.ecommerce.project.config.AppConstants;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Role;
import com.ecommerce.project.model.RoleName;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.dto.UserDTO;
import com.ecommerce.project.payload.response.AuthenticationResult;
import com.ecommerce.project.payload.response.UserResponse;
import com.ecommerce.project.repositories.RoleRepository;
import com.ecommerce.project.repositories.UserRepository;
import com.ecommerce.project.security.jwt.JwtUtils;
import com.ecommerce.project.security.request.LoginRequest;
import com.ecommerce.project.security.request.SignupRequest;
import com.ecommerce.project.security.response.MessageResponse;
import com.ecommerce.project.security.response.UserInfoResponse;
import com.ecommerce.project.security.service.UserDetailsImpl;
import com.ecommerce.project.service.AuthService;
import com.ecommerce.project.util.AppUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

import static com.ecommerce.project.util.AppUtil.getSorting;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;

    private final AppUtil appUtil;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final ModelMapper modelMapper;

    @Override
    public AuthenticationResult login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new AuthenticationResult(
                new UserInfoResponse(
                        userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail(),
                        authentication
                                .getAuthorities()
                                .stream()
                                .map(GrantedAuthority::getAuthority)
                                .toList()
                ),
                jwtUtils.generateJwtCookie(userDetails).toString()
        );
    }

    @Override
    public ResponseEntity<MessageResponse> register(SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Username already exists!"));
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("This Email is already registered!"));
        }

        Set<Role> roles = signupRequest.getRoles() == null
                ?
                Set.of(roleRepository.findByName(RoleName.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("User role not found!")))
                :
                signupRequest.getRoles()
                        .stream()
                        .map(appUtil::getRoleByName)
                        .collect(Collectors.toSet());

        userRepository.save(
                new User().setUsername(signupRequest.getUsername())
                        .setPassword(passwordEncoder.encode(signupRequest.getPassword()))
                        .setEmail(signupRequest.getEmail())
                        .setRoles(roles)
        );
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @Override
    public String getLoggedInUser(Authentication authentication) {
        return authentication == null ? "Guest" : authentication.getName();
    }

    @Override
    public ResponseEntity<?> userInfo(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails == null
                ?
                ResponseEntity.badRequest()
                        .body(new MessageResponse("User not found!"))
                :
                ResponseEntity.ok(new UserInfoResponse(
                        userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail(),
                        authentication
                                .getAuthorities()
                                .stream()
                                .map(GrantedAuthority::getAuthority)
                                .toList()
                ));
    }

    @Override
    public ResponseEntity<?> logOut() {
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtUtils.getCleanJwtCookie().toString())
                .body(new MessageResponse("You've been signed out!"));
    }

    @Override
    public UserResponse getAllUsersByRole(RoleName role, Integer pageNumber) {
        Sort sorting = getSorting(AppConstants.SORT_USERS_BY, "asc");

        Page<User> userPage = userRepository
                .findAllByRoleName(role, PageRequest.of(
                        pageNumber,
                        Integer.parseInt(AppConstants.PAGE_SIZE),
                        sorting));

        return new UserResponse()
                .setContent(userPage
                        .getContent()
                        .stream()
                        .map(user ->
                                modelMapper.map(user, UserDTO.class)
                                        .setRoles(user.getRoles()
                                                .stream()
                                                .map(Role::getName)
                                                .collect(Collectors.toSet())))
                        .toList())
                .setPageNumber(userPage.getNumber())
                .setPageSize(userPage.getSize())
                .setTotalElements(userPage.getTotalElements())
                .setTotalPages(userPage.getTotalPages())
                .setLastPage(userPage.isLast());
    }

    @Override
    public UserDTO addNewRole(Long userId, String role) {
        System.out.println(userId.toString() + role);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        user.getRoles().add(appUtil.getRoleByName(role));

        return modelMapper.map(
                userRepository.save(user),
                UserDTO.class
        ).setRoles(user.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toSet()));
    }
}
