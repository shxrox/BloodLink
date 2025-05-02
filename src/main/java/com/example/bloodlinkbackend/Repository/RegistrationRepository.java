package com.example.bloodlinkbackend.Repository;

import com.example.bloodlinkbackend.Model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationRepository extends JpaRepository <Registration,Long>{
    Optional<Registration> findByEmail(String email);
    List<Registration> findByNameContaining(String name);
}
