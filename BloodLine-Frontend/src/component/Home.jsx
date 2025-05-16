import React, { useEffect, useState } from 'react';
import '../style/Home.css';

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
    const interval = setInterval(loadQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-wrapper">
      <h1 className="home-title">Welcome to BloodLine</h1>

      <div className="scrolling-instructions">
        <div className="scrolling-text">
          📌 Please remain in the waiting area. You will be called according to your token number. &nbsp;&nbsp;&nbsp;
          🪪 Make sure to have your ID and token ready when it's your turn. &nbsp;&nbsp;&nbsp;
          ⏳ If you miss your turn, you may need to rejoin the queue. Thank you for your patience!
        </div>
      </div>

      {currentPatient ? (
        <div className="current-patient-box">
          <h3>▶ Currently Attending:</h3>
          <p><strong>Name:</strong> {currentPatient.name}</p>
          <p><strong>Token:</strong> {currentPatient.token}</p>
        </div>
      ) : (
        <p className="no-current">No patient is currently being attended.</p>
      )}

      {queue.length > 1 && (
        <div className="upcoming-patients">
          <h4>Upcoming Patients</h4>
          <ul className="patient-list">
            {queue.slice(1, 4).map((entry, index) => (
              <li key={index} className={`patient-item fade-${index}`}>
                <span className="patient-name">{entry.name}</span>
                <span className="patient-token">Token: {entry.token}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export default Home;
