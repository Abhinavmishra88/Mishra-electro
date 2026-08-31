package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public UserController(
            UserRepository userRepository
    ) {

        this.userRepository =
                userRepository;

    }


    // =====================================================
    // GET USER BY EMAIL
    // =====================================================

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(
            @PathVariable String email
    ) {

        try {

            User user =
                    userRepository
                            .findByEmailIgnoreCase(email)
                            .orElse(null);


            if (user == null) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(
                                Map.of(
                                        "message",
                                        "User not found"
                                )
                        );

            }


            return ResponseEntity.ok(
                    createUserResponse(user)
            );


        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            Map.of(
                                    "message",
                                    "Failed to get user"
                            )
                    );

        }
    }


    // =====================================================
    // GET USER BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(
            @PathVariable Long id
    ) {

        try {

            User user =
                    userRepository
                            .findById(id)
                            .orElse(null);


            if (user == null) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(
                                Map.of(
                                        "message",
                                        "User not found"
                                )
                        );

            }


            return ResponseEntity.ok(
                    createUserResponse(user)
            );


        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            Map.of(
                                    "message",
                                    "Failed to get user"
                            )
                    );

        }
    }


    // =====================================================
    // UPDATE PROFILE
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProfile(
            @PathVariable Long id,
            @RequestBody User request
    ) {

        try {

            User existingUser =
                    userRepository
                            .findById(id)
                            .orElse(null);


            if (existingUser == null) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(
                                Map.of(
                                        "message",
                                        "User not found"
                                )
                        );

            }


            // -------------------------------------------------
            // NAME
            // -------------------------------------------------

            if (
                    request.getName() != null &&
                    !request.getName().trim().isEmpty()
            ) {

                existingUser.setName(
                        request.getName().trim()
                );

            }


            // -------------------------------------------------
            // PHONE
            // -------------------------------------------------

            existingUser.setPhone(
                    request.getPhone()
            );


            // -------------------------------------------------
            // ADDRESS
            // -------------------------------------------------

            existingUser.setAddress(
                    request.getAddress()
            );


            // -------------------------------------------------
            // CITY
            // -------------------------------------------------

            existingUser.setCity(
                    request.getCity()
            );


            // -------------------------------------------------
            // STATE
            // -------------------------------------------------

            existingUser.setState(
                    request.getState()
            );


            // -------------------------------------------------
            // PINCODE
            // -------------------------------------------------

            existingUser.setPincode(
                    request.getPincode()
            );


            // -------------------------------------------------
            // PROFILE PICTURE
            // -------------------------------------------------

            existingUser.setProfilePicture(
                    request.getProfilePicture()
            );


            User savedUser =
                    userRepository.save(
                            existingUser
                    );


            return ResponseEntity.ok(
                    createUserResponse(savedUser)
            );


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            Map.of(
                                    "message",
                                    "Failed to update profile"
                            )
                    );

        }
    }


    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    @PutMapping("/{id}/password")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> request
    ) {

        try {

            User user =
                    userRepository
                            .findById(id)
                            .orElse(null);


            if (user == null) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(
                                Map.of(
                                        "message",
                                        "User not found"
                                )
                        );

            }


            String currentPassword =
                    request.get("currentPassword");


            String newPassword =
                    request.get("newPassword");


            // -------------------------------------------------
            // VALIDATE CURRENT PASSWORD
            // -------------------------------------------------

            if (
                    currentPassword == null ||
                    currentPassword.isEmpty()
            ) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "message",
                                        "Current password is required"
                                )
                        );

            }


            if (
                    !user.getPassword()
                            .equals(currentPassword)
            ) {

                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(
                                Map.of(
                                        "message",
                                        "Current password is incorrect"
                                )
                        );

            }


            // -------------------------------------------------
            // VALIDATE NEW PASSWORD
            // -------------------------------------------------

            if (
                    newPassword == null ||
                    newPassword.length() < 6
            ) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "message",
                                        "New password must contain at least 6 characters"
                                )
                        );

            }


            // -------------------------------------------------
            // SAVE PASSWORD
            // -------------------------------------------------

            user.setPassword(
                    newPassword
            );


            userRepository.save(user);


            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Password changed successfully"
                    )
            );


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            Map.of(
                                    "message",
                                    "Failed to change password"
                            )
                    );

        }
    }


    // =====================================================
    // DELETE USER
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id
    ) {

        try {

            if (
                    !userRepository.existsById(id)
            ) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(
                                Map.of(
                                        "message",
                                        "User not found"
                                )
                        );

            }


            userRepository.deleteById(id);


            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "User deleted successfully"
                    )
            );


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            Map.of(
                                    "message",
                                    "Failed to delete user"
                            )
                    );

        }
    }


    // =====================================================
    // USER RESPONSE
    // =====================================================

    private Map<String, Object>
    createUserResponse(User user) {

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


        // IMPORTANT:
        // Password is intentionally NOT returned.

        return response;
    }
}