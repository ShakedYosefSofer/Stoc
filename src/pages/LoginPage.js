import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../services/apiService';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'; // הייבוא של useCookies

export default function LoginPage() {
  const nav = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  // שימוש ב-useCookies לאחסון קריאות קוקיז
  const [cookies, setCookie] = useCookies(['token']);

  // בדיקה אם יש טוקן בעוגיות
  useEffect(() => {
    if (cookies.token) {
      // אם יש טוקן, נוודא שהמשתמש הוא "user" ולא "admin"
      const checkUserRole = async () => {
        try {
          const response = await axios.get(`${API_URL}/users/userName`, { 
            withCredentials: true 
          });

          // אם המשתמש הוא אדמין, לא נעשה כלום
          if (response.data.role === 'admin') {
            return; // שום דבר לא קורה אם המשתמש הוא אדמין
          } else {
            nav('/member'); // אם הוא יוזר, נווט לדף הבית של היוזר
          }
        } catch (error) {
          console.error('Error verifying user role:', error);
        }
      };
      checkUserRole();
    }
  }, [cookies.token, nav]);

  const onSub = async (e) => {
    e.preventDefault();
    const bodyData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      // מאפשר לשמור קוקיז דרך axios
      axios.defaults.withCredentials = true;

      // בקשת אקסיוס עם מתודת POST
      const { data } = await axios({
        url: API_URL + '/users/login',
        method: 'POST',
        data: bodyData,
      });

   

      console.log(data);

      // שמירת הטוקן בקוקיז
      setCookie('token', data.token, { path: '/',  } );

      // נווט לדף הבית של היוזר
      nav('/member');
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

        <Link to="/ForgotPasswordMembers" className="btn btn-link mt-2"> Forgot Password?</Link>
      </form>
    </div>
  );
}
