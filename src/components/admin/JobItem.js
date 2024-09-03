import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../context/Context';
import '../../css/job.css';

export default function JobItem({ item }) {
  const { deleteJob, setShowJobEdits, setCurrentEditJob } = useContext(AppContext);
  const location = useLocation();
  const isAdmin = location.pathname === '/admin/Jobs';

  const [cvFile, setCvFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCvFile(file);
    setFileUploaded(true);
  };

  const handleSend = () => {
    // Implement file upload logic here
    // For now, just reset the file state
    setCvFile(null);
    setFileUploaded(false);
    alert('CV has been sent successfully!');
  };

  return (
    <div className='job-item'>
      <div className='job-item-content'>
        <h3>{item.title}</h3>
        <p className='job-item-description'><strong><u>Description:</u></strong> {item.description}</p>
        <p><strong>Location:</strong> {item.location}</p>
      </div>
      {isAdmin && (
        <div className='job-item-actions'>
          <button className='btn btn-primary' onClick={() => {
            setShowJobEdits(true);
            setCurrentEditJob(item);
          }}>Edit</button>
          <button className='btn btn-danger' onClick={() => deleteJob(item._id)}>Delete</button>
        </div>
      )}
      <div className='cv-upload'>
        {!fileUploaded ? (
          <label className='cv-upload-label'>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="cv-upload-input"
            />
            <span className='cv-upload-button'>Upload CV</span>
          </label>
        ) : (
          <div className='cv-upload-success'>
            <p className='cv-upload-file-name'>Selected file: {cvFile.name}</p>
            <button className='btn btn-success' onClick={handleSend}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
}
