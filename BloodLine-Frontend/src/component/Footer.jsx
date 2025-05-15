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

          {/* About */}
          <div className="footer-section">
            <h3 className="footer-title">BloodLink</h3>
            <p className="footer-text">
              BloodLink is a modern healthcare management system that bridges the gap between
              blood donors, patients, and medical professionals with secure and efficient digital tools.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Us</h4>
            <ul className="footer-contact">
              <li><FaPhoneAlt /> +94 77 123 4567</li>
              <li><FaEnvelope /> support@bloodlink.com</li>
              <li><FaMapMarkerAlt /> Colombo, Sri Lanka</li>
            </ul>
          </div>

          {/* Social Media */}
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
        .footer {
          background-color: #1a1a1a;
          color: #ccc;
          padding: 40px 20px 20px;
          font-family: 'Arial', sans-serif;
        }

        .footer-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: auto;
        }

        .footer-title {
          font-size: 22px;
          color: white;
          margin-bottom: 15px;
        }

        .footer-subtitle {
          font-size: 18px;
          color: white;
          margin-bottom: 10px;
        }

        .footer-text {
          font-size: 14px;
          color: #aaa;
          line-height: 1.6;
        }

        .footer-links {
          list-style: none;
          padding: 0;
        }

        .footer-links li {
          margin-bottom: 8px;
        }

        .footer-links a {
          color: #ccc;
          text-decoration: none;
        }

        .footer-links a:hover {
          text-decoration: underline;
          color: #fff;
        }

        .footer-contact {
          list-style: none;
          padding: 0;
          font-size: 14px;
        }

        .footer-contact li {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-social {
          display: flex;
          gap: 12px;
          font-size: 18px;
        }

        .footer-social a {
          color: #ccc;
          transition: color 0.3s;
        }

        .footer-social a:hover {
          color: #fff;
        }

        .footer-divider {
          border-color: #444;
          margin: 30px 0 15px;
        }

        .footer-bottom {
          text-align: center;
          font-size: 13px;
          color: #888;
        }
      `}</style>
    </>
  );
};

export default Footer;
