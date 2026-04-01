package com.example.bloodlinkbackend.Service;

import com.example.bloodlinkbackend.Model.Registration;
import com.example.bloodlinkbackend.Repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    public Registration getRegistrationById(Long id) {
        return registrationRepository.findById(id).orElse(null);
    }

    public Registration saveRegistration(Registration registration) {
        return registrationRepository.save(registration);
    }

    public void deleteRegistration(Long id) {
        registrationRepository.deleteById(id);
    }

    public Registration updateRegistration(Long id, Registration registration) {
        Registration existing = registrationRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(registration.getName());
            existing.setEmail(registration.getEmail());
            existing.setMobile_num(registration.getMobile_num());
            existing.setPassword(registration.getPassword());
            existing.setRole(registration.getRole());
            return registrationRepository.save(existing);
        }
        return null;
    }
}
