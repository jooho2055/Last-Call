import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';

export default function Root() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
