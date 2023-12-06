// import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Dropdown from './Dropdown';
import lastcall from '../../images/lastcall.png';
import { useSelector } from 'react-redux';

export default function Navbar({ role }) {
	// const [isSignIn, setIsSignin] = useState(false);
	const user = useSelector((state) => state.user);

	const { pathname } = useLocation();
	const isLandingPage = pathname === '/';
	const isSignin = pathname === '/signin';
	const isSignup = pathname === '/signup';
	const isSignupCustomer = pathname === '/signup/customer';
	const isSignupRestaurant = pathname === '/signup/restaurant';

	const navigation = [
		{ name: 'Home', href: '/home', current: true },
		{ name: 'Order', href: `/order/${user.userId}`, current: false },
		{ name: 'About Us', href: '/AboutUs', current: false },
	];

	const navigation_rest = [
		{ name: 'Menu', href: '/restaurant/menu', current: true },
		{ name: 'Order', href: '/restaurant/order', current: false },
		{ name: 'About Us', href: '/AboutUs', current: false },
	];

	const showNavItems =
		!isSignin && !isSignup && !isLandingPage && !isSignupCustomer && !isSignupRestaurant;
	const currentNavigation = role === 'restaurants' ? navigation_rest : navigation;

	return (
		<>
			{showNavItems && (
				<div className='bg-gray-100 flex justify-between h-[4.5rem]'>
					<Link to={'/'}>
						<div className='mt-[1.35rem] ml-9 w-36 h-14'>
							<img src={lastcall} alt='Last Call logo' />
						</div>
					</Link>
					<nav className='mr-36 pt-[1.35rem]'>
						<ul className={!isLandingPage ? 'flex space-x-16' : ''}>
							{showNavItems &&
								currentNavigation.map((item) => (
									<li
										key={item.name}
										className='space-x-3 text-stone-900 font-medium'
									>
										<Link to={item.href}>{item.name}</Link>
									</li>
								))}
						</ul>
					</nav>
					{showNavItems && <Dropdown />}
				</div>
			)}
		</>
	);
}
