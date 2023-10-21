import React from 'react';
import Select from 'react-select';
import InputForSign from '../../components/SignInUp/InputForSign';
import { inputsForRest } from '../../utils/formConfig';
import { useState } from 'react';

const buttonClass = "text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg px-20 py-0.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800";

const optionsforcuisine=[
	{value: 'pizza', label: 'Pizza'},
	{value: 'hambuber', label: 'Hambuber'},
	{value: 'asian', label: 'Asian'},
	{value: 'italian', label: 'Italian'},
	{value: 'bakery', label: 'Bakery'},
	{value: 'drink', label: 'Drink'}
]
const optionsforstate=[
	{value: 'AL', label: 'AL'},
	{value: 'AK', label: 'AK'},
	{value: 'AZ', label: 'AZ'},
	{value: 'AR', label: 'AR'},
	{value: 'CA', label: 'CA'},
	{value: 'CO', label: 'CO'},
	{value: 'CT', label: 'CT'},
	{value: 'DE', label: 'DE'},
	{value: 'FL', label: 'FL'},
	{value: 'GA', label: 'GA'},
	{value: 'HI', label: 'HI'},
	{value: 'ID', label: 'ID'},
	{value: 'IL', label: 'IL'},
	{value: 'IN', label: 'IN'},
	{value: 'IA', label: 'IA'},
	{value: 'KS', label: 'KS'},
	{value: 'KY', label: 'KY'},
	{value: 'LA', label: 'LA'},
	{value: 'ME', label: 'ME'},
	{value: 'MD', label: 'MD'},
	{value: 'MA', label: 'MA'},
	{value: 'MI', label: 'MI'},
	{value: 'MN', label: 'MN'},
	{value: 'MS', label: 'MS'},
	{value: 'MO', label: 'MO'},
	{value: 'MT', label: 'MT'},
	{value: 'NE', label: 'NE'},
	{value: 'NV', label: 'Nv'},
	{value: 'NH', label: 'NH'},
	{value: 'NJ', label: 'NJ'},
	{value: 'NM', label: 'NM'},
	{value: 'NY', label: 'NY'},
	{value: 'NC', label: 'NC'},
	{value: 'ND', label: 'ND'},
	{value: 'OH', label: 'OH'},
	{value: 'OK', label: 'OK'},
	{value: 'OR', label: 'OR'},
	{value: 'PA', label: 'PA'},
	{value: 'RI', label: 'RI'},
	{value: 'SC', label: 'SC'},
	{value: 'SD', label: 'SD'},
	{value: 'TN', label: 'TN'},
	{value: 'TN', label: 'TN'},
	{value: 'TX', label: 'TX'},
	{value: 'UT', label: 'UT'},
	{value: 'VT', label: 'VT'},
	{value: 'VA', label: 'VA'},
	{value: 'WA', label: 'WA'},
	{value: 'WV', label: 'WV'},
	{value: 'WI', label: 'WI'},
	{value: 'WY', label: 'WY'}


]
function SignUpForm(){
	const [values, setValues] = useState({
		 userid:'',
         password:'',
         comfirm_password:'',
         email:'',
         phone:'',
		 restaurant_name:'',
		 address:'',
         city:'',
		 state: optionsforstate[0].value,
		 cuisine: optionsforcuisine[0].value,

  });

  const [validity, setValidity] = useState({
	     userid:true,
         password:true,
         comfirm_password:true,
         email:true,
         phone:true,
		 restaurant_name:true,
		 address:true,
         city:true,
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
		case 'restaurant_name':	
		    isValid = /^[A-Za-z0-9]{5,16}$/.test(value);
			break;
		case 'address':
			isValid = /^[A-Za-z0-9]{5,16}$/.test(value);
			break;
		case 'city':
			isValid = /^[A-Za-z0-9]{1,16}$/.test(value);
			break;
		default:
			isValid = false;
	}

	setValidity({ ...validity, [name]: isValid });
};
   

  
  const onChange = (e) =>{
	const{name, value} = e.target;
	setValues({...values, [e.target.name]: e.target.value});
	validateInput(name, value);
 }
   const onChangeSelect_s = (opt) =>{
	setValues({...values, state: opt.value});
   }
   const onChangeSelect_c = (opt) =>{
	setValues({...values, cuisine: opt.value});
   }

   const handleSubmit = (e) => {
	e.preventDefault();
	console.log(values);
};
 
	
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
			{inputsForRest.map((input)=>(
				<><InputForSign key={input.id} {...input} value= {values[input.name]} onChange={onChange} isValid={validity[input.name]}/><br /></>
			))}

            <Select className="w-48 sm:w-50 h-10 border border-black" options={optionsforstate} name="state" onChange={onChangeSelect_s}/>
		    <br />
		    <Select className="w-48 sm:w-50 h-10 border border-black " options={optionsforcuisine} name="cuisine" onChange={onChangeSelect_c}/>
            <br />
                <button class={buttonClass} type="submit">Sign in </button>
            </form>
            </div>
            <br />
            </center>   
            </div> 
        </div>
	);
}

export default function RestaurantSignUp() {
	return <div className='flex justify-center items-center h-full'>
		<SignUpForm />
	</div>;
}
