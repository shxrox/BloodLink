package com.example.bloodlinkbackend.Controller;

import com.example.bloodlinkbackend.Model.Medicine;
import com.example.bloodlinkbackend.Service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping("/{patientId}")
    public ResponseEntity<Medicine> addMedicine(@PathVariable Long patientId, @RequestBody Medicine medicine) {
        return ResponseEntity.ok(medicineService.addMedicine(patientId, medicine));
    }

    @GetMapping
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        return ResponseEntity.ok(medicineService.getAllMedicines());
    }

    // READ BY PATIENT
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Medicine>> getMedicinesByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(medicineService.getMedicinesByPatientId(patientId));
    }


    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable Long id) {
        Medicine medicine = medicineService.getMedicineById(id);
        return medicine != null ? ResponseEntity.ok(medicine) : ResponseEntity.notFound().build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<Medicine> updateMedicine(@PathVariable Long id, @RequestBody Medicine medicine) {
        try {
            return ResponseEntity.ok(medicineService.updateMedicine(id, medicine));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicine(@PathVariable Long id) {
        try {
            medicineService.deleteMedicine(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
