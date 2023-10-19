import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';

export default function Root() {
	return (
		<>
			<Navbar />
			<main className='pt-10'>
				<Outlet />
			</main>
			<footer>Team 7</footer>
		</>
	);
}
