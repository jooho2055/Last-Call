import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputForSign from './InputForSign';


export default function SignUp(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [input, setInput] = useState({
        password: '',
        confirmPassword: ''
      });
     
      const [error, setError] = useState({
        password: '',
        confirmPassword: ''
      })
    const onSubmit = (data) => {
        console.log(data);
      };
    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
          ...prev,
          [name]: value
        }));
        validateInput(e);
      }  
      const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
          const stateObj = { ...prev, [name]: "" };
     
          switch (name) {
            case "password":
              if (!value) {
                stateObj[name] = "Please enter Password.";
              } else if (input.confirmPassword && value !== input.confirmPassword) {
                stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
              } else {
                stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
              }
              break;
     
            case "confirmPassword":
              if (!value) {
                stateObj[name] = "Please enter Confirm Password.";
              } else if (input.password && value !== input.password) {
                stateObj[name] = "Password and Confirm Password does not match.";
              }
              break;
     
            default:
              break;
          }
     
          return stateObj;
        });
      }
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputForSign type='text' name='userid' placeholder='User ID'/>
                <br />
                <InputForSign type='password' name='password' placeholder='password' />
                <br />
                <InputForSign type='password' name='password' placeholder='comfirm password' />
                <br />
                <InputForSign type='text' name='email' placeholder='Email' />
                <br />
                <InputForSign type='number' name='phone' placeholder='Phone Number' />
                <br />
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

