import React from "react";
import Navbar from './LabNavbar';
import Footer from '../../Footer';
import '../../../docstyle/About.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <Navbar />
      <div className="about-us-container">
        <h1 className="about-us-main-title">About BloodLink</h1>

        <section className="about-section">
          <h2 className="about-section-title">Inspiration & Problem Statement</h2>
          <p className="about-section-paragraph">
            BloodLink was inspired by the long, exhausting wait times experienced at hospitals for routine blood checks. Patients often arrive early but still spend hours waiting in line, sometimes while feeling unwell. This inefficiency sparked the idea to create a system that reduces waiting times and streamlines patient flow, improving the overall healthcare experience.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Key Features</h2>
          <ul className="features-list">
            <li><strong>Digital Token System:</strong> Eliminates long queues by managing patient flow with real-time token generation and updates.</li>
            <li><strong>Real-Time Lab Report Sharing:</strong> Instant access to lab results by doctors and nurses speeds up diagnosis and treatment.</li>
            <li><strong>Digital Patient Records:</strong> Secure, easy-to-access patient data management replaces cumbersome physical record books.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Technology Stack</h2>
          <p className="about-section-paragraph">
            BloodLink is built with a modern and scalable technology stack to ensure responsiveness and maintainability:
          </p>
          <ul className="tech-stack-list">
            <li><strong>Backend:</strong> Java Spring Boot providing RESTful APIs and robust business logic.</li>
            <li><strong>Frontend:</strong> React with CSS for dynamic user interfaces and smooth user experience.</li>
            <li><strong>Database:</strong> MySQL relational database for reliable data storage of patients, tokens, and reports.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">User Roles</h2>
          <p className="about-section-paragraph">
            BloodLink employs a role-based access system to maintain security and efficiency:
          </p>
          <ul className="features-list">
            <li><strong>Doctors:</strong> View patient details, update diagnoses, prescribe medicines, and access lab reports.</li>
            <li><strong>Nurses:</strong> Manage patient registrations and digital token queues.</li>
            <li><strong>Lab Technicians:</strong> Upload and update lab test results instantly accessible by doctors.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Challenges</h2>
          <p className="about-section-paragraph">
            Managing data flow between deeply nested React components was a key challenge. Through learning props, lifting state up, and implementing React Context for global state management, I enhanced the frontend’s maintainability and user experience.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Real-World Use & Future Plans</h2>
          <p className="about-section-paragraph">
            BloodLink holds strong potential for government hospital adoption but requires further development such as detailed workflow studies, stronger data security, scalability improvements, and regulatory compliance. My future vision includes integrating AI to automate triage, predict blood supply needs, assist doctors with decision-making, and provide real-time patient support, making BloodLink a proactive healthcare platform.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Lessons Learned</h2>
          <p className="about-section-paragraph">
            This project taught me that technology can make a significant impact even in places where systems are traditionally basic and outdated. Creating practical, locally relevant solutions is as important as applying advanced tech. BloodLink is a step toward modernizing healthcare in Sri Lanka and beyond.
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
