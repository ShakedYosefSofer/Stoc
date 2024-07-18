import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillHouseDoorFill } from "react-icons/bs";


export default function Header1() {
  return (
    <header className='container-fluid bg-warning'>
      <div className='container p-2'>
        <div className='row align-items-center'>
          <div className='logo col-auto'>
            <h2>Noon</h2>
          </div>
          <nav className='col-auto'>
            <ul>
         
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/counter">Counter</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/student">Student</Link></li>
              <li><Link to="/form1">Form 1</Link></li>
              <li><Link to="/icons">Icons</Link></li>
              <li><Link to="/map">map</Link></li>
              <li><Link to="/jerusaelm">Jerusalem</Link></li>
              <li><Link to="/FormSignUp">SignUp</Link></li>
              <li><Link to="/Admin">Admin</Link></li>
              {/* <li><Link to="/admin/categories">Categories</Link></li> */}
              <li><Link to="/pixa">Pixa</Link></li>
              <li><Link to="/graph1">Graph 1</Link></li>
              <li><Link to="/graph2">Graph 2</Link></li>
              <li className='home-icon' ><Link to="/"><BsFillHouseDoorFill /> </Link></li>

            </ul>
         
          </nav>
                    
        </div>

      </div>
    </header>
  )
}
