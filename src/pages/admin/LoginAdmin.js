import React, { useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../services/apiService';

export default function LoginAdmin() {
  const nav = useNavigate();
  // useRef - מאפשר בדרך קלה יותר לשלוף את המידע
  // 
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSub = async(e) => {
    e.preventDefault();
    const bodyData = {
      email:emailRef.current.value,
      password:passwordRef.current.value
    }

    try {
      // מאפשר לשמור קוקיס דרך אקסיוס במחשב של המשתמש
      axios.defaults.withCredentials = true;
      // בקשת אקסיוס עם מיטודה פוסט
      const {data} = await axios({
        url:API_URL+"/users/login",
        method:"POST",
        data:bodyData
      })
      // בודק שרק אדמין נכנס ולא משתמש רגיל
      if(data.role != "admin"  ){
        return alert("Just admin can be here!")
      }
      console.log(data);
      // אחרי שזהיהיתי שהמשתמש מחובר והוא אדמין
      // נשגר אותו לרשימת המשתמשים במערכת
      nav("/admin/users")

    } catch (error) {
      alert("Password or email not match")
      console.log(error);
    }

    console.log(bodyData);
  }

  return (
    <div className='container'>
      <h1>Login to admin</h1>
      <form onSubmit={onSub} className='col-md-6 p-2'>
        <label>Email:</label>
        <input ref={emailRef} type="email" className='form-control' />
        <label>Password:</label>
        <input ref={passwordRef} type="password" className='form-control' />
        <button className='btn btn-success mt-3'>Log in</button>
      </form>
    </div>
  )
}
