import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { AppContext } from '../context/Context';
import '../css/job.css';

const jobOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'devops', label: 'DevOps' },
  { value: 'qa', label: 'QA' },
  { value: 'designer', label: 'Designer' },
  // Add more job titles as needed
];

const locationOptions = [
  { value: 'tel_aviv', label: 'Tel Aviv' },
  { value: 'jerusalem', label: 'Jerusalem' },
  { value: 'haifa', label: 'Haifa' },
  { value: 'beer_sheva', label: 'Beer Sheva' },
  { value: 'netanya', label: 'Netanya' },
  // Add more locations as needed
];

export default function JobForm() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");

  const { addJob, resetAllJobs } = useContext(AppContext);

  const onJobSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      title: jobTitle,
      description: jobDescription,
      location: jobLocation,
      id: Date.now(),
    };
    addJob(newJob);
    setJobTitle("");
    setJobDescription("");
    setJobLocation("");
  };

  // Check if any field is empty
  const isFormIncomplete = !jobTitle || !jobDescription || !jobLocation;

  return (
    <div className='job-form-container'>
      <h2>Add New Job</h2>
      <form onSubmit={onJobSubmit}>
        <div className='form-group'>
          <label>Job Title:</label>
          <Select
            options={jobOptions}
            onChange={(option) => setJobTitle(option ? option.value : '')}
            value={jobOptions.find(option => option.value === jobTitle)}
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
          <Select
            options={locationOptions}
            onChange={(option) => setJobLocation(option ? option.value : '')}
            value={locationOptions.find(option => option.value === jobLocation)}
            className='form-control'
          />
        </div>
        <div className='button-group'>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={isFormIncomplete} // Disable the button if the form is incomplete
          >
            Add Job
          </button>
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
