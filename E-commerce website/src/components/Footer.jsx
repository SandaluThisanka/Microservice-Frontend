import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center' }}>
      <p>&copy; {new Date().getFullYear()} E-Commerce Website. All rights reserved.</p>
      <div>
        <a href="/privacy-policy" style={{ margin: '0 10px' }}>Privacy Policy</a>
        <a href="/terms-of-service" style={{ margin: '0 10px' }}>Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;