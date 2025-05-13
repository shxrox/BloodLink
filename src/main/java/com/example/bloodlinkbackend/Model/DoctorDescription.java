package com.example.bloodlinkbackend.Model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "doctor_description")
public class DoctorDescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientRegister patient;

    @Column(nullable = false, length = 2000)
    private String description;

    private String createdBy;

    private LocalDate createdDate;

    public DoctorDescription() {
    }

    public DoctorDescription(PatientRegister patient, String description, String createdBy, LocalDate createdDate) {
        this.patient = patient;
        this.description = description;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
    }

    @PrePersist
    protected void onCreate() {
        if (createdDate == null) {
            createdDate = LocalDate.now();
        }
    }

    // Getters and setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public PatientRegister getPatient() { return patient; }

    public void setPatient(PatientRegister patient) { this.patient = patient; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public String getCreatedBy() { return createdBy; }

    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public LocalDate getCreatedDate() { return createdDate; }

    public void setCreatedDate(LocalDate createdDate) { this.createdDate = createdDate; }
}
