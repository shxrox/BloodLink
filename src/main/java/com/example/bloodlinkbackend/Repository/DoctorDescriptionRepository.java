package com.example.bloodlinkbackend.Repository;

import com.example.bloodlinkbackend.Model.DoctorDescription;
import com.example.bloodlinkbackend.Model.PatientRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DoctorDescriptionRepository extends JpaRepository<DoctorDescription, Long> {
    List<DoctorDescription> findByPatient(PatientRegister patient);
}
