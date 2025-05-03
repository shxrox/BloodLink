package com.example.bloodlinkbackend.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "registration")
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reg_id;

    private String name;
    private String email;
    private String mobile_num;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        NURSE,
        DOCTOR,
        LABTECH
    }

    public Registration() {}

    public Registration(String name, String email, String mobile_num, String password, Role role) {
        this.name = name;
        this.email = email;
        this.mobile_num = mobile_num;
        this.password = password;
        this.role = role;
    }

    // Getters and setters
    public Long getReg_id() {
        return reg_id;
    }

    public void setReg_id(Long reg_id) {
        this.reg_id = reg_id;
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

    public String getMobile_num() {
        return mobile_num;
    }

    public void setMobile_num(String mobile_num) {
        this.mobile_num = mobile_num;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
