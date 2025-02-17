import React, { useState } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Thank you, ${formData.name}! We have received your message:\n\n${formData.message}`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Page</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="contact-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="contact-form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="contact-submit-btn">Send</button>
      </form>
    </div>
  );
}

export default Contact;
