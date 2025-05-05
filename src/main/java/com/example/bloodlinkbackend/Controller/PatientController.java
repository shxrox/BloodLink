package com.example.bloodlinkbackend.Controller;

import com.example.bloodlinkbackend.Model.PatientRegister;
import com.example.bloodlinkbackend.Service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    @Autowired
    private PatientService patientService;

    // Add a new patient
    @PostMapping
    public ResponseEntity<PatientRegister> addPatient(@RequestBody PatientRegister patient) {
        PatientRegister savedPatient = patientService.addPatient(patient);
        return new ResponseEntity<>(savedPatient, HttpStatus.CREATED);
    }

    // Get all patients
    @GetMapping
    public ResponseEntity<List<PatientRegister>> getAllPatients() {
        List<PatientRegister> patients = patientService.getAllPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    // Get patient by ID
    @GetMapping("/{id}")
    public ResponseEntity<PatientRegister> getPatientById(@PathVariable Long id) {
        Optional<PatientRegister> patient = patientService.getPatientById(id);
        return patient.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Update patient
    @PutMapping("/{id}")
    public ResponseEntity<PatientRegister> updatePatient(@PathVariable Long id, @RequestBody PatientRegister updatedPatient) {
        PatientRegister patient = patientService.updatePatient(id, updatedPatient);
        if (patient != null) {
            return new ResponseEntity<>(patient, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete patient
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
