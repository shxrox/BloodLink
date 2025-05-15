import React, { useEffect, useState } from 'react';
import DoctorDescriptionService from '../../../services/doctorDescriptionService';
import axios from 'axios';
import Navbar from './DoctorNavbar';
import Footer from '../../Footer';


const DoctorDescription = () => {
  const [descriptions, setDescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    fetchDescriptions();
    fetchPatients();
  }, []);

  const fetchDescriptions = async () => {
    try {
      const response = await DoctorDescriptionService.getAll();
      setDescriptions(response.data);
    } catch (error) {
      console.error('Error fetching descriptions:', error);
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
    if (!formData.patientId || !formData.description || !formData.date) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      await DoctorDescriptionService.addDescription(formData.patientId, {
        description: formData.description,
        date: formData.date,
      });
      setFormData({ patientId: '', description: '', date: '' });
      fetchDescriptions();
    } catch (error) {
      console.error('Error adding description:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await DoctorDescriptionService.deleteDescription(id);
      fetchDescriptions();
    } catch (error) {
      console.error('Error deleting description:', error);
    }
  };

  const handleEdit = (desc) => {
    setEditingId(desc.id);
    setFormData({
      patientId: desc.patient?.id || '',
      description: desc.description,
      date: desc.date?.slice(0, 10), 
    });
  };

  const handleUpdate = async () => {
    try {
      await DoctorDescriptionService.updateDescription(editingId, {
        description: formData.description,
        date: formData.date,
      });
      setEditingId(null);
      setFormData({ patientId: '', description: '', date: '' });
      fetchDescriptions();
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ patientId: '', description: '', date: '' });
  };

  return (
    <div>
        <Navbar />
      <h2>Doctor Descriptions</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>{editingId ? 'Edit Description' : 'Add Description'}</h3>
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
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />{' '}
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />{' '}
        {editingId ? (
          <>
            <button onClick={handleUpdate}>Save</button>
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
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {descriptions.map((desc) => (
            <tr key={desc.id}>
              <td>{desc.id}</td>
              <td>{desc.patient?.fullName || 'N/A'}</td>
              <td>{desc.description}</td>
              <td>{desc.date?.slice(0, 10)}</td> 
              <td>
                <button onClick={() => handleEdit(desc)}>Edit</button>{' '}
                <button onClick={() => handleDelete(desc.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default DoctorDescription;
