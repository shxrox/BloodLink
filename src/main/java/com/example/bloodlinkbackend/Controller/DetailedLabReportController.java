package com.example.bloodlinkbackend.Controller;

import com.example.bloodlinkbackend.Model.DetailedLabReport;
import com.example.bloodlinkbackend.Model.LabReport;
import com.example.bloodlinkbackend.Repository.LabReportRepository;  // Import the repository
import com.example.bloodlinkbackend.Repository.DetailedLabReportRepository;  // Import the repository
import com.example.bloodlinkbackend.Service.DetailedLabReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detailedreports")
@CrossOrigin(origins = "http://localhost:5173/")
public class DetailedLabReportController {

    @Autowired
    private DetailedLabReportService detailedService;

    @Autowired
    private LabReportRepository labReportRepository;  // Inject LabReportRepository

    @Autowired
    private DetailedLabReportRepository detailedLabReportRepository;  // Inject DetailedLabReportRepository


    @PostMapping("/add/{reportId}")
    public DetailedLabReport addDetailedReport(@PathVariable Long reportId, @RequestBody DetailedLabReport report) {
        LabReport labReport = labReportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Lab report not found for ID: " + reportId));

        report.setLabReport(labReport); // Set the lab report relationship
        return detailedLabReportRepository.save(report); // Save the detailed report
    }


    @GetMapping("/{reportId}")
    public DetailedLabReport getByReportId(@PathVariable Long reportId) {
        return detailedService.getByLabReportId(reportId);
    }

    @GetMapping("/all")
    public List<DetailedLabReport> getAllDetailedReports() {
        return detailedService.getAllReports();
    }

    @PutMapping("/update/{detailedReportId}")
    public DetailedLabReport updateReport(@PathVariable Long detailedReportId, @RequestBody DetailedLabReport report) {
        return detailedService.updateReport(detailedReportId, report);
    }

    @DeleteMapping("/delete/{detailedReportId}")
    public void deleteReport(@PathVariable Long detailedReportId) {
        detailedService.deleteReport(detailedReportId);
    }
}
