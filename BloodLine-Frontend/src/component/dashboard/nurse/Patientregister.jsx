import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addPatient, getPatients, deletePatient, updatePatient } from '../../../services/patientsregAPI';
import Navbar from "./NurseNavbar"; 

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatientId, setEditingPatientId] = useState(null);

  // Fetch all patients
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

  // Formik setup
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

  // Add a new patient
  const handleAddPatient = async (values) => {
    try {
      const addedPatient = await addPatient(values);
      setPatients([...patients, addedPatient]);
      formik.resetForm(); // Clear form after adding
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  // Handle deleting a patient
  const handleDeletePatient = async (id) => {
    try {
      await deletePatient(id);
      setPatients(patients.filter(patient => patient.patientId !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  // Handle editing a patient
  const handleEditPatient = async (id) => {
    const patient = patients.find(p => p.patientId === id);
    formik.setValues(patient); // Set form values to patient's data
    setEditingPatientId(id);
  };

  // Handle updating a patient
  const handleUpdatePatient = async (updatedData) => {
    try {
      const updatedPatient = await updatePatient(editingPatientId, updatedData);
      setPatients(patients.map(p => p.patientId === editingPatientId ? updatedPatient : p));
      setEditingPatientId(null); // Clear edit state
      formik.resetForm(); // Clear form after update
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Patient Management</h1>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Full Name"
          required
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <div>{formik.errors.fullName}</div>
        ) : null}

        <input
          type="date"
          name="dateOfBirth"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
          <div>{formik.errors.dateOfBirth}</div>
        ) : null}

        <input
          type="text"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Gender"
          required
        />
        {formik.touched.gender && formik.errors.gender ? (
          <div>{formik.errors.gender}</div>
        ) : null}

        <input
          type="text"
          name="nationalId"
          value={formik.values.nationalId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="National ID"
          required
        />
        {formik.touched.nationalId && formik.errors.nationalId ? (
          <div>{formik.errors.nationalId}</div>
        ) : null}

        <input
          type="text"
          name="bloodGroup"
          value={formik.values.bloodGroup}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Blood Group"
          required
        />
        {formik.touched.bloodGroup && formik.errors.bloodGroup ? (
          <div>{formik.errors.bloodGroup}</div>
        ) : null}

        <input
          type="text"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Phone Number"
          required
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div>{formik.errors.phoneNumber}</div>
        ) : null}

        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <input
          type="text"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Address"
          required
        />
        {formik.touched.address && formik.errors.address ? (
          <div>{formik.errors.address}</div>
        ) : null}

        <input
          type="text"
          name="medicalConditions"
          value={formik.values.medicalConditions}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Medical Conditions"
        />
        <input
          type="text"
          name="allergies"
          value={formik.values.allergies}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Allergies"
        />
        <input
          type="text"
          name="currentMedications"
          value={formik.values.currentMedications}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Current Medications"
        />
        <input
          type="text"
          name="medicalHistory"
          value={formik.values.medicalHistory}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Medical History"
        />

        <input
          type="text"
          name="emergencyContactName"
          value={formik.values.emergencyContactName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Emergency Contact Name"
          required
        />
        {formik.touched.emergencyContactName && formik.errors.emergencyContactName ? (
          <div>{formik.errors.emergencyContactName}</div>
        ) : null}

        <input
          type="text"
          name="emergencyContactRelationship"
          value={formik.values.emergencyContactRelationship}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Emergency Contact Relationship"
        />
        <input
          type="text"
          name="emergencyContactPhone"
          value={formik.values.emergencyContactPhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Emergency Contact Phone"
          required
        />
        {formik.touched.emergencyContactPhone && formik.errors.emergencyContactPhone ? (
          <div>{formik.errors.emergencyContactPhone}</div>
        ) : null}


        <input
          type="date"
          name="registrationDate"
          value={formik.values.registrationDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Registration Date"
        />
        <input
          type="text"
          name="createdBy"
          value={formik.values.createdBy}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Created By"
        />

        <button type="submit">{editingPatientId ? 'Update Patient' : 'Add Patient'}</button>
      </form>

      <h2>Patient List</h2>
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
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {patients.map((patient) => (
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
        <td>
          <button onClick={() => handleEditPatient(patient.patientId)}>Edit</button>
          <button
            onClick={() => handleDeletePatient(patient.patientId)}
            style={{ marginLeft: '8px', color: 'red' }}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


    </div>
  );
};

export default PatientManagement;
