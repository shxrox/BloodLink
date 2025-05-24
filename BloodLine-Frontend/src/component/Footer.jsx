import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">

          <div className="footer-section">
            <h3 className="footer-title">BloodLink</h3>
            <p className="footer-text">
              BloodLink is a modern healthcare management system that bridges the gap between
              blood donors, patients, and medical professionals with secure and efficient digital tools.
            </p>
          </div>


          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
            </ul>
          </div>

         
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Us</h4>
            <ul className="footer-contact">
              <li><FaPhoneAlt /> +94 77 123 4567</li>
              <li><FaEnvelope /> support@bloodlink.com</li>
              <li><FaMapMarkerAlt /> Colombo, Sri Lanka</li>
            </ul>
          </div>

      
          <div className="footer-section">
            <h4 className="footer-subtitle">Follow Us</h4>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} BloodLink. All rights reserved.
        </div>
      </footer>

      <style jsx="true">{`
        /* Footer */
.footer {
  background-color: #f7eded; /* Light red-pink, subtly referencing blood */
  color: #333333; /* Dark gray for good contrast */
  padding: 40px 20px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Consistent with the example CSS */
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.05); /* Subtle shadow for depth */
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: auto;
}

.footer-title {
  font-size: 24px;
  color: #c0392b; /* A vibrant red for the main title */
  margin-bottom: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.footer-subtitle {
  font-size: 19px;
  color: #555555; /* Slightly darker gray for subtitles */
  margin-bottom: 12px;
  font-weight: 600;
}

.footer-text {
  font-size: 15px;
  color: #4f4f4f; /* Medium gray for body text */
  line-height: 1.7;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #4f4f4f;
  text-decoration: none;
  transition: color 0.3s ease; /* Smooth transition for hover effect */
}

.footer-links a:hover {
  color: #c0392b; /* Highlight links with the primary red on hover */
  text-decoration: underline;
}

.footer-contact {
  list-style: none;
  padding: 0;
  font-size: 15px;
}

.footer-contact li {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px; /* Space between icon and text */
  color: #4f4f4f;
}

.footer-contact li svg {
  color: #c0392b; /* Icons in primary red */
  font-size: 18px;
}

.footer-social {
  display: flex;
  gap: 15px;
  font-size: 22px; /* Slightly larger social icons */
}

.footer-social a {
  color: #777777; /* Lighter gray for social icons */
  transition: color 0.3s ease;
}

.footer-social a:hover {
  color: #c0392b; /* Social icons turn primary red on hover */
}

.footer-divider {
  border: none;
  border-top: 1px solid #e0e0e0; /* Lighter divider line */
  margin: 40px 0 20px;
}

.footer-bottom {
  text-align: center;
  font-size: 14px;
  color: #666666; /* Medium gray for copyright text */
  padding-top: 10px;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr; /* Stack sections on smaller screens */
    text-align: center;
  }

  .footer-social {
    justify-content: center; /* Center social icons when stacked */
  }

  .footer-contact li {
    justify-content: center; /* Center contact info when stacked */
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 30px 15px 15px;
  }

  .footer-title {
    font-size: 20px;
  }

  .footer-subtitle {
    font-size: 17px;
  }

  .footer-text,
  .footer-links a,
  .footer-contact li,
  .footer-bottom {
    font-size: 14px;
  }

  .footer-social {
    font-size: 20px;
  }
}
      `}</style>
    </>
  );
};

export default Footer;
