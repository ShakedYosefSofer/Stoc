import React, { useState, useEffect } from 'react';
import JobList from '../components/admin/JobList';
import '../css/job.css';
import '../css/filterjobs.css';
import axios from 'axios';

export default function DesignerPage() {
  const [selectedCity, setSelectedCity] = useState("");
  const [jobs, setJobs] = useState([]);

  // שליפת עבודות מסוג Designer מהשרת
  useEffect(() => {
    const fetchDesignerJobs = async () => {
      try {
        const response = await axios.get('/api/jobs/designers'); // ה-URL תואם ל-Router בצד השרת
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching designer jobs:', err);
      }
    };

    fetchDesignerJobs();
  }, []);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  // פילטור העבודות לפי עיר אם נבחרה
  const filteredJobs = selectedCity
    ? jobs.filter((job) => job.location === selectedCity.toLowerCase())
    : jobs;

  return (
    <div className="job-page">
      <h1>Designers</h1>

      {/* הצגת עבודות */}
      <div className="job-list">
        <JobList jobs={filteredJobs} />
      </div>
    </div>
  );
}
