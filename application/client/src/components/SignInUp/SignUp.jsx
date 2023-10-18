import React from 'react';
import { useState } from 'react';
import InputForSign from './InputForSign';


export default function SignUp(props) {
   const [values, setValues] = useState({
         userid:"",
         password:"",
         comfirm_password:"",
         email:"",
         phone:"",
         
   });
   const inputs =[
       {
        id:1,
        name:"userid",
        type:"text",
        placeholder:"User ID",
       },
       {
        id:2,
        name:"password",
        type:"text",
        placeholder:"Password",
       },
       {
        id:3,
        name:"comfirm_password",
        type:"text",
        placeholder:"Comfirm Password",
       },
       {
        id:4,
        name:"email",
        type:"text",
        placeholder:"Email",
       },
       {
        id:5,
        name:"phone",
        type:"text",
        placeholder:"Phone Number",
       },
   ]
   const onChange = (e) =>{
		setValues({...values, [e.target.name]: e.target.value});
	}
  console.log(values);
       return (
        <div class="box-content h-auto w-96 bg-[#DFDFDF] relative">
            <div class="bg-[#DFDFDF] absolute left-0 right-2 top-7" >
            <br />    
            <center>  
            <h1 class="text-center text-2xl">{props.title}</h1>
            <br />
            <div class="box-content h-6 w-16 bg-slate-800"> 
            <p class="text-center text-xs text-white">{props.character}</p> 
            </div>
            <div class="relative top-1">
            <form>
                {inputs.map((input)=>(
                  <><InputForSign key={input.id} {...input} value= {values[input.name]} onChange={onChange}/><br /></>
                ))}
                {props.form_signup()}
                <br />
                <button class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg px-20 py-0.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800" type="submit">Sign in </button>
            </form>
            </div>
            <br />
            </center>   
            </div> 

            
        </div>
    );
}

