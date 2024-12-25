import React from 'react';
import { Link } from 'react-router-dom';
import '../css/page404.css'; // Import CSS for styling

export default function Page404() {
  return (
    <div className="page404-container">
      <div className="page404-content">
        <h1 className="page404-title">404</h1>
        <h2 className="page404-subtitle">Oops! Page not found</h2>
        <p className="page404-text">
          The page you're looking for doesn't exist or has been moved. 
        </p>
        <Link to="/" className="page404-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
