package com.example.bloodlinkbackend.Service;

import com.example.bloodlinkbackend.Model.Registration;
import com.example.bloodlinkbackend.Repository.RegistrationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository repository;

    public boolean emailExists(String email) {
        return repository.findByEmail(email).isPresent();
    }

    public Registration register(Registration registration) {
        return repository.save(registration);
    }
}
