package com.example.bloodlinkbackend.Controller;

import com.example.bloodlinkbackend.Model.DoctorDescription;
import com.example.bloodlinkbackend.Service.DoctorDescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor-descriptions")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorDescriptionController {

    @Autowired
    private DoctorDescriptionService doctorDescriptionService;

    @PostMapping("/{patientId}")
    public ResponseEntity<DoctorDescription> addDescription(@PathVariable Long patientId,
                                                            @RequestBody DoctorDescription description) {
        DoctorDescription saved = doctorDescriptionService.addDescription(patientId, description);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<DoctorDescription>> getByPatient(@PathVariable Long patientId) {
        List<DoctorDescription> list = doctorDescriptionService.getDescriptionsByPatientId(patientId);
        return ResponseEntity.ok(list);
    }

    @GetMapping
    public ResponseEntity<List<DoctorDescription>> getAll() {
        return ResponseEntity.ok(doctorDescriptionService.getAllDescriptions());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorDescription> updateDescription(@PathVariable Long id,
                                                               @RequestBody DoctorDescription updated) {
        DoctorDescription result = doctorDescriptionService.updateDescription(id, updated);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDescription(@PathVariable Long id) {
        doctorDescriptionService.deleteDescription(id);
        return ResponseEntity.noContent().build();
    }
}
