import React, { useEffect, useState } from 'react';

const Home = () => {
  const [queue, setQueue] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);

 
  const loadQueue = () => {
    const savedQueue = JSON.parse(localStorage.getItem("patientQueue")) || [];
    setQueue(savedQueue);
    setCurrentPatient(savedQueue.length > 0 ? savedQueue[0] : null);
  };

  useEffect(() => {
    loadQueue(); 

    const interval = setInterval(() => {
      loadQueue(); 
    }, 5000);

    return () => clearInterval(interval); 
  }, []);

  const handleNext = () => {
    const updatedQueue = [...queue];
    updatedQueue.shift(); 
    setQueue(updatedQueue);
    localStorage.setItem("patientQueue", JSON.stringify(updatedQueue));
    setCurrentPatient(updatedQueue.length > 0 ? updatedQueue[0] : null);
  };

  return (
    <div>
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

      {queue.length <= 1 ? (
        <p>No patients in queue.</p>
      ) : (
        <>
          <h4>Upcoming</h4>
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
        </>
      )}

  
    </div>
  );
};

export default Home;
