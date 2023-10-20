import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import Dropdown from './Dropdown';

const navigation = [
	{ name: 'Home', href: '/customerhome', current: true },
	{ name: 'Order', href: '/order', current: false },
	{ name: 'About Us', href: '/AboutUs', current: false },
];

// function classNames(...classes) {

//     return classes.filter(Boolean).join(' ');
// }

export default function Navbar() {
	const [isSignIn, setIsSignin] = useState(false);
	const userLocation = useLocation();
	const isLandingPage = userLocation.pathname === '/';
	const isCustomerHomePage = userLocation.pathname === '/customerhome';

	return (
		<header className='flex justify-between'>
			<div>
				<div>image goes here!!!</div>
			</div>
			<nav>
				<ul className='flex'>
					{isCustomerHomePage
						? navigation.map((item) => (
								<li key={item.name} className='ml-7'>
									<Link to={item.href}>{item.name}</Link>
								</li>
						  ))
						: isLandingPage && (
								<div>
									<li>
										<Link to='/signin'>Sign In</Link>
									</li>
									<li>
										<Link to='/signup'>Sign Up</Link>
									</li>
								</div>
						  )}
					<Dropdown />
				</ul>
			</nav>
		</header>
	);
}
