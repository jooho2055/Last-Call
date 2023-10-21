import React from 'react';

export default function Sign(props) {

    return (
        <div class="box-content h-auto w-96 bg-[#DFDFDF] relative">
            <div class="bg-[#DFDFDF] absolute left-0 right-2 top-7" >
            <center>
            <h1 class="text-center text-2xl">{props.title}</h1>
            <br />
            <p class="text-center text-xs">{props.character}</p> 
            <div>{props.form()}</div>   
            </center>   
            </div> 
        </div>
    );
}

