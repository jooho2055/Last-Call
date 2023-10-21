import React from 'react';
import Sign from '../../components/SignInUp/Sign';

function SignUpform(){
    return(
        <div>
            <button type="button" class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium text-lg px-14 py-12 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 absolute left-3 right-49 top-24">User</button>
            <button type='button' class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium text-lg px-12 py-12 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 absolute right-3 left-49 top-24">Restaurant</button>
        </div>
    );
}

export default function SignUpChoice() {
    return (
        <div>
            <Sign title="Sign Up" character="Are you signing up as...?" form={SignUpform}></Sign>
            
        </div>
    );
}

