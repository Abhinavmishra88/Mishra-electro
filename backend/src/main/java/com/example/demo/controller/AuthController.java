package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // =====================================================
    // CUSTOMER LOGIN
    // POST: /api/auth/login
    // =====================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        try {

            // -------------------------------------------------
            // VALIDATE REQUEST
            // -------------------------------------------------

            if (request == null) {
                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Request body is required"
                        ));
            }

            String email = request.getEmail();
            String password = request.getPassword();

            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Email is required"
                        ));
            }

            if (password == null || password.isEmpty()) {
                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Password is required"
                        ));
            }

            // -------------------------------------------------
            // FIND USER
            // -------------------------------------------------

            Optional<User> optionalUser =
                    userRepository.findByEmailIgnoreCase(
                            email.trim()
                    );

            if (optionalUser.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of(
                                "message",
                                "Invalid email or password"
                        ));
            }

            User user = optionalUser.get();

            // -------------------------------------------------
            // CHECK PASSWORD
            // -------------------------------------------------

            if (user.getPassword() == null ||
                    !user.getPassword().equals(password)) {

                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of(
                                "message",
                                "Invalid email or password"
                        ));
            }

            // -------------------------------------------------
            // ADMIN CANNOT USE CUSTOMER LOGIN
            // -------------------------------------------------

            if ("ADMIN".equalsIgnoreCase(user.getRole())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(Map.of(
                                "message",
                                "Please use Admin Login"
                        ));
            }

            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            return ResponseEntity.ok(
                    createUserResponse(
                            user,
                            "Login successful"
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "message",
                            "Login failed",
                            "error",
                            e.getMessage()
                    ));
        }
    }


    // =====================================================
    // ADMIN LOGIN
    // POST: /api/auth/admin/login
    // =====================================================

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(
            @RequestBody LoginRequest request) {

        try {

            // -------------------------------------------------
            // VALIDATE REQUEST
            // -------------------------------------------------

            if (request == null) {
                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Request body is required"
                        ));
            }

            String email = request.getEmail();
            String password = request.getPassword();

            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Email is required"
                        ));
            }

            if (password == null || password.isEmpty()) {
                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Password is required"
                        ));
            }

            // -------------------------------------------------
            // FIND USER
            // -------------------------------------------------

            Optional<User> optionalUser =
                    userRepository.findByEmailIgnoreCase(
                            email.trim()
                    );

            if (optionalUser.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of(
                                "message",
                                "Invalid email or password"
                        ));
            }

            User user = optionalUser.get();

            // -------------------------------------------------
            // CHECK PASSWORD
            // -------------------------------------------------

            if (user.getPassword() == null ||
                    !user.getPassword().equals(password)) {

                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of(
                                "message",
                                "Invalid email or password"
                        ));
            }

            // -------------------------------------------------
            // CHECK ADMIN ROLE
            // -------------------------------------------------

            if (!"ADMIN".equalsIgnoreCase(user.getRole())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(Map.of(
                                "message",
                                "Admin access denied"
                        ));
            }

            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            return ResponseEntity.ok(
                    createUserResponse(
                            user,
                            "Admin login successful"
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "message",
                            "Admin login failed",
                            "error",
                            e.getMessage()
                    ));
        }
    }


    // =====================================================
    // CUSTOMER REGISTRATION
    // POST: /api/auth/register
    // =====================================================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {

        try {

            // -------------------------------------------------
            // VALIDATE REQUEST
            // -------------------------------------------------

            if (request == null) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Request body is required"
                        ));
            }

            String name = request.getName();
            String email = request.getEmail();
            String phone = request.getPhone();
            String password = request.getPassword();

            // -------------------------------------------------
            // NAME
            // -------------------------------------------------

            if (name == null || name.trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Name is required"
                        ));
            }

            // -------------------------------------------------
            // EMAIL
            // -------------------------------------------------

            if (email == null || email.trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Email is required"
                        ));
            }

            email = email.trim().toLowerCase();

            // -------------------------------------------------
            // PHONE
            // -------------------------------------------------

            if (phone == null || phone.trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Phone number is required"
                        ));
            }

            // -------------------------------------------------
            // PASSWORD
            // -------------------------------------------------

            if (password == null || password.isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Password is required"
                        ));
            }

            // -------------------------------------------------
            // CHECK EXISTING EMAIL
            // -------------------------------------------------

            if (userRepository.existsByEmailIgnoreCase(email)) {

                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(Map.of(
                                "message",
                                "Email already registered"
                        ));
            }

            // -------------------------------------------------
            // CHECK EXISTING PHONE
            // -------------------------------------------------

            if (userRepository.findByPhone(phone.trim()).isPresent()) {

                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(Map.of(
                                "message",
                                "Phone number already registered"
                        ));
            }

            // -------------------------------------------------
            // CREATE CUSTOMER
            // -------------------------------------------------

            User user = new User();

            user.setName(name.trim());
            user.setEmail(email);
            user.setPhone(phone.trim());
            user.setPassword(password);

            // Every public registration is CUSTOMER
            user.setRole("CUSTOMER");

            // Optional fields
            user.setProfilePicture(null);
            user.setAddress(null);
            user.setCity(null);
            user.setState(null);
            user.setPincode(null);

            // -------------------------------------------------
            // SAVE
            // -------------------------------------------------

            User savedUser =
                    userRepository.save(user);

            // -------------------------------------------------
            // RESPONSE
            // -------------------------------------------------

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Registration successful"
            );

            response.put(
                    "id",
                    savedUser.getId()
            );

            response.put(
                    "name",
                    savedUser.getName()
            );

            response.put(
                    "email",
                    savedUser.getEmail()
            );

            response.put(
                    "phone",
                    savedUser.getPhone()
            );

            response.put(
                    "role",
                    savedUser.getRole()
            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "message",
                            "Registration failed",
                            "error",
                            e.getMessage()
                    ));
        }
    }


    // =====================================================
    // CREATE USER RESPONSE
    // =====================================================

    private Map<String, Object> createUserResponse(
            User user,
            String message) {

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "id",
                user.getId()
        );

        response.put(
                "name",
                user.getName()
        );

        response.put(
                "email",
                user.getEmail()
        );

        response.put(
                "phone",
                user.getPhone()
        );

        response.put(
                "role",
                user.getRole()
        );

        response.put(
                "profilePicture",
                user.getProfilePicture()
        );

        response.put(
                "address",
                user.getAddress()
        );

        response.put(
                "city",
                user.getCity()
        );

        response.put(
                "state",
                user.getState()
        );

        response.put(
                "pincode",
                user.getPincode()
        );

        response.put(
                "message",
                message
        );

        return response;
    }


    // =====================================================
    // LOGIN REQUEST DTO
    // =====================================================

    public static class LoginRequest {

        private String email;
        private String password;

        public LoginRequest() {
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }


    // =====================================================
    // REGISTER REQUEST DTO
    // =====================================================

    public static class RegisterRequest {

        private String name;
        private String email;
        private String phone;
        private String password;

        public RegisterRequest() {
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}