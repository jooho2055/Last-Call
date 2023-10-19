import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import Dropdown from './Dropdown';

const navigation = [
	{ name: 'Home', href: '#', current: true },
	{ name: 'About Us', href: '#', current: false },
	{ name: 'Current Reservation', href: '#', current: false },
	{ name: 'Order History', href: '#', current: false },
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
		<nav className='bg-gray-200'>
			<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
				<div className='relative flex h-14 items-center justify-between'>
					<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'></div>
					<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='flex flex-shrink-0 items-center'>
							<div>image goes here</div>
						</div>
						<div className='hidden sm:ml-6 sm:block'>
							<div className='flex space-x-4'>
								{isSignIn
									? navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? 'bg-gray-900 text-white'
														: 'text-black-300 hover:bg-gray-300 hover:text-white',
													'rounded-md px-3 py-2 text-base font-medium'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</a>
									  ))
									: isLandingPage && (
											<>
												<Link to='/signin'>Sign In</Link>
												<Link to='/signup'>Sign Up</Link>
											</>
									  )}
							</div>
						</div>
					</div>
					<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
						<button
							type='button'
							className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
						>
							<AiOutlineUser />
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}