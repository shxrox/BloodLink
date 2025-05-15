package com.example.bloodlinkbackend.Service;

import com.example.bloodlinkbackend.Model.Medicine;
import com.example.bloodlinkbackend.Model.PatientRegister;
import com.example.bloodlinkbackend.Repository.MedicineRepository;

import com.example.bloodlinkbackend.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private PatientRepository patientRegisterRepository;

    // CREATE
    public Medicine addMedicine(Long patientId, Medicine medicine) {
        Optional<PatientRegister> optionalPatient = patientRegisterRepository.findById(patientId);
        if (optionalPatient.isPresent()) {
            medicine.setPatient(optionalPatient.get());
            return medicineRepository.save(medicine);
        } else {
            throw new RuntimeException("Patient not found with ID: " + patientId);
        }
    }

    // READ - Get all medicines
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    // READ - Get medicines by patient
    public List<Medicine> getMedicinesByPatientId(Long patientId) {
        return medicineRepository.findByPatient_PatientId(patientId);
    }

    // READ - Get medicine by ID
    public Medicine getMedicineById(Long id) {
        return medicineRepository.findById(id).orElse(null);
    }

    // UPDATE
    public Medicine updateMedicine(Long id, Medicine updatedMedicine) {
        Optional<Medicine> optional = medicineRepository.findById(id);
        if (optional.isPresent()) {
            Medicine existing = optional.get();
            existing.setName(updatedMedicine.getName());
            existing.setDosage(updatedMedicine.getDosage());
            existing.setInstructions(updatedMedicine.getInstructions());
            return medicineRepository.save(existing);
        } else {
            throw new RuntimeException("Medicine not found with ID: " + id);
        }
    }

    // DELETE
    public void deleteMedicine(Long id) {
        if (medicineRepository.existsById(id)) {
            medicineRepository.deleteById(id);
        } else {
            throw new RuntimeException("Medicine not found with ID: " + id);
        }
    }
}
