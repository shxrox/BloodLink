import React, { useEffect, useState } from 'react';
import MedicineService from '../../../services/medicineService';
import axios from 'axios';
import Navbar from './DoctorNavbar';

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
    try {
      await MedicineService.updateMedicine(editingId, {
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

  const handleDelete = async (id) => {
    try {
      await MedicineService.deleteMedicine(id);
      fetchMedicines();
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ patientId: '', name: '', dosage: '', instructions: '' });
  };

  return (
    <div>
      <Navbar />
      <h2>Patient Medicines</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>{editingId ? 'Edit Medicine' : 'Add Medicine'}</h3>
        <select
          value={formData.patientId}
          onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.patientId} value={p.patientId}>
              {p.fullName}
            </option>
          ))}
        </select>{' '}
        <input
          type="text"
          placeholder="Medicine Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />{' '}
        <input
          type="text"
          placeholder="Dosage"
          value={formData.dosage}
          onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
        />{' '}
        <input
          type="text"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
        />{' '}
        {editingId ? (
          <>
            <button onClick={handleUpdate}>Save</button>{' '}
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Name</th>
            <th>Dosage</th>
            <th>Instructions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med.id}>
              <td>{med.id}</td>
              <td>{med.patient?.fullName || 'N/A'}</td>
              <td>{med.name}</td>
              <td>{med.dosage}</td>
              <td>{med.instructions}</td>
              <td>
                <button onClick={() => handleEdit(med)}>Edit</button>{' '}
                <button onClick={() => handleDelete(med.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineManagement;
