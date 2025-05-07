package com.example.bloodlinkbackend.Repository;

import com.example.bloodlinkbackend.Model.LabReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LabReportRepository extends JpaRepository<LabReport, Long> {
    List<LabReport> findByPatientFullName(String fullName);
}
