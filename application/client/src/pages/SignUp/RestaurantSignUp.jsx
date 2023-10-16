import React from 'react';
import Select from 'react-select';
import SignUp from '../../components/SignInUp/SignUp';
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
	return(<div>
		<input type='text' placeholder='Restaurant Name' class="shadow appearance-none border border-black rounded-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
		<br />
        <br />
		<input type='text' placeholder='Address' class="shadow appearance-none border border-black rounded-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
		<br />
        <br />
		<input type='text' placeholder='City' class="shadow appearance-none border border-black rounded-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
		<br />
        <br />
		<div class="border px-20 bg-[#DFDFDF]">
		<Select options={optionsforstate} />
		</div>
		<br />
		<div class="border px-20 bg-[#DFDFDF]">
		<Select options={optionsforcuisine} />
        </div>
		
	    </div>);
}

export default function RestaurantSignUp() {
	return <div>
		<SignUp title="Sign Up" character="Restaurant" form_signup={SignUpForm} />
	</div>;
}
