import React from 'react';

export default function BtnForRegister({ className, children, disabled }) {
	return (
		<button className={className} disabled={disabled}>
			{children}
		</button>
	);
}
