import React from 'react';

export default function FormInput(props) {
	const { label, errorMessage, onChange, id, isValid, ...inputProps } = props;

	return (
		<div className='flex flex-col'>
			<label htmlFor={id} className='pl-1'>
				{label}
			</label>
			<input
				id={id}
				{...inputProps}
				onChange={onChange}
				className='border border-gray-400 rounded-lg p-2 mt-1 mb-1 ml-0 mr-0'
			/>
			{!isValid && <span className='text-sm p-[0.15rem] text-red-600 '>{errorMessage}</span>}
		</div>
	);
}
