import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUpChoice() {
	return (
		<div>
			<h1>here is sign up choice page</h1>
			<Link to={`/signup/customer`}>
				<button className='mr-10'>to customerSignup</button>
			</Link>

			<Link to={`/signup/restaurant`}>
				<button>to restSignup</button>
			</Link>
		</div>
	);
}
