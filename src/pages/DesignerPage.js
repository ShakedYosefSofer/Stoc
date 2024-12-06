import React, { useState } from 'react';
import JobList from '../components/admin/JobList';
import '../css/job.css';
import '../css/filterjobs.css';

export default function DesignerPage() {
  const [selectedCity, setSelectedCity] = useState("");

  // פונקציה לטיפול בשינוי בעיר הנבחרת
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="job-page">
      <h1>Designers</h1>
      {/* רשימה נגללת לפילטור לפי עיר */}
      <div className="city-filter">
        <label htmlFor="city">Select City:</label>
        <select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}>
          <option value="">All Cities</option>
          <option value="Tel Aviv">Tel Aviv</option>
          <option value="Jerusalem">Jerusalem</option>
          <option value="Haifa">Haifa</option>
          <option value="Eilat">Eilat</option>
          {/* הוספת ערים נוספות */}
        </select>
      </div>

      {/* העברת העיר שנבחרה ל-JobList */}
      <JobList city={selectedCity} />
    </div>
  );
}
