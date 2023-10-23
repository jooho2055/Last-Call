import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';

export default function Root() {
	return (
		<div className='flex flex-col h-screen'>
			<header className='flex justify-between'>
				<Navbar />
			</header>
			{/* This main tag will grow to take up all available space */}
			<main className='flex-grow flex bg-orange-600 w-full mx-auto'>
				<Outlet />
			</main>
			<footer>Team 7</footer>
		</div>
	);
}
