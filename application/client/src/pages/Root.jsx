import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';

export default function Root() {
	return (
		<>
			<header className='flex justify-between'>
				<Navbar />
			</header>
			<main className='bg-orange-600 w-full justify-items-center m-auto'>
				<Outlet />
			</main>
			<footer>Team 7</footer>
		</>
	);
}
