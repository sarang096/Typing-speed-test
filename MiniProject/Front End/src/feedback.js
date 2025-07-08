import React, { useState } from 'react';
import axios from 'axios';
import './feedback.css';

const Feedback = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/feedback', formData);
            setStatus('Feedback submitted successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            console.error("Error submitting feedback:", err);
            setStatus('Failed to submit feedback. Please try again.');
        }
    };

    return (
        <div className="feedback-container">
            <h1>Feedback</h1>
            <p>We value your feedback! Please share your thoughts with us below.</p>
            {status && <p className="status-message">{status}</p>}
            <form className="feedback-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                />

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="5"
                    required
                ></textarea>

                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default Feedback;
