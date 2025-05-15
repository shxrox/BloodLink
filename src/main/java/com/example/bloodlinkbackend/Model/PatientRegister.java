package com.example.bloodlinkbackend.Model;

import jakarta.persistence.*;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Table(name = "patient_register")
public class PatientRegister {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientId;

    @NotBlank
    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @NotBlank
    @Column(nullable = false)
    private String gender;

    @NotBlank
    @Column(nullable = false)
    private String nationalId;

    @NotBlank
    @Column(nullable = false)
    private String bloodGroup;

    @NotBlank
    @Column(nullable = false)
    private String phoneNumber;

    @Email
    @Column(nullable = false)
    private String email;

    private String address;

    private String medicalConditions;

    private String allergies;

    private String currentMedications;

    private String medicalHistory;

    @NotBlank
    @Column(nullable = false)
    private String emergencyContactName;

    @NotBlank
    @Column(nullable = false)
    private String emergencyContactRelationship;

    @NotBlank
    @Column(nullable = false)
    private String emergencyContactPhone;

    private LocalDate registrationDate;

    private String createdBy;

    // Default constructor
    public PatientRegister() {
    }

    // Full constructor
    public PatientRegister(Long patientId, String fullName, LocalDate dateOfBirth, String gender, String nationalId,
                           String bloodGroup, String phoneNumber, String email, String address, String medicalConditions,
                           String allergies, String currentMedications, String medicalHistory, String emergencyContactName,
                           String emergencyContactRelationship, String emergencyContactPhone,
                           LocalDate registrationDate, String createdBy) {
        this.patientId = patientId;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.nationalId = nationalId;
        this.bloodGroup = bloodGroup;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.medicalConditions = medicalConditions;
        this.allergies = allergies;
        this.currentMedications = currentMedications;
        this.medicalHistory = medicalHistory;
        this.emergencyContactName = emergencyContactName;
        this.emergencyContactRelationship = emergencyContactRelationship;
        this.emergencyContactPhone = emergencyContactPhone;
        this.registrationDate = registrationDate;
        this.createdBy = createdBy;
    }

    // Getters and setters
    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMedicalConditions() {
        return medicalConditions;
    }

    public void setMedicalConditions(String medicalConditions) {
        this.medicalConditions = medicalConditions;
    }

    public String getAllergies() {
        return allergies;
    }

    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }

    public String getCurrentMedications() {
        return currentMedications;
    }

    public void setCurrentMedications(String currentMedications) {
        this.currentMedications = currentMedications;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    public String getEmergencyContactName() {
        return emergencyContactName;
    }

    public void setEmergencyContactName(String emergencyContactName) {
        this.emergencyContactName = emergencyContactName;
    }

    public String getEmergencyContactRelationship() {
        return emergencyContactRelationship;
    }

    public void setEmergencyContactRelationship(String emergencyContactRelationship) {
        this.emergencyContactRelationship = emergencyContactRelationship;
    }

    public String getEmergencyContactPhone() {
        return emergencyContactPhone;
    }

    public void setEmergencyContactPhone(String emergencyContactPhone) {
        this.emergencyContactPhone = emergencyContactPhone;
    }

    public LocalDate getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }


    @PrePersist
    protected void onCreate() {
        if (this.registrationDate == null) {
            this.registrationDate = LocalDate.now();
        }
    }
}
