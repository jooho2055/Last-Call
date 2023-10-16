import React from 'react';
import Sign from '../components/SignInUp/Sign';
import { Link } from 'react-router-dom';
function Form(){
	return (
		<div>
			<form>
				<input type="text" name="username" placeholder='User ID'class="shadow appearance-none border border-black rounded-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
				<br />
				<br />
				<input type="text" name="password" placeholder='password'class="shadow appearance-none border border-black rounded-full px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
				<br />
				<p class="text-xs"><input type="checkbox" /> are you login as a restaurant</p>
				<br />
				<button class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg px-20 py-0.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Sign in </button>
				<br />
				<p class="text-center text-xs">create account? <Link to="/" class="underline">sign up</Link></p>
			</form>
		</div>

	);
}

export default function SignIn() {
	return <div>
		<Sign title="Sign In" character="Are your log in as...?" form={Form} />
	</div>;
}
