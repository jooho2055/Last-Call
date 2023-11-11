import React, { useState } from 'react';

export default function FormInput(props) {
	const { label, errorMessage, onChange, id, name, isValid, ...inputProps } = props;
	const [hasFocusLeft, setHasFocusLeft] = useState(false);

	const handleBlur = (e) => {
		setHasFocusLeft(true);
	};

	const handleFocus = (e) => {
		setHasFocusLeft(false);
	};
	return (
		<div className='flex flex-col'>
			<label htmlFor={id} className='pl-1'>
				{label}
			</label>
			<input
				id={id}
				name={name}
				{...inputProps}
				onChange={onChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				aria-invalid={!isValid}
				className='border border-gray-400 rounded-lg p-2 mt-1 mb-1 ml-0 mr-0'
			/>
			{hasFocusLeft && !isValid && (
				<span className='text-sm p-[0.15rem] text-red-600 '>{errorMessage}</span>
			)}
		</div>
	);
}
