import React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import FormInput from '../components/FormInput';


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe('FormInput Component', () => {
    it ('renders input and label', ()=>{
        render(<FormInput
        label="Username"
        id="username"
        onChange={()=>{}}
        isValid={true}
		    classNameForLabel="label-class"
        classNameForInput="input-class"
        ></FormInput>)

        expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });
    
      

})