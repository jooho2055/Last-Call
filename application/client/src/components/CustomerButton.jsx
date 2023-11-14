import React from 'react';

export default function CustomerButton({ onClick, className, children }) {
	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
}
