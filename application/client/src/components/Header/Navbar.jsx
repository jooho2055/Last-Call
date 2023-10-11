import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import iconProfile from '../../images/profiles/User_Profile.png';


export default function Navbar() {
	return (
		<header className='header'>
      <nav className='header__nav'>
        <ul className='header__menu'>
          <div className='header__menu__item'>
            <li>
              <Link>LAST CALL</Link>
            </li>
          </div>
          <div className='header__menu__item'>
            <li>
              <Link to='/'>Home</Link>
            </li>
          </div>
          <div className='header__menu__item'>
            <li>
              <Link to='/AboutUs'>About Us</Link>
            </li>
          </div>
          <div className='header__menu__item'>
            <li>
              <Link to='/AboutUs'>Current Reservation</Link>
            </li>
          </div>
          <div className='header__menu__item'>
            <li>
              <Link to='/AboutUs'>Order History</Link>
            </li>
          </div>
          <div className="header__menu__item profile-icon">
            <li>
              <img src={iconProfile} alt="icon" />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
