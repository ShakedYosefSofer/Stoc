import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import EditProfile from '../../components/member/EditProfile'; // ייבוא של הקומפוננטה EditProfile
import { API_URL } from '../../services/apiService';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // מצב עריכה
  const [cookies] = useCookies(['token']);
  const [showPassword, setShowPassword] = useState(false); // מציג סיסמה או לא

  // טוען את פרטי המשתמש מה-API
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (cookies.token) {
        try {
          const response = await axios.get(API_URL+'/api/userProfile', { withCredentials: true });
          
          if (response.data) {
            setUser(response.data); // אם יש נתונים, שמור אותם
          } else {
            console.error('No user data received');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };
    fetchUserDetails();
  }, [cookies.token]);

  // הצגת פרטי המשתמש או קומפוננטת עריכה אם אנחנו במצב עריכה
  return (
    <div className="container">
      <h1>Setting</h1>
      {user ? (
        isEditing ? (
          <EditProfile user={user} setIsEditing={setIsEditing} />
        ) : (
          <div>
            <h2>{user.name}'s Profile</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Password:</strong> 
              {showPassword ? user.password : '********'}
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        )
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
