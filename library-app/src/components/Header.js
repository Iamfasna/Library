import React, { useRef } from 'react'
import '../styles/Header.css'


function Header() {
  const dropDownRef = useRef(null)
  return (
    <>
    <nav>
      <div className="nav-container">
        <div className="nav-left">
          <button className="home-button">Home</button>
        </div>
        <div className="nav-right">
        <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"  ref={dropDownRef}>
    Admin
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" href="/">Logout</a></li>
  </ul>
</div>
 
        </div>
      </div>
    </nav>
    </>
    
  )
}

export default Header