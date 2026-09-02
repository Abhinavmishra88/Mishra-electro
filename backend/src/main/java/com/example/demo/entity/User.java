package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    // =====================================================
    // ID
    // =====================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =====================================================
    // BASIC USER INFORMATION
    // =====================================================

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;

    @Column(nullable = false)
    private String role = "CUSTOMER";


    // =====================================================
    // PROFILE PICTURE
    // =====================================================

    @Column(
        name = "profile_picture",
        columnDefinition = "TEXT"
    )
    private String profilePicture;


    // =====================================================
    // ADDRESS
    // =====================================================

    @Column(columnDefinition = "TEXT")
    private String address;

    private String city;

    private String state;

    private String pincode;


    // =====================================================
    // DEFAULT CONSTRUCTOR
    // =====================================================

    public User() {
    }


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public User(
            String name,
            String email,
            String password,
            String phone,
            String role
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = role;
    }


    // =====================================================
    // ID
    // =====================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // =====================================================
    // NAME
    // =====================================================

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    // =====================================================
    // EMAIL
    // =====================================================

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    // =====================================================
    // PASSWORD
    // =====================================================

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    // =====================================================
    // PHONE
    // =====================================================

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    // =====================================================
    // ROLE
    // =====================================================

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }


    // =====================================================
    // PROFILE PICTURE
    // =====================================================

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }


    // =====================================================
    // ADDRESS
    // =====================================================

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    // =====================================================
    // CITY
    // =====================================================

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


    // =====================================================
    // STATE
    // =====================================================

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    // =====================================================
    // PINCODE
    // =====================================================

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }
}