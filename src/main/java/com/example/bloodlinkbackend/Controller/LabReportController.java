package com.example.bloodlinkbackend.Controller;

import com.example.bloodlinkbackend.Model.LabReport;
import com.example.bloodlinkbackend.Model.PatientRegister;
import com.example.bloodlinkbackend.Service.LabReportService;
import com.example.bloodlinkbackend.Service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/labreports")
@CrossOrigin(origins = "http://localhost:5173/")
public class LabReportController {

    @Autowired
    private LabReportService labReportService;

    @Autowired
    private PatientService patientRegisterService;

    @PostMapping("/add/{patientId}")
    public LabReport createReport(@PathVariable Long patientId, @RequestBody LabReport labReport) {
        PatientRegister patient = patientRegisterService.getPatientById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + patientId));

        labReport.setPatient(patient);
        return labReportService.addLabReport(patientId, labReport);
    }

    @PutMapping("/update/{reportId}")
    public LabReport updateReport(@PathVariable Long reportId, @RequestBody LabReport updatedReport) {
        return labReportService.updateLabReport(reportId, updatedReport);
    }

    @DeleteMapping("/delete/{reportId}")
    public String deleteReport(@PathVariable Long reportId) {
        labReportService.deleteLabReport(reportId);
        return "Lab report deleted successfully";
    }

    @GetMapping("/{reportId}")
    public LabReport getReportById(@PathVariable Long reportId) {
        return labReportService.getReportById(reportId);
    }

    @GetMapping("/byPatientName")
    public List<LabReport> getByPatientName(@RequestParam String name) {
        return labReportService.getReportsByPatientName(name);
    }

    @GetMapping("/all")
    public List<LabReport> getAllReports() {
        return labReportService.getAllReports();
    }
}
