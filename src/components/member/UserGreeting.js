import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../services/apiService';
import '../../css/userGreeting.css'; // Import the external CSS file

export default function UserGreeting() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Guest');
  const [showMenu, setShowMenu] = useState(false);

  const token = cookies.token;

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);

      const fetchUserName = async () => {
        try {
          const response = await axios.get(`${API_URL}/users/userName`, {
            withCredentials: true,
          });
          console.log('Response:', response); // To see the response
          setUserName(response.data.userName || 'anonymous');
        } catch (error) {
          console.error('Error fetching user name:', error);
          setUserName('User');
        }
      };

      fetchUserName();
    }
  }, [token]);

  const handleLogout = () => {
    removeCookie('token', { path: '/' });
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="greeting-container">
      {isLoggedIn ? (
        <div>
          <span onClick={toggleMenu} className="greeting-text">
            Hello, {userName}
          </span>

          {showMenu && (
            <div className="menu-container">
              <ul className="menu-list">
                <li onClick={() => handleNavigation('/member/MyJobs')}>My Jobs</li>
                <li onClick={() => handleNavigation('/member/PostJob')}>Post a Job</li>
                <li onClick={() => handleNavigation('/member/ProfilePage')}>Profile</li>
                <li className="logout" onClick={handleLogout}>
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
