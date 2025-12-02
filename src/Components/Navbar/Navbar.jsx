import React, { useState } from 'react'
import style from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {

  const [checkToken, setCheckToken] = useState(localStorage.getItem('token'))

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('token');
    setCheckToken(null);
    navigate('login')
  }

  return <>
    <nav className="navbar navbar-expand-lg bg-white border border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to={'/'}><span className='text-danger'>E</span>-store</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          {!checkToken ? <ul className="navbar-nav text-center px-4 ms-auto mb-2 mb-lg-0 d-flex justify-content-evenly w-50">
            <li className="nav-item">
              <Link to={'register'} className="nav-link" href="#">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link to={'login'} className="nav-link" href="#">Login</Link>
            </li>
          </ul> : <ul className="navbar-nav text-center px-4 ms-auto mb-2 mb-lg-0 d-flex justify-content-evenly w-50">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">Products</Link>
            </li>
            <li className="nav-item">
              <span className={`nav-link ${style.logout}`} onClick={logout}>Logout</span>
            </li>

          </ul>}
        </div>
      </div>
    </nav>
  </>
}
