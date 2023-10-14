import React from 'react';
import { Link } from 'react-router-dom';

import iconProfile from '../../images/profiles/User_Profile.png';

export default function Navbar() {
	return (
		<header>
			<nav>
				<ul>
					<div>
						<li>
							<Link>LAST CALL</Link>
						</li>
					</div>
					<div>
						<li>
							<Link to='/'>Home</Link>
						</li>
					</div>
					<div>
						<li>
							<Link to='/AboutUs'>About Us</Link>
						</li>
					</div>
					<div>
						<li>
							<Link to='/AboutUs'>Current Reservation</Link>
						</li>
					</div>
					<div>
						<li>
							<Link to='/AboutUs'>Order History</Link>
						</li>
					</div>
					<div>
						<li>
							<img src={iconProfile} alt='icon' />
						</li>
					</div>
				</ul>
			</nav>
		</header>
	);
}
