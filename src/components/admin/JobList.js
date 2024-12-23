import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/Context';
import JobItem from './JobItem';
import JobEdit from './EditJob';
import '../../css/job.css';

export default function JobList() {
  const { job_ar, fetchJobs, showJobEdits } = useContext(AppContext);
  const [selectedCity, setSelectedCity] = useState(""); // state לעיר נבחרת
  const [selectedJobType, setSelectedJobType] = useState(""); // state לסוג עבודה נבחרת (כאן נעשה שימוש בtitle מה-DB)

  useEffect(() => {
    fetchJobs(); // Fetch jobs when the component mounts
  }, [fetchJobs]);

  if (!job_ar || job_ar.length === 0) {
    return <div className='no-jobs'>No jobs available</div>;
  }

  // סינון המשרות לפי העיר הנבחרת וסוג העבודה (title) הנבחר
  const filteredJobs = job_ar
    .filter(job => {
      const matchesCity = selectedCity ? job.location?.toLowerCase() === selectedCity.toLowerCase() : true;
      const matchesJobType = selectedJobType ? job.title?.toLowerCase() === selectedJobType.toLowerCase() : true; // סינון לפי title
      return matchesCity && matchesJobType;
    });

  // שליפת רשימת הערים הייחודיות
  const cities = [...new Set(job_ar.map(job => job.location))].filter(Boolean);

  // שליפת רשימת סוגי העבודות הייחודיים לפי title
  const jobTypes = [...new Set(job_ar.map(job => job.title))].filter(Boolean); // השתמשתי בtitle כדי לשלוף את סוגי העבודות

  return (
    <div className='job-list-container'>
      <div className="filters-container">
        {/* פילטר לפי עיר */}
        <div className='city-filter'>
          <label htmlFor='city-select'>Filter by City:</label>
          <select
            id='city-select'
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value=''>All Cities</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* פילטר לפי סוג עבודה (title) */}
        <div className='job-type-filter'>
          <label htmlFor='job-type-select'>Filter by Job Type:</label>
          <select
            id='job-type-select'
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value)}
          >
            <option value=''>All Job Types</option>
            {jobTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* הודעה אם אין עבודות מתאימות */}
      {filteredJobs.length === 0 && (
        <div className='no-jobs'><b><h5>No jobs available for the selected filters</h5></b></div>
      )}

      {/* רשימת משרות */}
      <div className='job-list'>
        {[...filteredJobs].reverse().map(item => (
          <JobItem key={item._id} item={item} />
        ))}
      </div>

      {showJobEdits && <JobEdit />}
    </div>
  );
}
