import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import '../css/styles.css';


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // בודק אם גודל המסך גדול מ-50%
  const handleResize = () => {
    if (window.innerWidth > window.innerWidth / 2) {
      setMenuOpen(false); // סגור את התפריט במסכים גדולים
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="container-fluid bg-warning ">
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
              {/* <li><Link to="/Developer">Developer</Link></li>
              <li><Link to="/Designer">Designer</Link></li>
              <li><Link to="/DevOps">DevOps</Link></li>
              <li><Link to="/QA">QA</Link></li>
              <li><Link to="/Others">Others</Link></li> */}
              <li><Link to="/FormSignUp">SignUp</Link></li>
              <li><Link to="/Login">Login</Link></li>
              <li><Link to="/Admin">Admin</Link></li>
              <li className="home-icon"><Link to="/"><BsFillHouseDoorFill size={20}/></Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
