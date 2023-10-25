import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';

export default function Root() {
	return (
		<>
			<header className='flex justify-between'>
				<Navbar />
			</header>
			<main className='h-full w-full m-auto overflow-y-auto'>
				<Outlet />
			</main>
			<footer>Team 7</footer>
		</>
	);
}
