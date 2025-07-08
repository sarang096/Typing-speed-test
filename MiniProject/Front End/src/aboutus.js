import React from 'react';
import './aboutus.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Us</h1>
      </header>
      <section className="about-us-content">
        <h2>Our Mission</h2>
        <p>
          At Typify, our mission is to make typing fun, efficient, and accessible 
          for everyone. We believe that improving your typing skills shouldn't feel like a chore — 
          that's why we provide a platform that combines learning with an enjoyable experience.
        </p>
        <h2>What We Offer</h2>
        <p>
          Our platform offers:
        </p>
        <ul>
          <li>Customizable typing tests for all skill levels</li>
          <li>Real-time tracking of speed, accuracy</li>
          <li>A dedicated feedback page to share your thoughts and suggestions</li>
          <li>Stats to monitor your growth</li>
          <li>An active community of fellow typing enthusiasts</li>
        </ul>
        <h2>Why Choose Us?</h2>
        <p>
          Whether you're preparing for professional tasks, competitive challenges, or just looking 
          to improve your day-to-day typing speed, Typify is here to help you achieve your goals. 
          Join thousands of others who trust us to enhance their typing experience!
        </p>
      </section>
      <footer className="about-us-footer">
        <p>&copy; 2024 Typify. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default AboutUs;
