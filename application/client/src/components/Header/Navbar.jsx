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
	const isCustomerHomePage = userLocation.pathname === '/customerhome';

	return (
		<>
			<div>
				<div>
					<img
						class='h-8'
						src={require('../../images/profiles/Leslie_perfil.png')}
						alt='temp_logo'
					/>
				</div>
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
								<>
									<div>
										<li>
											<Link to='/signin'>Sign In</Link>
										</li>
									</div>
									<div class='ml-5'>
										<li>
											<Link to='/signup'>Sign Up</Link>
										</li>
									</div>
								</>
						  )}
				</ul>
			</nav>
			{!isLandingPage && <Dropdown />}
		</>
	);
}
