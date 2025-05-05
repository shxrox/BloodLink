import React, { useState, useEffect } from 'react';
import { getPatients, deletePatient } from '../../../services/patientsregAPI';
import Navbar from "./DoctorNavbar";

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
    try {
      await deletePatient(id);
      setPatients(patients.filter(patient => patient.patientId !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleEditPatient = (id) => {
    console.log("Edit patient ID:", id);
  };

  // Filter patients based on search term
  const filteredPatients = patients.filter((patient) =>
    patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.nationalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Welcome to Patient Details</h1>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Search by name, NIC, email or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
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
          {filteredPatients.map((patient) => (
            <tr key={patient.patientId}>
              <td>{patient.fullName}</td>
              <td>{patient.dateOfBirth}</td>
              <td>{patient.gender}</td>
              <td>{patient.nationalId}</td>
              <td>{patient.bloodGroup}</td>
              <td>{patient.phoneNumber}</td>
              <td>{patient.email}</td>
              <td>{patient.address}</td>
              <td>{patient.medicalConditions}</td>
              <td>{patient.allergies}</td>
              <td>{patient.currentMedications}</td>
              <td>{patient.medicalHistory}</td>
              <td>{patient.emergencyContactName}</td>
              <td>{patient.emergencyContactRelationship}</td>
              <td>{patient.emergencyContactPhone}</td>
              <td>{patient.registrationDate}</td>
              <td>{patient.createdBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientDetails;
