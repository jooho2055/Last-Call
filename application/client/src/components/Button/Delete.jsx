import React from 'react';

export default function DeleteButton({handleDetele}) {
    return (
        <div className='text-xl mt-[3.75rem] mr-2'>
         <button onClick={handleDetele}>Delete</button>   
        </div>
    );
}