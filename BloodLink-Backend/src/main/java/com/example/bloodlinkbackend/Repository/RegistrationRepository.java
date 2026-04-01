package com.example.bloodlinkbackend.Repository;

import com.example.bloodlinkbackend.Model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    Registration findByEmail(String email);
}
