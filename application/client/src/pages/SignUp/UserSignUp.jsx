import React,{useState} from 'react';
import SignUp from '../../components/SignInUp/SignUp';

function SignUpForm(){
	const [values, setValues] = useState({
		firstname:"",
		lastname:"",

 });
 const inputs =[
	{
		id : 1,
		name: "firstname",
		type: "text",
		placeholder:"First Name",
		class:"shadow appearance-none border border-black w-24 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline relative right-2",
	},
	{
		id : 2,
		name: "lastname",
		type: "text",
		placeholder:"Last Name",
		class:"shadow appearance-none border border-black w-24 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline relative left-2",
	},
 ]

 const onChange = (e) =>{
	setValues({...values, [e.target.name]: e.target.value});
 }
 console.log(values)
	return(
		<div>
			{inputs.map((input)=>(
				<input key={input.id} {...input} value= {values[input.name]} onChange={onChange}/>
			))}
		</div>
	)

}

export default function UserSignUp() {
	return (<div>
		<SignUp title="Sign Up" character="User" form_signup={SignUpForm}/>
    
	</div>);
}
