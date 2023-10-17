import React from 'react';
import { Link } from 'react-router-dom';

export default function SignIn() {
	return (
		<>
			<div>This is Sign In page</div>
			<Link to={`/signup`}>
				<button>Go SignUp</button>
			</Link>
		</>
	);
}
