package com.example.bloodlinkbackend.Service;

import com.example.bloodlinkbackend.Model.PatientRegister;
import com.example.bloodlinkbackend.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // Add new patient
    public PatientRegister addPatient(PatientRegister patient) {
        return patientRepository.save(patient);
    }
    public PatientRegister getPatientEntityById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    // Get all patients
    public List<PatientRegister> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get patient by ID
    public Optional<PatientRegister> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    // Delete patient
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    // Update patient
    public PatientRegister updatePatient(Long id, PatientRegister updatedPatient) {
        if (patientRepository.existsById(id)) {
            updatedPatient.setPatientId(id); // Ensure we set the existing ID
            return patientRepository.save(updatedPatient);
        }
        return null;
    }
}
