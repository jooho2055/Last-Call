import React,{useState} from 'react';
import {inputForRestaurant, optionsForState, optionsForCuisine, inputForMenu} from '../utils/resProfile';
import FormInput from '../components/FormInput';
import Select from 'react-select';
import { AiFillPlusSquare } from 'react-icons/ai';

const testinput = 
	{
		id: '1',
		username: 'Test1',
		email: 'Test@gmail.com',
		phone: '4151231234',
		rname: 'Testname',
		street: 'address_s',
		city: 'testcity',
		zip: '90000',
		state: 'CA',
		cuisine: 'cafe',
	  }



export default function RestaurantProfile() {
	const [inputValues, setInputValues] = useState({
		username: testinput.username,
		pwd: '',
		cpwd: '',
		email: testinput.email,
		phone: testinput.phone,
		rname: testinput.rname,
		street: testinput.street,
		city: testinput.city,
		zip: testinput.zip,
		state: testinput.state,
		cuisine: testinput.cuisine,
	});
	
	const [validity, setValidity] = useState({
		username: true,
		pwd: true,
		cpwd: true,
		email: true,
		phone: true,
		rname: true,
		street: true,
		city: true,
		zip: true,
		state: true,
		cuisine: true,
	});

	const [menuInput, setMenuInput] = useState({
		fname: '',
		quantity: '',
		oprice:'',
		aprice:'',
	});

	const [menuvalidity, setmenuValidity] = useState({
		fail: true,
		quantity: true,
		oprice: true,
		aprice: true,
	});
	const [isOpen, setIsOpen] = useState(false);

	const formatShows = () =>{
		setIsOpen(!isOpen);
	};
	
	const isSubmitDisabled =
			!Object.values(validity).every((isValid) => isValid) ||
			!Object.values(inputValues).every((value) => value);
	
		const validateInput = (name, value) => {
			let isValid = true;
	
			switch (name) {
				case 'username':
					isValid = /^[A-Za-z0-9]{5,16}$/.test(value);
					break;
				case 'pwd':
					isValid =
						/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(
							value
						) && checkpassword(value, inputValues.cpwd);
					break;
				case 'cpwd':
					isValid = value === inputValues.pwd;
					break;
				case 'email':
					isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
					break;
				case 'phone':
					isValid = /^\d{10,10}$/.test(value);
					break;
				case 'rname':
					isValid = /^[A-Za-z0-9\s]{2,50}$/.test(value);
					break;
				case 'street':
					isValid = /^[a-zA-Z0-9\s,'#-]+$/.test(value);
					break;
				case 'city':
					isValid = /^[A-Za-z\s]{2,50}$/.test(value);
					break;
				case 'zip':
					isValid = /^\d+$/.test(value);
					break;
	
				default:
					isValid = false;
			}
	
			setValidity({ ...validity, [name]: isValid });
		};
	
		function checkpassword(pwd, cpwd) {
			if (pwd && inputValues.cpwd) {
				if (pwd !== cpwd) {
					return false;
				}
			}
			return true;
		}
		const handleSubmit = (e) => {
			e.preventDefault();
			console.log(inputValues);
		};
	
		const onChange = (e) => {
			const { name, value } = e.target;
			setInputValues({ ...inputValues, [e.target.name]: e.target.value });
			validateInput(name, value);
		};
	
		const handleState = (option) => {
			setInputValues({ ...inputValues, state: option.value });
		};
	
		const handleCuisine = (option) => {
			setInputValues({ ...inputValues, cuisine: option.value });
		};	
	

	return (
	<div className='min-h-full m-auto flex justify-center bg-white'>
	<div className='min-h-full w-10/12 grid sm:grid-cols-1 md:grid-cols-1 grid-cols-2 gap-20 relative'>
		<div className='w-80'>
		<form onSubmit={handleSubmit}>
		<h1>Restaurant profile</h1>
		{inputForRestaurant.map((input)=>(
           <FormInput
		   key={input.id}
		   {...input}
		   value={inputValues[input.name]}
		   onChange={onChange}
		   isValid={validity[input.name]}
	   />
		))}
		<label className='pl-1'>State</label>
		<Select options={optionsForState} onChange={handleState} value={optionsForState.find((option) => option.value === inputValues.state)}/>

		<label className='pl-1'>Cuisin</label>
		<Select options={optionsForCuisine} onChange={handleCuisine} value={optionsForCuisine.find((option) => option.value === inputValues.cuisine)}/>

		<button className='border text-4xl' disabled={isSubmitDisabled}>
		Save
		</button>
		</form>
		</div>
		<div>
          <p>Menu Manage</p>
          <button
            className="text-3xl mt-[0.85rem] mr-5"
            onClick={formatShows} // Toggle the isOpen state when the button is clicked
          >
            <AiFillPlusSquare />
          </button>
          {isOpen && (
            <button
              onClick={formatShows}
              className="fixed top-0 right-0 bottom-0 left-0 w-full h-full bg-black opacity-0 cursor-default"
            ></button>
          )}
          {isOpen && (
            <div className="absolute right-50 w-72 h-96 bg-gray-100">
              <p>Test</p>
              <form>
                {inputForMenu.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={menuInput[input.name]}
                    onChange={onChange}
                    isValid={menuvalidity[input.name]}
                  ></FormInput>
                ))}
				<button>
					Submit
				</button>
              </form>
            </div>
          )}
        </div>
	</div>
</div>	);
}
