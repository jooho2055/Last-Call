import React from 'react';
import NameButton from '../components/AboutUs/NameButton';
import Familar from '../components/AboutUs/Familar';
import Schedule from '../components/AboutUs/Schedule';

export default function AboutUs() {
	return (
		<div>
			<p>This is our About Us section</p>
			<div>
				<NameButton name='Dorrie Shen' />
				<NameButton name='Leslie Mora Ponce' />
				<NameButton name='Gwangwoo Lee' />
				<NameButton name='Vedang Sakxena' />
				<NameButton name='Jooho Chang' />
				<NameButton name='Luis Acuna Mendez' />
			</div>

			<Schedule />
			<Familar />
		</div>
	);
}
