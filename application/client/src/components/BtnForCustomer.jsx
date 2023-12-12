import React from 'react';

export default function BtnForCustomer({ onClick, className, children, disabled, type }) {
	return (
		<button className={className} onClick={onClick} disabled={disabled} type={type}>
			{children}
		</button>
	);
}
