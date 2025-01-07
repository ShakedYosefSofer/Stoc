import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../services/apiService';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const nav = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSub = async (e) => {
    e.preventDefault();
    const bodyData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      // מאפשר לשמור קוקיס דרך axios
      axios.defaults.withCredentials = true;

      // בקשת אקסיוס עם מתודת POST
      const { data } = await axios({
        url: API_URL + '/users/login',
        method: 'POST',
        data: bodyData,
      });

      // בדיקה שהמשתמש הוא user בלבד
      if (data.role !== 'user') {
        return alert('Access restricted to users only!');
      }

      console.log(data);

      // שמירת הטוקן ושם המשתמש בקוקי
      Cookies.set('token', data.token);
      Cookies.set('userName', data.name);

      // נווט לדף הבית של היוזר
      nav('/');
    } catch (error) {
      alert('Password or email not match');
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <h1>Login to User</h1>
      <form onSubmit={onSub} className='col-md-6 p-2'>
        <label>Email:</label>
        <input ref={emailRef} type="email" className='form-control' required />
        <label>Password:</label>
        <input ref={passwordRef} type="password" className='form-control' required />
        <button className='btn btn-success mt-3'>Log in</button>
        <Link to="/user/ForgotPassword" className="btn btn-link mt-2"> Forgot Password?</Link>
      </form>
    </div>
  );
}
