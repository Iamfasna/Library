import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Check if admin name exists in local storage
    const storedAdminName = localStorage.getItem('adminName');
    if (storedAdminName) {
      setAdminName(storedAdminName);
    } else {
      // Fetch admin name if not stored in local storage
      fetchAdminName();
    }
  }, []);

  const fetchAdminName = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get('http://localhost:5000/adminName', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { adminName } = response.data;
      // Store admin name in local storage
      localStorage.setItem('adminName', adminName);
      setAdminName(adminName);
    } catch (error) {
      console.error('Failed to fetch admin name:', error);
      setAdminName('A');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout');
      localStorage.removeItem('adminName'); // Remove admin name from local storage on logout
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }

  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/adminHome">
              <button className="home-button">Home</button>
            </Link>
          </div>
          <div className="nav-right">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {adminName ? adminName : 'Admin'}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
