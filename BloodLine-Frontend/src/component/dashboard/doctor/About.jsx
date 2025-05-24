
import React from "react";
import Navbar from './DoctorNavbar';
import Footer from '../../Footer';
import '../../../docstyle/About.css';


const AboutUs = () => {
  return (
    <div className="about-us-page">
      <Navbar />
      <div className="about-us-container">
        <h1 className="about-us-main-title">About BloodLink</h1>

        <section className="about-section">
          <h2 className="about-section-title">Our Mission</h2>
          <p className="about-section-paragraph">
            BloodLink is dedicated to enhancing the efficiency and accuracy of blood donation and healthcare services through innovative technology. Our mission is to provide a seamless and reliable platform for blood donor registration, patient management, and lab report handling to support hospitals, nurses, doctors, and lab technicians.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Who We Are</h2>
          <p className="about-section-paragraph">
            We are a passionate team of software engineers and healthcare professionals committed to bridging the gap between technology and patient care. Our BloodLink system is designed to streamline registration processes, facilitate patient queue management, and integrate comprehensive lab reporting features — all tailored to meet the needs of medical staff and patients alike.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Key Features</h2>
          <ul className="features-list">
            <li><strong>Patient Registration & Queue Management:</strong> Efficiently register donors and patients, with real-time queue monitoring and token generation for nurses and staff.</li>
            <li><strong>Lab Reports Management:</strong> Store, view, and print detailed lab reports, enabling lab technicians and doctors to track blood test results accurately.</li>
            <li><strong>Role-Based Access:</strong> Secure login and account management for doctors, nurses, and lab technicians, ensuring appropriate access to patient and lab data.</li>
            <li><strong>Responsive Dashboard:</strong> Intuitive nurse and medical staff dashboards with dynamic charts and up-to-date patient and report information.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Technology Stack</h2>
          <p className="about-section-paragraph">
            BloodLink is built with modern web technologies to ensure scalability and responsiveness:
          </p>
          <ul className="tech-stack-list">
            <li><strong>Backend:</strong> Java Spring Boot – RESTful API, secure authentication, and database management.</li>
            <li><strong>Frontend:</strong> React with Axios – dynamic UI, interactive charts, and real-time updates.</li>
            <li><strong>Data Storage:</strong> Private Cloud Server (HPE GreenLake) for secure and scalable data hosting.</li>
            <li><strong>Additional Libraries:</strong> Recharts for dynamic visualizations, and Tailwind CSS / custom CSS for styling.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Our Vision</h2>
          <p className="about-section-paragraph">
            We envision a healthcare ecosystem where technology empowers medical staff to deliver faster, more accurate, and compassionate care. By connecting blood donors, patients, and healthcare workers through BloodLink, we aim to save lives and improve health outcomes in communities around the world.
          </p>
        </section>

        <section className="about-section contact-section">
          <h2 className="about-section-title">Find Us</h2>
          <p className="about-section-paragraph">
            Our main office is located in Colombo, Sri Lanka.
          </p>
          <div className="google-map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798154563814!2d79.85989737500122!3d6.914677993077363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2592d3f7f2b9b%3A0xc3f8f1b6e4e5e4e!2sColombo!5e0!3m2!1sen!2slk!4v1716539265903!5m2!1sen!2slk"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map of Colombo, Sri Lanka"
            ></iframe>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;