package com.example.bloodlinkbackend.Model;

public class UserLoginRequest {
    private String email;
    private String password;

    // Constructors (optional)
    public UserLoginRequest() {}

    public UserLoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
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
