package com.example.bloodlinkbackend.Service;

import com.example.bloodlinkbackend.Model.LabReport;
import com.example.bloodlinkbackend.Model.PatientRegister;
import com.example.bloodlinkbackend.Repository.LabReportRepository;
import com.example.bloodlinkbackend.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LabReportService {

    @Autowired
    private LabReportRepository labReportRepository;

    @Autowired
    private PatientRepository patientRepo;

    public LabReport addLabReport(Long patientId, LabReport labReport) {
        Optional<PatientRegister> patientOpt = patientRepo.findById(patientId);
        if (patientOpt.isPresent()) {
            labReport.setPatient(patientOpt.get());
            return labReportRepository.save(labReport);
        } else {
            throw new RuntimeException("Patient not found with ID: " + patientId);
        }
    }

    public LabReport updateLabReport(Long reportId, LabReport updatedReport) {
        Optional<LabReport> existing = labReportRepository.findById(reportId);
        if (existing.isPresent()) {
            LabReport report = existing.get();
            report.setTestType(updatedReport.getTestType());
            report.setResultSummary(updatedReport.getResultSummary());
            report.setSentToLab(updatedReport.getSentToLab());
            report.setLabTechnician(updatedReport.getLabTechnician());
            return labReportRepository.save(report);
        } else {
            throw new RuntimeException("Lab report not found with ID: " + reportId);
        }
    }

    public void deleteLabReport(Long reportId) {
        if (labReportRepository.existsById(reportId)) {
            labReportRepository.deleteById(reportId);
        } else {
            throw new RuntimeException("Lab report not found with ID: " + reportId);
        }
    }

    public LabReport getReportById(Long reportId) {
        return labReportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Lab report not found with ID: " + reportId));
    }

    public List<LabReport> getReportsByPatientName(String name) {
        return labReportRepository.findByPatientFullName(name);
    }

    public List<LabReport> getAllReports() {
        return labReportRepository.findAll();
    }
}
