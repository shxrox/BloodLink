import React, { useState, useEffect } from 'react';
import { getPatients, deletePatient } from '../../../services/patientsregAPI';
import Navbar from "./DoctorNavbar";
import Footer from '../../Footer';
import '../../../docstyle/PatientDetails.css';


const PatientDetails = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleDeletePatient = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient record?")) {
      try {
        await deletePatient(id);
        setPatients(patients.filter(patient => patient.patientId !== id));
        alert("Patient record deleted successfully!");
      } catch (error) {
        console.error('Error deleting patient:', error);
        alert("Failed to delete patient record.");
      }
    }
  };

  const handleEditPatient = (id) => {
    console.log("Edit patient ID:", id);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.nationalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patient-details-page">
      <Navbar />
      <div className="patient-details-container">
        <h1 className="main-title">Patient Details</h1>

        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by name, NIC, email or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="table-wrapper">
          <table className="patient-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>NIC</th>
                <th>Blood Group</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Medical Conditions</th>
                <th>Allergies</th>
                <th>Current Medications</th>
                <th>Medical History</th>
                <th>Emergency Contact Name</th>
                <th>Emergency Relationship</th>
                <th>Emergency Phone</th>
                <th>Registration Date</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="17" className="no-patients-message">No patients found.</td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.patientId}>
                    <td data-label="Full Name">{patient.fullName}</td>
                    <td data-label="Date of Birth">{patient.dateOfBirth}</td>
                    <td data-label="Gender">{patient.gender}</td>
                    <td data-label="NIC">{patient.nationalId}</td>
                    <td data-label="Blood Group">{patient.bloodGroup}</td>
                    <td data-label="Phone">{patient.phoneNumber}</td>
                    <td data-label="Email">{patient.email}</td>
                    <td data-label="Address">{patient.address}</td>
                    <td data-label="Medical Conditions">{patient.medicalConditions}</td>
                    <td data-label="Allergies">{patient.allergies}</td>
                    <td data-label="Current Medications">{patient.currentMedications}</td>
                    <td data-label="Medical History">{patient.medicalHistory}</td>
                    <td data-label="Emergency Contact Name">{patient.emergencyContactName}</td>
                    <td data-label="Emergency Relationship">{patient.emergencyContactRelationship}</td>
                    <td data-label="Emergency Phone">{patient.emergencyContactPhone}</td>
                    <td data-label="Registration Date">{patient.registrationDate}</td>
                    <td data-label="Created By">{patient.createdBy}</td>
               
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientDetails;