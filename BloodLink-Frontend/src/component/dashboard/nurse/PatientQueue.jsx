import React, { useEffect, useState } from 'react';
import Navbar from './NurseNavbar';
import Footer from '../../Footer';
import "../../../style/PatientQueue.css";

const PatientQueue = () => {
  const [queue, setQueue] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    const savedQueue = JSON.parse(localStorage.getItem("patientQueue")) || [];
    setQueue(savedQueue);
    if (savedQueue.length > 0) {
      setCurrentPatient(savedQueue[0]);
    }
  }, []);

  const handleNext = () => {
    const updatedQueue = [...queue];
    updatedQueue.shift();
    setQueue(updatedQueue);
    localStorage.setItem("patientQueue", JSON.stringify(updatedQueue));

    if (updatedQueue.length > 0) {
      setCurrentPatient(updatedQueue[0]);
    } else {
      setCurrentPatient(null);
    }
  };

  return (
    <div className="patient-queue-page">
      <Navbar />
      <div className="patient-queue-container">
        <h1 className="patient-queue-title">Patient Queue</h1>

        {currentPatient ? (
          <div className="current-patient-card">
            <h3 className="current-patient-heading">Currently Attending:</h3>
            <p><strong>Name:</strong> {currentPatient.name}</p>
            <p><strong>Token:</strong> {currentPatient.token}</p>
            <button onClick={handleNext} className="next-patient-btn">Next Patient</button>
          </div>
        ) : (
          <p className="no-patient-message">No patient is currently being attended.</p>
        )}

        {queue.length <= 1 ? ( 
          <p className="no-queue-message">No patients in queue.</p>
        ) : (
          <>
            <h2 className="queue-list-title">Upcoming Patients</h2>
            <div className="queue-table-wrapper">
              <table className="patient-queue-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Token Number</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.slice(1).map((entry, index) => ( 
                    <tr key={index}>
                      <td>{entry.name}</td>
                      <td>{entry.token}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PatientQueue;