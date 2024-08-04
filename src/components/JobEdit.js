import React, { useState, useContext } from 'react';
import { AppContext } from '../context/Context';
import '../css/job.css';

export default function JobEdit() {
  const { setShowJobEdits, currentEditItems, updateJob } = useContext(AppContext);
  const [jobTitle, setJobTitle] = useState(currentEditItems.title);
  const [jobDescription, setJobDescription] = useState(currentEditItems.description);
  const [jobLocation, setJobLocation] = useState(currentEditItems.location);

  const onSub = (e) => {
    e.preventDefault();
    const updateItem = {
      title: jobTitle,
      description: jobDescription,
      location: jobLocation,
      id: currentEditItems.id
    };
    updateJob(updateItem);
    setShowJobEdits(false);
  };

  return (
    <div className='job-edit-overlay'>
      <div className='job-edit-container'>
        <h2>Update Job</h2>
        <form onSubmit={onSub}>
          <div className='form-group'>
            <label>Job Title:</label>
            <input
              onChange={(e) => setJobTitle(e.target.value)}
              type="text"
              className='form-control'
              value={jobTitle}
            />
          </div>
          <div className='form-group'>
            <label>Job Description:</label>
            <textarea
              onChange={(e) => setJobDescription(e.target.value)}
              className='form-control'
              value={jobDescription}
            />
          </div>
          <div className='form-group'>
            <label>Location:</label>
            <input
              onChange={(e) => setJobLocation(e.target.value)}
              type="text"
              className='form-control'
              value={jobLocation}
            />
          </div>
          <div className='button-group'>
            <button type='submit' className='btn btn-primary'>Update</button>
            <button onClick={() => setShowJobEdits(false)} type="button" className='btn btn-secondary'>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}