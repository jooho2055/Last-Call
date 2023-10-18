import React from 'react';
import Select from 'react-select';
import SignUp from '../../components/SignInUp/SignUp';
import InputForSign from '../../components/SignInUp/InputForSign';
import { useState } from 'react';
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
		 restaurant_name:"",
		 address:"",
         city:"",

  });
   const [selected, setSelected] = useState({
	     state:"",
		 cuisine: "",
   })

  const inputs =[
	{
        id: 1,
        name: "restaurant_name",
        type: "text",
        placeholder: "Restaurant Name",
              
      },
      {
        id: 2,
        name: "address",
        type: "text",
        placeholder: "Address",
              
      },
      {
        id: 3,
        name: "city",
        type: "text",
        placeholder: "City",
              
      },
  ]
  const onChange = (e) =>{
	setValues({...values, [e.target.name]: e.target.value});
 }
 console.log(values);
 const onSelectChange = (obj) => {
	if (obj.name === "state") {
		setSelected({ ...selected, state: obj.value });
	  } else if (obj.name === "cuisine") {
		setSelected({ ...selected, cuisine: obj.value });
	  }
 }
 console.log(selected);
	
	return(<div>
		 {inputs.map((input)=>(
                  <><InputForSign key={input.id} {...input} value= {values[input.name]} onChange={onChange}/><br /></>
                ))}
		<Select className="w-48 sm:w-50 h-10 border border-black" options={optionsforstate} name="state" onChange={onSelectChange}/>
		<br />
		<Select className="w-48 sm:w-50 h-10 border border-black " options={optionsforcuisine} name="cuisine" onChange={onSelectChange}/>
        
		
	    </div>);
}

export default function RestaurantSignUp() {
	return <div>
		<SignUp title="Sign Up" character="Restaurant" form_signup={SignUpForm} />
	</div>;
}
