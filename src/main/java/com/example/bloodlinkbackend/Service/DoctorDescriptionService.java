package com.example.bloodlinkbackend.Service;

import com.example.bloodlinkbackend.Model.DoctorDescription;
import com.example.bloodlinkbackend.Model.PatientRegister;
import com.example.bloodlinkbackend.Repository.DoctorDescriptionRepository;
import com.example.bloodlinkbackend.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorDescriptionService {

    @Autowired
    private DoctorDescriptionRepository doctorDescriptionRepository;

    @Autowired
    private PatientRepository patientRepository;

    public DoctorDescription addDescription(Long patientId, DoctorDescription description) {
        Optional<PatientRegister> patient = patientRepository.findById(patientId);
        if (patient.isEmpty()) {
            throw new IllegalArgumentException("Patient not found");
        }
        description.setPatient(patient.get());
        return doctorDescriptionRepository.save(description);
    }

    public List<DoctorDescription> getDescriptionsByPatientId(Long patientId) {
        Optional<PatientRegister> patient = patientRepository.findById(patientId);
        return patient.map(doctorDescriptionRepository::findByPatient).orElseThrow(() -> new IllegalArgumentException("Patient not found"));
    }

    public DoctorDescription updateDescription(Long id, DoctorDescription updated) {
        return doctorDescriptionRepository.findById(id).map(existing -> {
            existing.setDescription(updated.getDescription());
            existing.setCreatedBy(updated.getCreatedBy());
            return doctorDescriptionRepository.save(existing);
        }).orElse(null);
    }

    public void deleteDescription(Long id) {
        doctorDescriptionRepository.deleteById(id);
    }

    public List<DoctorDescription> getAllDescriptions() {
        return doctorDescriptionRepository.findAll();
    }
}
