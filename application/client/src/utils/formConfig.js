export const inputsForSignIn = [
	{
		id: 1,
		name: 'username',
		type: 'text',
		placeholder: 'Username',
		label: 'Username',
	},
	{
		id: 2,
		name: 'pwd',
		type: 'password',
		placeholder: 'Password',
		label: 'Password',
	},
];

export const inputsForCustomer = [
	{
		id: 1,
		name: 'username',
		type: 'text',
		placeholder: 'Username',
		errorMessage: 'Username must be 5-16 characters, no special characters!',
		label: 'Username',
	},
	{
		id: 2,
		name: 'fname',
		type: 'text',
		placeholder: 'Firstname',
		errorMessage: 'It should not contain numbers or special characters!',
		label: 'Firstname',
	},
	{
		id: 3,
		name: 'lname',
		type: 'text',
		placeholder: 'Lastname',
		errorMessage: 'It should not contain numbers or special characters!',
		label: 'Lastname',
	},
	{
		id: 4,
		name: 'email',
		type: 'email',
		placeholder: 'Email Address',
		errorMessage: 'It should be a valid email address!',
		label: 'Email Address',
	},
	{
		id: 5,
		name: 'pwd',
		type: 'password',
		placeholder: 'Password',
		errorMessage:
			'Password needs 8-20 chars: at least one letter, one number, and a special character! or it does not match with confirm password!',
		label: 'Password',
	},
	{
		id: 6,
		name: 'cpwd',
		type: 'password',
		placeholder: 'Confirm Password',
		errorMessage: 'Passwords do not match!',
		label: 'Confirm Password',
	},
	{
		id: 7,
		name: 'phone',
		type: 'text',
		placeholder: 'Phone',
		errorMessage: 'The phone number must be a valid number!',
		label: 'Phone',
	},
];

export const inputsForRestaurant = [
	{
		id: 1,
		name: 'username',
		type: 'text',
		placeholder: 'Username',
		errorMessage: 'Username must be 5-16 characters, no special characters!',
		label: 'Username',
	},
	{
		id: 2,
		name: 'pwd',
		type: 'text',
		placeholder: 'Password',
		errorMessage:
			'Password needs 8-20 chars: at least one letter, one number, and a special character!',
		label: 'Password',
	},
	{
		id: 3,
		name: 'cpwd',
		type: 'text',
		placeholder: 'Confirm Password',
		errorMessage: 'Passwords do not match!',
		label: 'Confirm Password',
	},
	{
		id: 4,
		name: 'email',
		type: 'email',
		placeholder: 'Email Address',
		errorMessage: 'It should be a valid email address!',
		label: 'Email Address',
	},
	{
		id: 5,
		name: 'phone',
		type: 'text',
		placeholder: 'Phone',
		errorMessage: 'The phone number must be a valid number!',
		label: 'Phone',
	},
	{
		id: 6,
		name: 'rname',
		type: 'text',
		placeholder: 'Restaurant Name',
		errorMessage: 'It should not contain special characters!',
		label: 'Restaurant Name',
	},
	{
		id: 7,
		name: 'street',
		type: 'text',
		placeholder: 'Street',
		errorMessage: "The street should not contain special characters except , '- and #",
		label: 'Street',
	},
	{
		id: 8,
		name: 'city',
		type: 'text',
		placeholder: 'City',
		errorMessage: 'It should contain only letters, with no numbers or special characters!',
		label: 'City',
	},
	{
		id: 9,
		name: 'zip',
		type: 'text',
		placeholder: 'Zip Code',
		errorMessage: 'It should contain only numbers',
		label: 'Zip Code',
	},
];

export const optionsForState = [
	{ value: 'AL', label: 'AL' },
	{ value: 'AK', label: 'AK' },
	{ value: 'AZ', label: 'AZ' },
	{ value: 'AR', label: 'AR' },
	{ value: 'CA', label: 'CA' },
	{ value: 'CO', label: 'CO' },
	{ value: 'CT', label: 'CT' },
	{ value: 'DE', label: 'DE' },
	{ value: 'FL', label: 'FL' },
	{ value: 'GA', label: 'GA' },
	{ value: 'HI', label: 'HI' },
	{ value: 'ID', label: 'ID' },
	{ value: 'IL', label: 'IL' },
	{ value: 'IN', label: 'IN' },
	{ value: 'IA', label: 'IA' },
	{ value: 'KS', label: 'KS' },
	{ value: 'KY', label: 'KY' },
	{ value: 'LA', label: 'LA' },
	{ value: 'ME', label: 'ME' },
	{ value: 'MD', label: 'MD' },
	{ value: 'MA', label: 'MA' },
	{ value: 'MI', label: 'MI' },
	{ value: 'MN', label: 'MN' },
	{ value: 'MS', label: 'MS' },
	{ value: 'MO', label: 'MO' },
	{ value: 'MT', label: 'MT' },
	{ value: 'NE', label: 'NE' },
	{ value: 'NV', label: 'Nv' },
	{ value: 'NH', label: 'NH' },
	{ value: 'NJ', label: 'NJ' },
	{ value: 'NM', label: 'NM' },
	{ value: 'NY', label: 'NY' },
	{ value: 'NC', label: 'NC' },
	{ value: 'ND', label: 'ND' },
	{ value: 'OH', label: 'OH' },
	{ value: 'OK', label: 'OK' },
	{ value: 'OR', label: 'OR' },
	{ value: 'PA', label: 'PA' },
	{ value: 'RI', label: 'RI' },
	{ value: 'SC', label: 'SC' },
	{ value: 'SD', label: 'SD' },
	{ value: 'TN', label: 'TN' },
	{ value: 'TN', label: 'TN' },
	{ value: 'TX', label: 'TX' },
	{ value: 'UT', label: 'UT' },
	{ value: 'VT', label: 'VT' },
	{ value: 'VA', label: 'VA' },
	{ value: 'WA', label: 'WA' },
	{ value: 'WV', label: 'WV' },
	{ value: 'WI', label: 'WI' },
	{ value: 'WY', label: 'WY' },
];

export const optionsForCuisine = [
	{ value: 'pizza', label: 'Pizza' },
	{ value: 'hamburger', label: 'Hamburger' },
	{ value: 'cafe', label: 'Cafe' },
	{ value: 'bakery', label: 'Bakery' },
	{ value: 'italian', label: 'Italian' },
	{ value: 'spanish', label: 'Spanish' },
	{ value: 'thai', label: 'Thai' },
	{ value: 'veitnamese', label: 'Veitnamese' },
	{ value: 'chinesek', label: 'Chinese' },
	{ value: 'korean', label: 'Korean' },
	{ value: 'japanese', label: 'Japanese' },
	{ value: 'french', label: 'French' },
	{ value: 'indian', label: 'Indian' },
	{ value: 'mexican', label: 'Mexican' },
];
