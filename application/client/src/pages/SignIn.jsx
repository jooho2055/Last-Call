import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';

export default function SignIn() {
	return (
		<div>
			<div>This is Sign In page</div>
			<Link to={`/signup`}>
				<button>Don't have accout? </button>
			</Link>
		</div>
	);
}
