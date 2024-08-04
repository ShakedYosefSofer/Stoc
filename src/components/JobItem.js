import React, { useContext } from 'react';
import { AppContext } from '../context/Context';
import '../css/job.css';

export default function JobItem({ item }) {
  const { deleteJob, setShowJobEdits, setCurrentEdits } = useContext(AppContext);

  return (
    <div className='job-item'>
      <div className='job-item-content'>
        <h3>{item.title}</h3>
        <p className='job-item-description'><strong><u>Description:</u></strong> {item.description}</p>
        <p><strong>Location:</strong> {item.location}</p>
      </div>
      <div className='job-item-actions'>
        <button className='btn btn-primary' onClick={() => {
          setShowJobEdits(true);
          setCurrentEdits(item);
        }}>Edit</button>
        <button className='btn btn-danger' onClick={() => deleteJob(item.id)}>Delete</button>
      </div>
    </div>
  );
}
