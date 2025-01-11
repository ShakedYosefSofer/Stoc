import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../context/Context';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../../css/job.css';
import '../../css/map.css'; // Import the MAP.CSS file

function JobItem({ item }) {
  const { deleteJob, setShowJobEdits, setCurrentEditJob } = useContext(AppContext);
  const location = useLocation();
  const isAdmin = location.pathname === '/admin/Jobs';

  const [cvFile, setCvFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [error, setError] = useState('');
  const [mapCenter, setMapCenter] = useState(null);

  // Fetching coordinates for the job location
  useEffect(() => {
    if (item.location) {
      const fetchCoordinates = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?city=${item.location}&format=json&addressdetails=1`
          );
          const data = await response.json();
          if (data && data[0]) {
            const { lat, lon } = data[0];
            setMapCenter({ lat: parseFloat(lat), lng: parseFloat(lon) });
          } else {
            console.error('Location not found.');
          }
        } catch (err) {
          console.error('Error fetching coordinates:', err);
        }
      };
      fetchCoordinates();
    }
  }, [item.location]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a PDF or Word document.');
      setCvFile(null);
      setFileUploaded(false);
    } else {
      setError('');
      setCvFile(file);
      setFileUploaded(true);
    }
  };

  const handleSend = () => {
    if (cvFile) {
      // Logic to upload the file to the server
      console.log('Uploading file:', cvFile);

      // Reset state after upload
      setCvFile(null);
      setFileUploaded(false);
      alert('CV has been sent successfully!');
    }
  };

  // Function to split text into paragraphs with up to 20 words
  const formatText = (text) => {
    const words = text.split(' ');
    const paragraphs = [];
    for (let i = 0; i < words.length; i += 20) {
      paragraphs.push(words.slice(i, i + 20).join(' '));
    }
    return paragraphs;
  };

  return (
    <div className="job-item">
      <div className="job-item-content">
        <h3>{item.title}</h3>

        {/* Job Description */}
        <p><strong><u>Description:</u></strong></p>
        <div className="job-item-description">
          {formatText(item.description).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Job Requirements */}
        <p><u><strong>Job Requirements:</strong></u></p>
        <div className="job-item-requirements">
          {Array.isArray(item.requirements) && item.requirements.length > 0 ? (
            item.requirements.map((req, index) => (
              <div key={index}>
                {formatText(req).map((paragraph, subIndex) => (
                  <p key={subIndex}>{paragraph}</p>
                ))}
              </div>
            ))
          ) : (
            <p>Not specified</p> // הצגת הודעה אם אין דרישות או אם זה לא מערך
          )}
        </div>


        {/* Location */}
        <p><u><strong>Location:</strong></u><br/><br/> {item.location}</p>
      </div>

      {/* Map */}
      {mapCenter && (
        <div className="job-item-map">
          <MapContainer center={mapCenter} zoom={12} scrollWheelZoom={true}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={mapCenter}>
              <Popup>{item.location}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      {/* Admin Actions */}
      {isAdmin && (
        <div className="job-item-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowJobEdits(true);
              setCurrentEditJob(item);
            }}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => deleteJob(item._id)}>
            Delete
          </button>
        </div>
      )}

      {/* CV Upload */}
      <div className="cv-upload">
        {!fileUploaded ? (
          <>
            <label className="cv-upload-label">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="cv-upload-input"
              />
              <span className="cv-upload-button">Upload CV</span>
            </label>
            {error && <p className="cv-upload-error">{error}</p>} {/* Show error message */}
          </>
        ) : (
          <div className="cv-upload-success">
            <p className="cv-upload-file-name">Selected file: {cvFile.name}</p>
            <button className="btn btn-success" onClick={handleSend}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobItem;
