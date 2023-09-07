import React from 'react';
import NameButton from '../components/NameButton';

export default function AboutUs() {
	return (
		<div className='aboutUs'>
			<p>This is our About Us section</p>
			<NameButton name='Dorrie Shen' />
			<NameButton name='Leslie Mora Ponce' />
			<NameButton name='Gwangwoo Lee' />
			<NameButton name='Vedang Sakxena' />
			<NameButton name='Jooho Chang' />
			<NameButton name='Luis Acuna Mendez' />
		</div>
	);
}
