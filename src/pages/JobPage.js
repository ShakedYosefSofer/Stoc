import React, { useContext } from 'react';
import JobList from '../components/JobList';
import JobEdit from '../components/JobEdit';
import { AppContext } from '../context/Context';
import '../css/job.css';

export default function JobPage() {
  const { showEditJobs } = useContext(AppContext);

  return (
    <div className='job-page'>
      {showEditJobs && <JobEdit />}
         <br />
        <JobList />
    </div>
  );
}