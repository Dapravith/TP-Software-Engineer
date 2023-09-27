import React from 'react';
import "../styles/footer-homepage/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="copyright">
        &copy; {new Date().getFullYear()} DSS Team. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
