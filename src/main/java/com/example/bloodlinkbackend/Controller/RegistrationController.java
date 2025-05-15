package com.example.bloodlinkbackend.Controller;

import com.example.bloodlinkbackend.Model.Registration;
import com.example.bloodlinkbackend.Repository.RegistrationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/registration")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    @Autowired
    private RegistrationRepository registrationRepository;


    @PostMapping
    public ResponseEntity<?> registerUser(@Valid @RequestBody Registration registration) {
        try {
            Registration saved = registrationRepository.save(registration);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving registration: " + e.getMessage());
        }
    }


    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getRegistrationById(@PathVariable Long id) {
        return registrationRepository.findById(id)
                .map(registration -> ResponseEntity.ok().body(registration))
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRegistration(@PathVariable Long id) {
        if (registrationRepository.existsById(id)) {
            registrationRepository.deleteById(id);
            return ResponseEntity.ok("Registration deleted");
        } else {
            return ResponseEntity.status(404).body("Registration not found");
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Registration> updateRegistration(@PathVariable Long id, @Valid @RequestBody Registration updated) {
        Registration existing = registrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registration with ID " + id + " not found"));

        existing.setName(updated.getName());
        existing.setEmail(updated.getEmail());
        existing.setMobile_num(updated.getMobile_num());
        existing.setPassword(updated.getPassword());
        existing.setRole(updated.getRole());

        registrationRepository.save(existing);
        return ResponseEntity.ok(existing);
    }

}
