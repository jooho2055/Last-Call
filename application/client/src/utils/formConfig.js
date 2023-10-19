


export const inputsForRest =[
    {
        id:1,
        name:"userid",
        type:"text",
        errorMessage:"Username must be 5-16 characters, no special characters!",
        placeholder:"User ID",
        required:true,
       },
       {
        id:2,
        name:"password",
        type:"password",
        errorMessage:"Password needs 8-20 chars: at least one letter, one number, and a special character!",
        placeholder:"Password",
        required: true,
       },
       {
        id:3,
        name:"comfirm_password",
        type:"password",
        errorMessage:"Password don't match",
        placeholder:"Comfirm Password",
        required: true,
       },
       {
        id:4,
        name:"email",
        type:"email",
        errorMessage:"It should be gmail address",
        placeholder:"Email",
        required:true,
       },
       {
        id:5,
        name:"phone",
        type:"tel",
        errorMessage:"The Phone number don't match",
        placeholder:"Phone Number",
        required:true,
       },
       {
        id: 6,
        name: "restaurant_name",
        type: "text",
        placeholder: "Restaurant Name",
        errorMessage:"Restaurant name is not empty",
        required:true,      
      },
      {
        id: 7,
        name: "address",
        type: "text",
        placeholder: "Address",
        errorMessage:"address is not empty",
        required:true,      
      },
      {
        id: 8,
        name: "city",
        type: "text",
        placeholder: "City",
        errorMessage:"city is not empty",
        required:true,      
      },
]






export const inputsForUser =[
    {
        id:1,
        name:"userid",
        type:"text",
        errorMessage:"Username must be 5-16 characters, no special characters!",
        placeholder:"User ID",
        required:true,
       },
       {
        id:2,
        name:"password",
        type:"password",
        errorMessage:"Password needs 8-20 chars: at least one letter, one number, and a special character!",
        placeholder:"Password",
        required: true,
       },
       {
        id:3,
        name:"comfirm_password",
        type:"password",
        errorMessage:"Password don't match",
        placeholder:"Comfirm Password",
        required: true,
       },
       {
        id:4,
        name:"email",
        type:"email",
        errorMessage:"It should be gmail address",
        placeholder:"Email",
        required:true,
       },
       {
        id:5,
        name:"phone",
        type:"tel",
        errorMessage:"The Phone number don't match",
        placeholder:"Phone Number",
        required:true,
       },
       {
		   id : 6,
		   name: "firstname",
		   type: "text",
		   placeholder:"First Name",
       errorMessage:"It should not contain numbers or special characters!",        
       required:true,

	},
	{
		id : 7,
		name: "lastname",
		type: "text",
		placeholder:"Last Name",
    errorMessage:"It should not contain numbers or special characters!",
    required:true,
	},
]



