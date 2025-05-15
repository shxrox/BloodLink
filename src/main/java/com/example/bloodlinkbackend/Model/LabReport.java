package com.example.bloodlinkbackend.Model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "lab_report")
public class LabReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientRegister patient;

    @Column(nullable = false)
    private String testType;

    private String resultSummary;

    private Boolean sentToLab;

    private LocalDate reportDate;

    private String labTechnician;

    @PrePersist
    protected void onCreate() {
        if (this.reportDate == null) {
            this.reportDate = LocalDate.now();
        }
    }

    public LabReport() {}

    public LabReport(PatientRegister patient, String testType, String resultSummary, Boolean sentToLab, String labTechnician) {
        this.patient = patient;
        this.testType = testType;
        this.resultSummary = resultSummary;
        this.sentToLab = sentToLab;
        this.labTechnician = labTechnician;
    }

    public Long getReportId() { return reportId; }

    public PatientRegister getPatient() { return patient; }

    public void setPatient(PatientRegister patient){
        this.patient = patient;
    }

    public String getTestType() { return testType; }

    public void setTestType(String testType) { this.testType = testType; }

    public String getResultSummary() { return resultSummary; }

    public void setResultSummary(String resultSummary) { this.resultSummary = resultSummary; }

    public Boolean getSentToLab() { return sentToLab; }

    public void setSentToLab(Boolean sentToLab) { this.sentToLab = sentToLab; }

    public LocalDate getReportDate() { return reportDate; }

    public String getLabTechnician() { return labTechnician; }

    public void setLabTechnician(String labTechnician) { this.labTechnician = labTechnician; }
}
