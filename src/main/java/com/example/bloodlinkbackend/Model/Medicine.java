package com.example.bloodlinkbackend.Model;

import jakarta.persistence.*;

@Entity
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String dosage;
    private String instructions;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientRegister patient;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }

    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }

    public PatientRegister getPatient() { return patient; }
    public void setPatient(PatientRegister patient) { this.patient = patient; }
}
