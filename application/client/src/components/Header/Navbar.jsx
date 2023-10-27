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
	// const [isSignIn, setIsSignin] = useState(false);

	const { pathname } = useLocation();
	const isLandingPage = pathname === '/';
	const isSignin = pathname === '/signin';
	const isSignup = pathname === '/signup';

	const showNavItems = !isSignin && !isSignup && !isLandingPage;

	return (
		<div className='bg-stone-900 flex justify-between'>
			<div className='py-4 text-2xl ml-5'>LAST CALL</div>
			<nav className='mr-24 pt-4'>
				<ul className={!isLandingPage && 'flex space-x-16'}>
					{showNavItems &&
						navigation.map((item) => (
							<li key={item.name} className='space-x-3 text-gray-50'>
								<Link to={item.href}>{item.name}</Link>
							</li>
						))}
				</ul>
			</nav>
			{showNavItems && <Dropdown />}
		</div>
	);
}
