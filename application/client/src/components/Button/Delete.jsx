import React from 'react';
import {AiFillDelete } from 'react-icons/ai';
export default function DeleteButton({handleDetele}) {
    return (
        <div className='text-3xl mt-[3.75rem] mr-2'>
         <button onClick={handleDetele}><AiFillDelete/></button>   
        </div>
    );
}