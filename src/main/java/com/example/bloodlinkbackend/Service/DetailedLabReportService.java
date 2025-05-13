package com.example.bloodlinkbackend.Service;

import com.example.bloodlinkbackend.Model.DetailedLabReport;
import com.example.bloodlinkbackend.Model.LabReport;
import com.example.bloodlinkbackend.Repository.DetailedLabReportRepository;
import com.example.bloodlinkbackend.Repository.LabReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailedLabReportService {

    @Autowired
    private DetailedLabReportRepository detailedLabReportRepository;

    @Autowired
    private LabReportRepository labReportRepository;


    public DetailedLabReport getByLabReportId(Long reportId) {
        return detailedLabReportRepository.findByLabReport_ReportId(reportId);
    }

    public List<DetailedLabReport> getAllReports() {
        return detailedLabReportRepository.findAll();
    }

    public DetailedLabReport updateReport(Long detailedReportId, DetailedLabReport updatedReport) {
        DetailedLabReport existingReport = detailedLabReportRepository.findById(detailedReportId)
                .orElseThrow(() -> new RuntimeException("Detailed Report not found for ID: " + detailedReportId));

        existingReport.setPlateletCount(updatedReport.getPlateletCount());
        existingReport.setHemoglobinLevel(updatedReport.getHemoglobinLevel());
        existingReport.setWbcCount(updatedReport.getWbcCount());
        existingReport.setRbcCount(updatedReport.getRbcCount());
        existingReport.setNotes(updatedReport.getNotes());

        return detailedLabReportRepository.save(existingReport);
    }

    public void deleteReport(Long detailedReportId) {
        if (detailedLabReportRepository.existsById(detailedReportId)) {
            detailedLabReportRepository.deleteById(detailedReportId);
        } else {
            throw new RuntimeException("Detailed Report not found for ID: " + detailedReportId);
        }
    }
    public DetailedLabReport addDetailedReport(Long reportId, DetailedLabReport report) {
        LabReport labReport = labReportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Lab report not found for ID: " + reportId));

        report.setLabReport(labReport); // Make sure the LabReport is linked correctly
        return detailedLabReportRepository.save(report); // Save the detailed report
    }

}
