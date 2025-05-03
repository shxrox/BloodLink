package com.example.bloodlinkbackend.Controller;

import com.example.bloodlinkbackend.Model.Registration;
import com.example.bloodlinkbackend.Service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registration")
@CrossOrigin(origins = "http://localhost:5173/")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }

    @GetMapping("/{id}")
    public Registration getRegistrationById(@PathVariable Long id) {
        return registrationService.getRegistrationById(id);
    }

    @PostMapping
    public Registration addRegistration(@RequestBody Registration registration) {
        return registrationService.saveRegistration(registration);
    }

    @PutMapping("/{id}")
    public Registration updateRegistration(@PathVariable Long id, @RequestBody Registration registration) {
        return registrationService.updateRegistration(id, registration);
    }

    @DeleteMapping("/{id}")
    public void deleteRegistration(@PathVariable Long id) {
        registrationService.deleteRegistration(id);
    }
}
