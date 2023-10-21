import React, { useState } from 'react';
import Sign from '../components/SignInUp/Sign';
import { Link } from 'react-router-dom';
import InputForSign from '../components/SignInUp/InputForSign';
function Form(){
	const [values, setValues] = useState({
		username:"",
		password:"",
	});

	const inputs = [
		{
			id: 1,
			name: "username",
			type: "text",
			placeholder: "Username",

		},
		{  
			id: 2,
			name: "password",
			type: "text",
			placeholder: "Password",

		},
	]

	const handleSubmit =(e)=>{
		e.preventDefault();
		//const data = new FormData(e.target)
		//console.log(Object.fromEntries(data.entries()))
	};
	const onChange = (e) =>{
		setValues({...values, [e.target.name]: e.target.value});
	}
	console.log(values);
	return (
		<div>
			<form onSubmit={handleSubmit}>
				{inputs.map((input)=>(
					<><InputForSign key={input.id} {...input} value={values[input.name]} onChange={onChange}/><br /></>
				))}
				<p class="text-xs"><input type="checkbox" name='check' checked="isRestaurant"/> are you login as a restaurant</p>
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
