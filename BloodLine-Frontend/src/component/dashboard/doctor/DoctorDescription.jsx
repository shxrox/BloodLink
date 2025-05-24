import React, { useEffect, useState } from "react";
import DoctorDescriptionService from '../../../services/doctorDescriptionService';
import axios from 'axios';
import Navbar from './DoctorNavbar';
import Footer from '../../Footer';
import '../../../docstyle/DoctorDescription.css';


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
    if (window.confirm("Are you sure you want to delete this description?")) {
      try {
        await DoctorDescriptionService.deleteDescription(id);
        fetchDescriptions();
      } catch (error) {
        console.error('Error deleting description:', error);
      }
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
    if (!formData.patientId || !formData.description || !formData.date) {
      alert('Please fill out all fields.');
      return;
    }
    try {
      await DoctorDescriptionService.updateDescription(editingId, {
        patientId: formData.patientId,
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
    <div className="doctor-description-page">
      <Navbar />
      <div className="doctor-description-container">
        <h1 className="main-title">Doctor Descriptions</h1>

        <div className="form-section">
          <h3 className="form-section-title">{editingId ? 'Edit Description' : 'Add New Description'}</h3>
          <div className="form-elements-group">
            <select
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              disabled={editingId !== null} 
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
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
          <table className="descriptions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {descriptions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data-message">No descriptions found.</td>
                </tr>
              ) : (
                descriptions.map((desc) => (
                  <tr key={desc.id}>
                    <td>{desc.id}</td>
                    <td>{desc.patient?.fullName || 'N/A'}</td>
                    <td>{desc.description}</td>
                    <td>{desc.date?.slice(0, 10)}</td>
                    <td className="action-buttons-cell">
                      <button onClick={() => handleEdit(desc)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(desc.id)} className="delete-btn">Delete</button>
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

export default DoctorDescription;