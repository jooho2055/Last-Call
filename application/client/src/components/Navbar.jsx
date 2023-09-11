import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<header className='header'>
			<nav className='header__nav'>
				<ul className='header__menu'>
					<li className='header__menu__item'>
						<Link to='/'>Home</Link>
					</li>
					<li className='header__menu__item'>
						<Link to='/AboutUs'>About Us</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
