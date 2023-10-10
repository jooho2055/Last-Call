import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import iconProfile from '../../images/profiles/UserProfile.png';


export default function Navbar() {
	return (
		<header className='header'>
			<nav className='header__nav'>
				<ul className='header__menu'>
				<li className='header__menu__item'>
						<Link to='/AboutUs'>LAST CALL</Link>
					</li>
					<li className='header__menu__item'>
						<Link to='/'>Home</Link>
					</li>
					<li className='header__menu__item'>
						<Link to='/AboutUs'>About Us</Link>
					</li>
					<li className='header__menu__item'>
						<Link to='/AboutUs'>Current Reservation</Link>
					</li>
					<li className='header__menu__item'>
						<Link to='/AboutUs'>Order History</Link>
					</li>
					<li className="header__menu__item1 profile-icon">
            		<img src={iconProfile} alt="icon"  />
         		 </li>
				</ul>
			</nav>
		</header>
	);
} 
