import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';

export default function Root() {
	const location = useLocation();
	const isLandingPage = location.pathname === '/';

	return (
		<>
			<header className='text-slate-100 text-lg shadow-xl'>
				{!isLandingPage && <Navbar />}
			</header>
			<main className='h-full w-full m-auto overflow-y-auto'>
				<Outlet />
			</main>
			{!isLandingPage && <footer>Team 7</footer>}
		</>
	);
}
