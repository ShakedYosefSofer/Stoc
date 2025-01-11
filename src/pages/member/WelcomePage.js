import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../services/apiService';
import '../../css/welcomePage.css';

export default function WelcomePage() {
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/userName`, { withCredentials: true });
        setUserName(response.data.userName || 'Guest');
      } catch (error) {
        console.error('Error fetching user name:', error);
        setUserName('Guest');
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcome-message">
        <h2>Welcome <span>{userName}</span></h2>
      </div>
    </div>
  );
}
