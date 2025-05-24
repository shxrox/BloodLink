import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addPatient, getPatients, deletePatient, updatePatient } from '../../../services/patientsregAPI';
import Navbar from "./NurseNavbar";
import "../../../style/Patientregister.css"; 
import Footer from '../../Footer';


const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatientId, setEditingPatientId] = useState(null);
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

  const formik = useFormik({
    initialValues: {
      fullName: '',
      dateOfBirth: '',
      gender: '',
      nationalId: '',
      bloodGroup: '',
      phoneNumber: '',
      email: '',
      address: '',
      medicalConditions: '',
      allergies: '',
      currentMedications: '',
      medicalHistory: '',
      emergencyContactName: '',
      emergencyContactRelationship: '',
      emergencyContactPhone: '',
      isDonor: false,
      registrationDate: '',
      createdBy: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      dateOfBirth: Yup.date().required('Date of Birth is required'),
      gender: Yup.string().required('Gender is required'),
      nationalId: Yup.string().required('National ID is required'),
      bloodGroup: Yup.string().required('Blood Group is required'),
      phoneNumber: Yup.string().required('Phone Number is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      address: Yup.string().required('Address is required'),
      emergencyContactName: Yup.string().required('Emergency Contact Name is required'),
      emergencyContactPhone: Yup.string().required('Emergency Contact Phone is required')
    }),
    onSubmit: async (values) => {
      try {
        if (editingPatientId) {
          await handleUpdatePatient(values);
        } else {
          await handleAddPatient(values);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  });

  const handleAddPatient = async (values) => {
    try {
      const addedPatient = await addPatient(values);
      setPatients([...patients, addedPatient]);
      formik.resetForm();
    } catch (error) {
      console.error('Error adding patient:', error);
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

  const handleEditPatient = async (id) => {
    const patient = patients.find(p => p.patientId === id);
    formik.setValues(patient);
    setEditingPatientId(id);
  };

  const handleUpdatePatient = async (updatedData) => {
    try {
      const updatedPatient = await updatePatient(editingPatientId, updatedData);
      setPatients(patients.map(p => p.patientId === editingPatientId ? updatedPatient : p));
      setEditingPatientId(null);
      formik.resetForm();
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleAddToQueue = (patient) => {
    const token = Math.floor(1000 + Math.random() * 9000);
    const newEntry = { name: patient.fullName, token };

    const existingQueue = JSON.parse(localStorage.getItem("patientQueue")) || [];

    existingQueue.push(newEntry);
    localStorage.setItem("patientQueue", JSON.stringify(existingQueue));

    alert(`Added to queue!\nName: ${patient.fullName}\nToken: ${token}`);
  };


  return (
    <div className="patient-management-page">
      <Navbar />
      <div className="patient-management-container">
        <h1 className="patient-management-title">Patient Management</h1>

        <form onSubmit={formik.handleSubmit} className="patient-form">
          <div className="form-section personal-info-section">
            <h4 className="form-section-title">Personal Information</h4>
            <input
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Full Name"
              className="form-input"
              required
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="error-message">{formik.errors.fullName}</div>
            ) : null}

            <label htmlFor="dateOfBirth" className="form-label">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input"
              required
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
              <div className="error-message">{formik.errors.dateOfBirth}</div>
            ) : null}

            <input
              type="text"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Gender"
              className="form-input"
              required
            />
            {formik.touched.gender && formik.errors.gender ? (
              <div className="error-message">{formik.errors.gender}</div>
            ) : null}

            <input
              type="text"
              name="nationalId"
              value={formik.values.nationalId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="National ID"
              className="form-input"
              required
            />
            {formik.touched.nationalId && formik.errors.nationalId ? (
              <div className="error-message">{formik.errors.nationalId}</div>
            ) : null}

            <input
              type="text"
              name="bloodGroup"
              value={formik.values.bloodGroup}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Blood Group"
              className="form-input"
              required
            />
            {formik.touched.bloodGroup && formik.errors.bloodGroup ? (
              <div className="error-message">{formik.errors.bloodGroup}</div>
            ) : null}
          </div>

          <div className="form-section contact-info-section">
            <h4 className="form-section-title">Contact Information</h4>
            <input
              type="text"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Phone Number"
              className="form-input"
              required
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="error-message">{formik.errors.phoneNumber}</div>
            ) : null}

            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
              className="form-input"
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}

            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Address"
              className="form-input"
              required
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="error-message">{formik.errors.address}</div>
            ) : null}

            <input
              type="text"
              name="emergencyContactName"
              value={formik.values.emergencyContactName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Emergency Contact Name"
              className="form-input"
              required
            />
            {formik.touched.emergencyContactName && formik.errors.emergencyContactName ? (
              <div className="error-message">{formik.errors.emergencyContactName}</div>
            ) : null}

            <input
              type="text"
              name="emergencyContactRelationship"
              value={formik.values.emergencyContactRelationship}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Emergency Contact Relationship"
              className="form-input"
            />
            <input
              type="text"
              name="emergencyContactPhone"
              value={formik.values.emergencyContactPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Emergency Contact Phone"
              className="form-input"
              required
            />
            {formik.touched.emergencyContactPhone && formik.errors.emergencyContactPhone ? (
              <div className="error-message">{formik.errors.emergencyContactPhone}</div>
            ) : null}
          </div>

          <div className="form-section medical-info-section">
            <h4 className="form-section-title">Medical Information</h4>
            <textarea
              name="medicalConditions"
              value={formik.values.medicalConditions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Medical Conditions"
              className="form-input textarea-input"
            />
            <textarea
              name="allergies"
              value={formik.values.allergies}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Allergies"
              className="form-input textarea-input"
            />
            <textarea
              name="currentMedications"
              value={formik.values.currentMedications}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Current Medications"
              className="form-input textarea-input"
            />
            <textarea
              name="medicalHistory"
              value={formik.values.medicalHistory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Medical History"
              className="form-input textarea-input"
            />
            <label htmlFor="registrationDate" className="form-label">Registration Date:</label>
            <input
              type="date"
              id="registrationDate"
              name="registrationDate"
              value={formik.values.registrationDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input"
            />
            <input
              type="text"
              name="createdBy"
              value={formik.values.createdBy}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Created By"
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">
            {editingPatientId ? 'Update Patient' : 'Add Patient'}
          </button>
        </form>

        <hr className="divider" />

        <div className="patient-list-section">
          <h2 className="patient-list-title">Patient List</h2>
          <div className="table-scroll-container"> 
            <table className="patient-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>NIC</th>
                  <th>Blood Group</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Medical Cond.</th>
                  <th>Allergies</th>
                  <th>Current Meds</th>
                  <th>Medical History</th>
                  <th>Emergency Contact</th>
                  <th>Relationship</th>
                  <th>Emergency Phone</th>
                  <th>Reg. Date</th>
                  <th>Created By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.patientId}>
                    <td data-label="Full Name">{patient.fullName}</td>
                    <td data-label="DOB">{patient.dateOfBirth}</td>
                    <td data-label="Gender">{patient.gender}</td>
                    <td data-label="NIC">{patient.nationalId}</td>
                    <td data-label="Blood Group">{patient.bloodGroup}</td>
                    <td data-label="Phone">{patient.phoneNumber}</td>
                    <td data-label="Email">{patient.email}</td>
                    <td data-label="Address">{patient.address}</td>
                    <td data-label="Medical Cond.">{patient.medicalConditions}</td>
                    <td data-label="Allergies">{patient.allergies}</td>
                    <td data-label="Current Meds">{patient.currentMedications}</td>
                    <td data-label="Medical History">{patient.medicalHistory}</td>
                    <td data-label="Emergency Contact">{patient.emergencyContactName}</td>
                    <td data-label="Relationship">{patient.emergencyContactRelationship}</td>
                    <td data-label="Emergency Phone">{patient.emergencyContactPhone}</td>
                    <td data-label="Reg. Date">{patient.registrationDate}</td>
                    <td data-label="Created By">{patient.createdBy}</td>
                    <td data-label="Actions" className="action-buttons">
                      <button onClick={() => handleEditPatient(patient.patientId)} className="edit-btn">Edit</button>
                      <button
                        onClick={() => handleDeletePatient(patient.patientId)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleAddToQueue(patient)}
                        className="queue-btn"
                      >
                        Add to Queue
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientManagement;