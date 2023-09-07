import React from 'react';
import { Link } from 'react-router-dom';

export default function NameButton({ name }) {
	return (
		<Link to={`/AboutUs/${name}`} className='name-button'>
			{name}
		</Link>
	);
}
