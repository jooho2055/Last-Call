import React, { useState } from 'react';

export default function FormInput(props) {
	const { label, errorMessage, onChange, id, isValid, ...inputProps } = props;
	const [hasFocusLeft, setHasFocusLeft] = useState(false);

	const handleBlur = (e) => {
		setHasFocusLeft(true);
	};

	const handleFocus = (e) => {
		setHasFocusLeft(false);
	};
	return (
		<div className='flex flex-col mb-1'>
			<label htmlFor={id} className='pl-1 mb-1 text-lg'>
				{label}
			</label>
			<input
				id={id}
				{...inputProps}
				onChange={onChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				className='rounded-lg p-2 mt-1 mb-1 ml-0 mr-0 shadow-md'
			/>
			{hasFocusLeft && !isValid && (
				<span className='text-sm pl-[0.25rem] text-red-600 '>{errorMessage}</span>
			)}
		</div>
	);
}
