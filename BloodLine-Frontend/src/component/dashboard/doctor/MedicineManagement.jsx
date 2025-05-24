import React, { useEffect, useState } from 'react';
import MedicineService from '../../../services/medicineService';
import axios from 'axios';
import Navbar from './DoctorNavbar';
import Footer from '../../Footer';
import '../../../docstyle/MedicineManagement.css';


const MedicineManagement = () => {
  const [medicines, setMedicines] = useState([]);
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    name: '',
    dosage: '',
    instructions: '',
  });

  useEffect(() => {
    fetchMedicines();
    fetchPatients();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await MedicineService.getAll();
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleAdd = async () => {
    const { patientId, name, dosage, instructions } = formData;
    if (!patientId || !name || !dosage || !instructions) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      await MedicineService.addMedicine(patientId, { name, dosage, instructions });
      setFormData({ patientId: '', name: '', dosage: '', instructions: '' });
      fetchMedicines();
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicine record?")) {
      try {
        await MedicineService.deleteMedicine(id);
        fetchMedicines();
      } catch (error) {
        console.error('Error deleting medicine:', error);
      }
    }
  };

  const handleEdit = (med) => {
    setEditingId(med.id);
    setFormData({
      patientId: med.patient?.patientId || '',
      name: med.name,
      dosage: med.dosage,
      instructions: med.instructions,
    });
  };

  const handleUpdate = async () => {
    const { patientId, name, dosage, instructions } = formData;
    if (!patientId || !name || !dosage || !instructions) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      await MedicineService.updateMedicine(editingId, {
        patientId: formData.patientId, // Ensure patientId is sent for update if required by backend
        name: formData.name,
        dosage: formData.dosage,
        instructions: formData.instructions,
      });
      setEditingId(null);
      setFormData({ patientId: '', name: '', dosage: '', instructions: '' });
      fetchMedicines();
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ patientId: '', name: '', dosage: '', instructions: '' });
  };

  return (
    <div className="medicine-management-page">
      <Navbar />
      <div className="medicine-management-container">
        <h1 className="main-title">Patient Medicines</h1>

        <div className="form-section">
          <h3 className="form-section-title">{editingId ? 'Edit Medicine' : 'Add New Medicine'}</h3>
          <div className="form-elements-group">
            <select
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              disabled={editingId !== null} // Disable patient selection when editing existing medicine
            >
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p.patientId} value={p.patientId}>
                  {p.fullName} (ID: {p.patientId})
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Medicine Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Dosage"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
            />
            <input
              type="text"
              placeholder="Instructions"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            />
            {editingId ? (
              <>
                <button onClick={handleUpdate}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <button onClick={handleAdd}>Add</button>
            )}
          </div>
        </div>

        <div className="table-wrapper">
          <table className="medicines-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Name</th>
                <th>Dosage</th>
                <th>Instructions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data-message">No medicines found.</td>
                </tr>
              ) : (
                medicines.map((med) => (
                  <tr key={med.id}>
                    <td>{med.id}</td>
                    <td>{med.patient?.fullName || 'N/A'}</td>
                    <td>{med.name}</td>
                    <td>{med.dosage}</td>
                    <td>{med.instructions}</td>
                    <td className="action-buttons-cell">
                      <button onClick={() => handleEdit(med)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(med.id)} className="delete-btn">Delete</button>
                    </td>
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

export default MedicineManagement;