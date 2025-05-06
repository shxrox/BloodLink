import React, { useEffect, useState } from 'react';
import Navbar from './NurseNavbar';

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
    updatedQueue.shift(); // Remove first patient
    setQueue(updatedQueue);
    localStorage.setItem("patientQueue", JSON.stringify(updatedQueue));

    if (updatedQueue.length > 0) {
      setCurrentPatient(updatedQueue[0]);
    } else {
      setCurrentPatient(null);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Patient Queue</h1>

      {currentPatient ? (
        <div style={{ marginBottom: '20px', padding: '10px', border: '2px solid green', width: 'fit-content' }}>
          <h3>Currently Attending:</h3>
          <p><strong>Name:</strong> {currentPatient.name}</p>
          <p><strong>Token:</strong> {currentPatient.token}</p>
        </div>
      ) : (
        <p>No patient is currently being attended.</p>
      )}

      {queue.length === 0 ? (
        <p>No patients in queue.</p>
      ) : (
        <>
          <table border="1" style={{ width: '50%', marginTop: '20px', borderCollapse: 'collapse' }}>
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
          <button onClick={handleNext} style={{ marginTop: '20px', padding: '10px 20px' }}>Next</button>
        </>
      )}
    </div>
  );
};

export default PatientQueue;
