package com.example.bloodlinkbackend.Repository;

import com.example.bloodlinkbackend.Model.PatientRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<PatientRegister, Long> {

}
