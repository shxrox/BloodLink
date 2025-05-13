package com.example.bloodlinkbackend.Model;

import jakarta.persistence.*;


@Entity
public class DetailedLabReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long detailedReportId;

    private String plateletCount;
    private String hemoglobinLevel;
    private String wbcCount;
    private String rbcCount;
    private String notes;

    @ManyToOne
    @JoinColumn(name = "report_id")
    private LabReport labReport;

    // Getters and Setters
    public Long getDetailedReportId() {
        return detailedReportId;
    }

    public void setDetailedReportId(Long detailedReportId) {
        this.detailedReportId = detailedReportId;
    }

    public String getPlateletCount() {
        return plateletCount;
    }

    public void setPlateletCount(String plateletCount) {
        this.plateletCount = plateletCount;
    }

    public String getHemoglobinLevel() {
        return hemoglobinLevel;
    }

    public void setHemoglobinLevel(String hemoglobinLevel) {
        this.hemoglobinLevel = hemoglobinLevel;
    }

    public String getWbcCount() {
        return wbcCount;
    }

    public void setWbcCount(String wbcCount) {
        this.wbcCount = wbcCount;
    }

    public String getRbcCount() {
        return rbcCount;
    }

    public void setRbcCount(String rbcCount) {
        this.rbcCount = rbcCount;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LabReport getLabReport() {
        return labReport;
    }

    public void setLabReport(LabReport labReport) {
        this.labReport = labReport;
    }
}
