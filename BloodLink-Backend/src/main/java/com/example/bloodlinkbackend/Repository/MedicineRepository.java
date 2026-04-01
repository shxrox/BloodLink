package com.example.bloodlinkbackend.Repository;

import com.example.bloodlinkbackend.Model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findByPatient_PatientId(Long patientId);
}
