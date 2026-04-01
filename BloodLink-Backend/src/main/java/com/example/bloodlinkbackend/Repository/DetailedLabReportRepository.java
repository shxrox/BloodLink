package com.example.bloodlinkbackend.Repository;

import com.example.bloodlinkbackend.Model.DetailedLabReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailedLabReportRepository extends JpaRepository<DetailedLabReport, Long> {

    DetailedLabReport findByLabReport_ReportId(Long reportId);
}
