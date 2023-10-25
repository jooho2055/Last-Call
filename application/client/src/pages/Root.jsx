import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';

export default function Root() {
	const location = useLocation();
	const isLandingPage = location.pathname === '/';

	return (
		<>
			<header>
				<Navbar />
			</header>
			<main className='h-full w-full m-auto overflow-y-auto'>
				<Outlet />
			</main>
			<footer className={isLandingPage ? 'bg-custom-gray' : ''}>Team 7</footer>
		</>
	);
}
