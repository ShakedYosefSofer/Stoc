import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import '../css/styles.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { API_URL } from '../services/apiService';  // הכתובת של ה-API שלך
import UserGreeting from './member/UserGreeting';  // ייבוא של הקומפוננטה UserGreeting

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookies, setCookies] = useCookies(['token']);
  const navigate = useNavigate();

  // פונקציה שתטפל בשינוי גודל המסך
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setMenuOpen(false); // סגור את התפריט במסכים גדולים
    }
  };

  // פונקציה להתנתקות
  const handleLogout = async () => {
    try {
      const url = `${API_URL}/users/logout`;  // הכתובת של ה-API שלך להתנתקות
      axios.defaults.withCredentials = true;
      await axios.post(url);  // שליחה של בקשת POST להתנתקות
      setCookies('token', '', { path: '/' });  // מחיקת הקוקי של הטוקן
      navigate('/');  // הפנייה לדף הראשי לאחר ההתנתקות
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // בדיקה אם יש טוקן בקוקי והעדכון של המצב
    if (cookies.token) {
      // אם יש טוקן בקוקי, המשתמש מחובר
    }

    // מחיקת מאזין לאחר סיום השימוש
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cookies.token]);  // הוספת cookies.token כ-dependency כדי שהחוזרת תופעל כל פעם שהטוקן משתנה

  // פונקציה שתשנה את מצב התפריט (פתוח/סגור)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="container-fluid bg-warning">
      <div className="container p-2">
        <div className="row align-items-center">
          {/* כפתור המבורגר */}
          <div className="hamburger col-auto d-lg-none" onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>

          {/* לוגו */}
          <div className="logo col-auto">
            <Link to="/">
              <img src="/Stoc.png" alt="Stoc" height="75" width="125" />
            </Link>
          </div>

          {/* תפריט ניווט */}
          <nav className={`col-auto ${menuOpen ? 'menu-open' : ''}`}>
            <ul className="nav-list d-lg-flex">
              <li><Link to="/">Jobs</Link></li>
              <li className={!cookies.token ? '' : 'd-none'}><Link to="/FormSignUp">SignUp</Link></li>  {/* הסתרת SignUp אם המשתמש מחובר */}
              <li className={!cookies.token ? '' : 'd-none'}><Link to="/Login">Login</Link></li>  {/* הסתרת Login אם המשתמש מחובר */}
              <li><Link to="/Admin">Admin</Link></li>
              <li className="home-icon">
                <Link 
                  to="/" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <BsFillHouseDoorFill size={20} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* הצגת UserGreeting רק אם יש טוקן */}
      {cookies.token && <UserGreeting />}
    </header>
  );
}
