import React from 'react';
import './contact.css';
import SanInsta from './SanInsta.jpg';
import SarangInsta from "./SarInsta.png";
function ContactUs() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        We would love to hear from you! For any inquiries, please reach out to us at our Instagram handles:
        <a href="https://www.instagram.com/sanjitdev_" target="_blank" rel="noopener noreferrer"> Sanjit</a>,
        <a href="https://www.instagram.com/sarang_265" target="_blank" rel="noopener noreferrer"> Sarang</a>, and
        <a href="https://www.instagram.com/shreyask_26" target="_blank" rel="noopener noreferrer"> Shreyas</a>.
      </p>
      <img src={SanInsta} alt="Instagram Profile" className="contact-photo" />
      <img src={SarangInsta} alt="Instagram Profile" className="contact-photo" />
    </div>
  );
}

export default ContactUs;
