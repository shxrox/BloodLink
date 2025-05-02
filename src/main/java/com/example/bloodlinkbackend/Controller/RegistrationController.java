package com.example.bloodlinkbackend.Controller;


import com.example.bloodlinkbackend.Model.Registration;
import com.example.bloodlinkbackend.Service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins = "*")
public class RegistrationController {

    @Autowired
    private RegistrationService service;

    @PostMapping
    public ResponseEntity<?> registerUser(@Valid @RequestBody Registration user) {
        if (service.emailExists(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        service.register(user);
        return ResponseEntity.ok("Registration successful");
    }
}
