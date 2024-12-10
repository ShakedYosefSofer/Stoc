import React, { useState, useEffect } from 'react';
import JobList from '../components/admin/JobList';
import '../css/job.css';
import '../css/filterjobs.css';
import axios from 'axios';

export default function DevOpsPage() {
  const [selectedCity, setSelectedCity] = useState("");
  const [jobs, setJobs] = useState([]);

  // שליפת עבודות מסוג DevOps מהשרת
  useEffect(() => {
    const fetchDevOpsJobs = async () => {
      try {
        const response = await axios.get('/api/jobs/devops'); // ה-URL תואם ל-Router בצד השרת
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching DevOps jobs:', err);
      }
    };

    fetchDevOpsJobs();
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
      <h1>DevOps</h1>


      {/* הצגת עבודות */}
      <div className="job-list">
        <JobList jobs={filteredJobs} />
      </div>
    </div>
  );
}
