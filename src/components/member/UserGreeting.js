import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserGreeting() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Guest');
  const [showMenu, setShowMenu] = useState(false); // מצב תפריט נפתח
  const token = Cookies.get('token'); // קבלת הטוקן מהעוגיות

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);

      // בקשה לקבלת שם המשתמש
      const fetchUserName = async () => {
        try {
          const response = await axios.get('/api/userName', { withCredentials: true });
          setUserName(response.data.userName || 'User');
        } catch (error) {
          console.error('Error fetching user name:', error);
          setUserName('User');
        }
      };

      fetchUserName();
    }
  }, [token]);

  const handleLogout = () => {
    // מחיקת הטוקן מהעוגיות והתנתקות
    Cookies.remove('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false); // סגור את התפריט לאחר לחיצה
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div style={{ position: 'relative', padding: '10px' }}>
      {isLoggedIn ? (
        <div>
          <span
            onClick={toggleMenu}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            Hello, {userName}
          </span>

          {showMenu && (
            <div
              style={{
                position: 'absolute',
                top: '40px',
                right: '0',
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                width: '150px',
              }}
            >
              <ul
                style={{
                  listStyleType: 'none',
                  padding: '10px',
                  margin: 0,
                  textAlign: 'left',
                }}
              >
                <li
                  style={{ cursor: 'pointer', padding: '8px 0' }}
                  onClick={() => handleNavigation('/MyJobs')}
                >
                  My Jobs
                </li>
                <li
                  style={{ cursor: 'pointer', padding: '8px 0' }}
                  onClick={() => handleNavigation('/PostJob')}
                >
                  Post a Job
                </li>
                <li
                  style={{ cursor: 'pointer', padding: '8px 0' }}
                  onClick={() => handleNavigation('/profile')}
                >
                  Profile
                </li>
                <li
                  style={{
                    cursor: 'pointer',
                    padding: '8px 0',
                    color: 'red',
                    fontWeight: 'bold',
                  }}
                  onClick={handleLogout}
                >
                  Log Out
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <span>Please log in</span>
      )}
    </div>
  );
}
