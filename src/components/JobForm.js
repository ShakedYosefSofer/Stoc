import React, { useState, useContext } from 'react';
import { AppContext } from '../context/Context';
import '../css/job.css';

export default function JobForm() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");

  const { job_ar, addJob, resetAllJobs } = useContext(AppContext);

  const onJobSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      title: jobTitle,
      description: jobDescription,
      location: jobLocation,
      id: Date.now()
    };
    addJob(newJob);
    setJobTitle("");
    setJobDescription("");
    setJobLocation("");
  };

  return (
    <div className='job-form-container'>
      <h2>Add New Job</h2>
      <form onSubmit={onJobSubmit}>
        <div className='form-group'>
          <label>Job Title:</label>
          <input
            onChange={(e) => setJobTitle(e.target.value)}
            value={jobTitle}
            type="text"
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>Job Description:</label>
          <textarea
            onChange={(e) => setJobDescription(e.target.value)}
            value={jobDescription}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>Location:</label>
          <input
            onChange={(e) => setJobLocation(e.target.value)}
            value={jobLocation}
            type="text"
            className='form-control'
          />
        </div>
        <div className='button-group'>
          <button type='submit' className='btn btn-primary'>Add Job</button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete all jobs?")) {
                resetAllJobs();
              }
            }}
            type="button"
            className='btn btn-danger'
          >
            Delete All Jobs
          </button>
        </div>
      </form>
    </div>
  );
}