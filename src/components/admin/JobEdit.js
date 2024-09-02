import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/Context';
import '../../css/job.css';

export default function JobEdit() {
  const { setShowJobEdits, currentEditJob, updateJob } = useContext(AppContext);

  // If currentEditJob is undefined or null, initialize state with empty values
  const [jobTitle, setJobTitle] = useState(currentEditJob?.title || '');
  const [jobDescription, setJobDescription] = useState(currentEditJob?.description || '');
  const [jobLocation, setJobLocation] = useState(currentEditJob?.location || '');

  // Update state if currentEditJob changes
  useEffect(() => {
    setJobTitle(currentEditJob?.title || '');
    setJobDescription(currentEditJob?.description || '');
    setJobLocation(currentEditJob?.location || '');
  }, [currentEditJob]);

  const onSub = (e) => {
    
    e.preventDefault();
    const updateItem = {
      title: jobTitle,
      description: jobDescription,
      location: jobLocation,
      _id: currentEditJob?._id // Ensure you use the correct identifier
    };
    updateJob(updateItem);
    setShowJobEdits(false);
  };
  

  

  if (!currentEditJob) {
    return null; // Or render some loading message if desired
  }

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
