import React from "react";
import Navbar from './DoctorNavbar';
import Footer from '../../Footer';


const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>About BloodLink</h1>

      <section style={{ marginBottom: "30px" }}>
        <h2>Our Mission</h2>
        <p>
          BloodLink is dedicated to enhancing the efficiency and accuracy of blood donation and healthcare services through innovative technology. Our mission is to provide a seamless and reliable platform for blood donor registration, patient management, and lab report handling to support hospitals, nurses, doctors, and lab technicians.
        </p>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Who We Are</h2>
        <p>
          We are a passionate team of software engineers and healthcare professionals committed to bridging the gap between technology and patient care. Our BloodLink system is designed to streamline registration processes, facilitate patient queue management, and integrate comprehensive lab reporting features — all tailored to meet the needs of medical staff and patients alike.
        </p>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Key Features</h2>
        <ul>
          <li><strong>Patient Registration & Queue Management:</strong> Efficiently register donors and patients, with real-time queue monitoring and token generation for nurses and staff.</li>
          <li><strong>Lab Reports Management:</strong> Store, view, and print detailed lab reports, enabling lab technicians and doctors to track blood test results accurately.</li>
          <li><strong>Role-Based Access:</strong> Secure login and account management for doctors, nurses, and lab technicians, ensuring appropriate access to patient and lab data.</li>
          <li><strong>Responsive Dashboard:</strong> Intuitive nurse and medical staff dashboards with dynamic charts and up-to-date patient and report information.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Technology Stack</h2>
        <p>
          BloodLink is built with modern web technologies to ensure scalability and responsiveness:
        </p>
        <ul>
          <li><strong>Backend:</strong> Java Spring Boot – RESTful API, secure authentication, and database management.</li>
          <li><strong>Frontend:</strong> React with Axios – dynamic UI, interactive charts, and real-time updates.</li>
          <li><strong>Data Storage:</strong> Private Cloud Server (HPE GreenLake) for secure and scalable data hosting.</li>
          <li><strong>Additional Libraries:</strong> Recharts for dynamic visualizations, and Tailwind CSS / custom CSS for styling.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Our Vision</h2>
        <p>
          We envision a healthcare ecosystem where technology empowers medical staff to deliver faster, more accurate, and compassionate care. By connecting blood donors, patients, and healthcare workers through BloodLink, we aim to save lives and improve health outcomes in communities around the world.
        </p>
      </section>

       <Footer />
    </div>
  );
};

export default AboutUs;
