package com.example.bloodlinkbackend.Model;


import jakarta.persistence.*;

import javax.validation.constraints.*;

@Entity
@Table(name = "Registration")
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reg_id;

    @NotBlank(message = "Name is required")
    @Size(min = 5, max = 100, message = "Name must be between 5 and 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 100, message = "Email must be less than 100 characters")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Mobile number is required")
    @Pattern(
            regexp = "^(07[0-9]{8})$",
            message = "Mobile number must be 10 digits and start with 07"
    )
    private String mobile_num;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 20, message = "Password must be 8–20 characters")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$",
            message = "Password must include uppercase, lowercase, digit, and special character"
    )
    private String password;

    @Transient
    @NotBlank(message = "Password confirmation is required")
    private String confirmPassword;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Role is required")
    private Role role;

    public enum Role {
        NURSE,
        DOCTOR,
        LABTECH
    }

    public Registration() {
    }

    public Registration(Long reg_id, String name, String email, String mobile_num, String password, String confirmPassword, Role role) {
        this.reg_id = reg_id;
        this.name = name;
        this.email = email;
        this.mobile_num = mobile_num;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.role = role;
    }

    public Long getReg_id() {
        return reg_id;
    }

    public void setReg_id(Long reg_id) {
        this.reg_id = reg_id;
    }

    public @NotBlank(message = "Name is required") @Size(min = 5, max = 100, message = "Name must be between 5 and 100 characters") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "Name is required") @Size(min = 5, max = 100, message = "Name must be between 5 and 100 characters") String name) {
        this.name = name;
    }

    public @NotBlank(message = "Email is required") @Email(message = "Invalid email format") @Size(max = 100, message = "Email must be less than 100 characters") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "Email is required") @Email(message = "Invalid email format") @Size(max = 100, message = "Email must be less than 100 characters") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Mobile number is required") @Pattern(
            regexp = "^(07[0-9]{8})$",
            message = "Mobile number must be 10 digits and start with 07"
    ) String getMobile_num() {
        return mobile_num;
    }

    public void setMobile_num(@NotBlank(message = "Mobile number is required") @Pattern(
            regexp = "^(07[0-9]{8})$",
            message = "Mobile number must be 10 digits and start with 07"
    ) String mobile_num) {
        this.mobile_num = mobile_num;
    }

    public @NotBlank(message = "Password is required") @Size(min = 8, max = 20, message = "Password must be 8–20 characters") @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$",
            message = "Password must include uppercase, lowercase, digit, and special character"
    ) String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password is required") @Size(min = 8, max = 20, message = "Password must be 8–20 characters") @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$",
            message = "Password must include uppercase, lowercase, digit, and special character"
    ) String password) {
        this.password = password;
    }

    public @NotBlank(message = "Password confirmation is required") String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(@NotBlank(message = "Password confirmation is required") String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public @NotNull(message = "Role is required") Role getRole() {
        return role;
    }

    public void setRole(@NotNull(message = "Role is required") Role role) {
        this.role = role;
    }
}
