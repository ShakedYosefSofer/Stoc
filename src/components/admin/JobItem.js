import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom'; // Import the hook to get the current URL
import { AppContext } from '../../context/Context';
import '../../css/job.css';

export default function JobItem({ item }) {
  const { deleteJob, setShowJobEdits, setCurrentEditJob } = useContext(AppContext);
  const location = useLocation(); // Get the current URL

  // Check if the current URL matches the admin URL
  const isAdmin = location.pathname === '/admin/Jobs';

  return (
    <div className='job-item'>
      <div className='job-item-content'>
        <h3>{item.title}</h3>
        <p className='job-item-description'><strong><u>Description:</u></strong> {item.description}</p>
        <p><strong>Location:</strong> {item.location}</p>
      </div>
      {isAdmin && ( // Conditionally render the buttons if it's the admin URL
        <div className='job-item-actions'>
          <button className='btn btn-primary' onClick={() => {
            setShowJobEdits(true);
            setCurrentEditJob(item);
          }}>Edit</button>
          <button className='btn btn-danger' onClick={() => deleteJob(item._id)}>Delete</button>
        </div>
      )}
    </div>
  );
}
