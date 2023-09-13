import React from 'react';
import NameButton from '../components/NameButton';
import Familar from '../components/Familar';
//const names = ["Dorrie", "Gwangwoo", "Vedang", "Leslie", "Luis"];
export default function AboutUs() {
	return (
		<div>
		<div className='aboutUs'>
			<p>This is our About Us section</p>
			<NameButton name='Dorrie Shen' />
			<NameButton name='Leslie Mora Ponce' />
			<NameButton name='Gwangwoo Lee' />
			<NameButton name='Vedang Sakxena' />
			<NameButton name='Jooho Chang' />
			<NameButton name='Luis Acuna Mendez' />
		</div>

		<Familar />

		</div>
	);
}
