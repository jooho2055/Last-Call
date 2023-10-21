import React,{useState} from 'react';
import { inputsForUser } from '../../utils/formConfig';
import InputForSign from '../../components/SignInUp/InputForSign';
const buttonClass = "text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg px-20 py-0.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800";

function SignUpForm(){
	const [values, setValues] = useState({
		 userid:'',
         password:'',
         comfirm_password:'',
         email:'',
         phone:'',
		 firstname:'',
		 lastname:'',

 });
 const [validity, setValidity] = useState({
    userid:true,
    password:true,
    comfirm_password:true,
    email:true,
    phone:true,
    firstname:true,
    lastname:true,
});

 const validateInput = (name, value) => {
	let isValid = true;

	switch (name) {
		case 'userid':
			isValid = /^[A-Za-z0-9]{5,16}$/.test(value);
			break;
		case 'password':
			isValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(value);
			break;
		case 'comfirm_password':
			isValid = value === values.password;
			break;
		case 'email':
			isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
			break;
		case 'phone':
			isValid = /^\d{10,15}$/.test(value);
			break;
		case 'firstname':	
		    isValid = /^[A-Za-z]{1,16}$/.test(value);
			break;
		case 'lastname':
			isValid = /^[A-Za-z]+$/.test(value);
			break;
		default:
			isValid = false;
	}
    setValidity({ ...validity, [name]: isValid });
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
};
 const onChange = (e) =>{
    const {name, value} = e.target;
	setValues({...values, [e.target.name]: e.target.value});
    validateInput(name, value)
 }
	return(
		<div class="box-content h-auto w-96 bg-[#DFDFDF] relative">
            <div class="bg-[#DFDFDF] absolute left-0 right-2 top-7" >
            <br />    
            <center>  
            <h1 class="text-center text-2xl">Sign Up</h1>
            <br />
            <div class="box-content h-6 w-16 bg-slate-800"> 
            <p class="text-center text-xs text-white">User</p> 
            </div>
            <div class="relative top-1">
			<form onSubmit={handleSubmit}>
			{inputsForUser.map((input)=>(
				<><InputForSign key={input.id} {...input} value= {values[input.name]} onChange={onChange} isValid={validity[input.name]}/><br /></>
			))}
                <button class={buttonClass} type="submit">Sign in </button>
            </form>
            </div>
            <br />
            </center>   
            </div> 
        </div>

	)

}


export default function UserSignUp() {
	return (<div className='flex justify-center items-center h-full'>
		<SignUpForm />
    
	</div>);
}
