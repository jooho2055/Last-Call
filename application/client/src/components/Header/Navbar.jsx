import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
	const isSigninSignup = useLocation.pathname === '/signin' || 'signup';

	return (

		<div className='bg-stone-900 flex justify-between'>
			<div>
				<img
					className='h-16'
					src={require('../../images/profiles/Leslie_perfil.png')}
					alt='temp_logo'
				/>
			</div>
			<nav>
				<ul className={!isLandingPage && 'flex space-x-3'}>
					{!isSigninSignup &&
						!isLandingPage &&
						navigation.map((item) => (
							<li key={item.name} className='space-x-3'>
								<Link to={item.href}>{item.name}</Link>
							</li>
						))}
				</ul>
			</nav>
			{!isSigninSignup && !isLandingPage && <Dropdown />}
		</div>
	);
}
