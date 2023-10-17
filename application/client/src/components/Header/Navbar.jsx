import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';

const navigation = [
	{ name: 'Home', href: '/home', current: true },
	{ name: 'About Us', href: '/aboutus', current: false },
	{ name: 'Current Reservation', href: '/currentreservation', current: false },
	{ name: 'Order History', href: '/orderhistory', current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
	const [isSignIn, setIsSignin] = useState(false);
	const userLocation = useLocation();
	const isLandingPage = userLocation.pathname === '/';

	return (
		<header className='flex justify-between'>
			<div>
				<div>image goes here</div>
			</div>
			<nav>
				<ul className='flex'>
					{isSignIn
						? navigation.map((item) => <li key={item.name}>{item.name}</li>)
						: isLandingPage && (
								<>
									<li>
										<Link to='/signin'>Sign In</Link>
									</li>
									<li>
										<Link to='/signup'>Sign Up</Link>
									</li>
								</>
						  )}
				</ul>
			</nav>
			<button>
				<AiOutlineUser />
			</button>
		</header>
	);
}
