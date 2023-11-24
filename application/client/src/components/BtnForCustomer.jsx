import React from 'react';

export default function BtnForCustomer({ onClick, className, children, disabled }) {
	return (
		<button className={className} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
}
