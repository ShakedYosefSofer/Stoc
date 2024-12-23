import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/Context';
import JobItem from './JobItem';
import '../../css/job.css';
import JobEdit from './EditJob';

export default function JobList() {
  const { job_ar, fetchJobs, showJobEdits, currentEditJob } = useContext(AppContext);

  useEffect(() => {
    fetchJobs(); // Fetch jobs when the component mounts
  }, [fetchJobs]);

  if (!job_ar || job_ar.length === 0) {
    return <div className='no-jobs'>No jobs available</div>;
  }

  return (
    <div className='job-list-container'>
      <h2>List of Jobs</h2>
      <div className='job-list'>
        {job_ar.map(item => (
          <JobItem key={item._id} item={item} /> // Ensure _id is used if that's the unique identifier
        ))}
      </div>
      {showJobEdits && <JobEdit />}
    </div>
  );
}
