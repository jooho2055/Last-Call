import React, { useState } from 'react';

export default function FormInput(props) {
	const {
		label,
		errorMessage,
		onChange,
		id,
		isValid,
		classNameForLabel,
		classNameForInput,
		...inputProps
	} = props;
	const [hasFocusLeft, setHasFocusLeft] = useState(false);

	const handleBlur = (e) => {
		setHasFocusLeft(true);
	};

	const handleFocus = (e) => {
		setHasFocusLeft(false);
	};
	return (
		<div className='flex flex-col mb-1'>
			<label htmlFor={id} className={classNameForLabel}>
				{label}
			</label>
			<input
				id={id}
				{...inputProps}
				onChange={onChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				className={classNameForInput}
			/>
			{hasFocusLeft && !isValid && (
				<span className='w-80 text-sm pl-[0.25rem] text-red-600 '>{errorMessage}</span>
			)}
		</div>
	);
}
