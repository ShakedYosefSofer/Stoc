import React, { useContext } from 'react';
import { AppContext } from '../context/Context';
import JobItem from './JobItem';
import '../css/job.css';

export default function JobList() {
  const { job_ar } = useContext(AppContext);

  if (!job_ar || job_ar.length === 0) {
    return <div className='no-jobs'>No jobs available</div>;
  }

  return (
    <div className='job-list-container'>
      <h2>List of jobs</h2>
      <div className='job-list'>
        {job_ar.map(item => (
          <JobItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}