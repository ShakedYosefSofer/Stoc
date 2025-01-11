import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { API_URL } from '../../services/apiService';
import axios from 'axios';

export default function AuthMember() {
  const [cookies] = useCookies("token");
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    checkToken();
  }, [location]);

  const checkToken = async () => {
    try {
      if (!cookies["token"]) {
        alert("You need to log in to be here");
        return nav("/login");  // נווט לדף התחברות אם אין טוקן
      }
      axios.defaults.withCredentials = true;
      const url = `${API_URL}/users/checkToken`;
      const { data } = await axios.get(url);
      
      // אם התפקיד לא רגיל, הראה הודעה המתאימה למשתמש רגיל
      if (data.role !== "user") {
        alert("You must be a regular user to be here or your session has expired. Please log in again.");
        nav("/login");  // נווט לדף התחברות אם המשתמש לא תואם את התפקיד המתאים
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while checking the session. Please log in again.");
      nav("/login");  // אם קרתה שגיאה, נווט לדף התחברות
    }
  };

  return (
    <></>
  );
}
