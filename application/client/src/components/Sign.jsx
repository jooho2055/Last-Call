import React from 'react';

export default function Sign(props) {
    return (
        <div class="w-80 border-2 divide-blue-200 bg-[#DFDFDF]">
            <div>
            <h1 class="text-center">{props.title}</h1>
            <p class="text-center">{props.character}</p>      
            </div> 
        </div>
    );
}

