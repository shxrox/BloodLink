package com.example.bloodlinkbackend.Controller;

import com.example.bloodlinkbackend.Model.Registration;
import com.example.bloodlinkbackend.Model.UserLoginRequest;
import com.example.bloodlinkbackend.Repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth") // You can change this if you like
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend requests
public class LoginController {

    @Autowired
    private RegistrationRepository registrationRepository;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest request) {
        Registration user = registrationRepository.findByEmail(request.getEmail());

        if (user == null) {
            return ResponseEntity.status(401).body("User not found");
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        String roleMessage = switch (user.getRole()) {
            case NURSE -> "Welcome Nurse!";
            case DOCTOR -> "Welcome Doctor!";
            case LABTECH -> "Welcome Lab Technician!";
        };

        return ResponseEntity.ok(roleMessage);
    }
}
