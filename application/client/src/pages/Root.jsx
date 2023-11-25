import React from 'react';
import { Outlet, useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import { BsCartCheck } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import Navbar from '../components/Header/Navbar';

export default function Root() {
	const location = useLocation();
	const user = useSelector((state) => state.user);

	const isLandingPage = location.pathname === '/';
	const isSignin = location.pathname === '/signin';
	const isSignup = location.pathname === '/signup';
	const isSignupCustomer = location.pathname === '/signup/customer';
	const isSignupRestaurant = location.pathname === '/signup/restaurant';

	const shouldShowAside = !isLandingPage;
	const showbg = isSignin || isSignup || isSignupCustomer || isSignupRestaurant;

	return (
		<>
			<header className='text-slate-100 text-lg shadow-xl'>
				{!isLandingPage && <Navbar />}
			</header>
			<main
				className={`h-full w-full m-auto overflow-y-auto ${showbg ? 'bg-custombg' : ''} ${
					isSignin || isSignupCustomer || isSignupRestaurant
						? 'flex justify-center items-center'
						: ''
				}`}
			>
				<Outlet />
				{shouldShowAside && !showbg && (
					<aside>
						<Link
							to={`/cart/${user.userId}`}
							style={{ boxShadow: '3px 3px 0px 0px #262626' }}
							className='fixed w-[4.5rem] h-[4.5rem] right-14 bottom-20 text-5xl bg-primary rounded-full lg:w-12 lg:h-12 lg:text-2xl'
						>
							<BsCartCheck className='text-gray-50 mt-3 ml-3 ' />
						</Link>
					</aside>
				)}
			</main>
			{!isLandingPage && (
				<footer
					className={`text-center text-xs p-1 font-medium ${showbg ? 'bg-custombg' : ''}`}
				>
					Last Call © 2023
				</footer>
			)}
		</>
	);
}
