import React from 'react';
import SignUp from '../../components/SignInUp/SignUp';
function SignUpForm(){
	return(
		<div><input type='text' placeholder='First Name' class="shadow appearance-none border border-black w-24 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline relative right-2"/>
		     <input type='text' placeholder='Last Name'  class="shadow appearance-none border border-black w-24 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline relative left-2"/>
		</div>
	)

}

export default function UserSignUp() {
	return (<div>
		<SignUp title="Sign Up" character="User" form_signup={SignUpForm}/>
    
	</div>);
}
