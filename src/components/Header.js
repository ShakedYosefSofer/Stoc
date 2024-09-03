import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillHouseDoorFill } from "react-icons/bs";

export default function Header() {
  return (
    <header className='container-fluid bg-warning'>      
<img src='/Stoc.png' alt='Stoc' height='75' width='125' />
<div className='container p-2'>        
        <div className='row align-items-center'>
          <div className='logo col-auto'>
            <h2>Stoc</h2>
          </div>
          <nav className='col-auto'>
            <ul>
         
       
              <li><Link to="/">Jobs</Link></li>
              <li><Link to="/FormSignUp">SignUp</Link></li>
              <li><Link to="/Admin">Admin</Link></li>
              <li className='home-icon' ><Link to="/student"><BsFillHouseDoorFill /> </Link></li>

            </ul>
         
          </nav>
                    
        </div>

      </div>
    </header>
  )
}
