import React, { useContext, useState } from 'react';
import JobList from '../components/admin/JobList';
import JobEdit from '../components/admin/EditJob';
import { AppContext } from '../context/Context';
import '../css/job.css';
import '../css/filterjobs.css';

export default function JobPage() {
  const { showEditJobs } = useContext(AppContext);
  const [selectedCity, setSelectedCity] = useState("");

  // פונקציה לטיפול בשינוי בעיר הנבחרת
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="job-page">
      {showEditJobs && <JobEdit />}
      <br />
      <h1>Jobs</h1>
      {/* העברת העיר שנבחרה ל-JobList */}
      <JobList city={selectedCity} />
      
    </div>
  );
}
