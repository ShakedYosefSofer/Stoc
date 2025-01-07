import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from '../../services/apiService';
import {useCookies} from 'react-cookie';
// import { Link } from "react-router-dom";

export default function HeaderAdmin() {
// יכול לבדוק את הקוקיס שיש לנו

  const [cookies] = useCookies(['token']);
  const nav = useNavigate();

  const onLogOut = async() => {
    try {
      console.log(cookies);
      const url = API_URL+"/users/logout";
      axios.defaults.withCredentials = true;
      const {data} = axios.post(url);
      nav("/admin")
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className='container-fluid bg-light shadow-sm'>
          <h2>
            <Link to="/">
              <img src="/Stoc.png" alt="Stoc" height="75" width="125" />
            </Link>
          </h2>
      <div className='container p-2'>
        <div className='row align-items-center'>
          <div className='logo col-auto'>
          <h2>admin</h2>
          </div>
          <nav className='col d-md-flex justify-content-between align-items-center'>
            <ul>
              <li><Link to="/admin/users">Users</Link></li>
              <li><Link to="/admin/JobsAdmin">Jobs</Link></li>
            </ul>
            <div>
              {/* אם לא מזהה קוקיס, לא יציג את כפתור ההתנתקות */}
              { cookies["token"] &&
              <button onClick={onLogOut} className='btn btn-dark'>Log out</button>
              }
              </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
