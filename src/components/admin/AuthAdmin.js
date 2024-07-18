import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { API_URL } from '../../services/apiService';
import axios from 'axios';

export default function AuthAdmin() {
  const [cookies] = useCookies("token");
  const location = useLocation();
  const nav = useNavigate();


  useEffect(() => {
    checkToken();
  },[location])

  const checkToken = async() => {
    try {
      if(!cookies["token"]){
        alert("You need to login to be here");
        return nav("/admin")
      }
      axios.defaults.withCredentials = true;
      const url = API_URL+"/users/checkToken";
      const {data} = await axios.get(url);
      // console.log(data);
      if(data.role != "admin"){
        alert("You must be admin to be here or session over, plaese log in again");
        nav("/admin")
      }
    } catch (error) {
      console.log(error);
    }
    // פונקציה שתתחבר לראוט בשרת נוד שלנו 
    // שיבדוק אם יש טוקן ואם הוא בתוקף ותקין, אם לא ישגר בחזרה ללוג אין של האדמין

  }
  
  return (
    <></>
  )
}
