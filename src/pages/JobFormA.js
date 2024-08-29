import React, { useContext } from 'react';
import JobForm from '../components/JobForm';
import { AppContext } from '../context/Context';
import '../css/job.css';

export default function JobPage() {
  const { showEditJobs } = useContext(AppContext);

  return (
    <div className='job-page'>
        <br />
        <JobForm />  
    </div>
  );
}