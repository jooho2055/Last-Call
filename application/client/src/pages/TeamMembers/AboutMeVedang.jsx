import React from 'react';
import myImage from '../../images/profiles/Vedang_profile.jpg';

export default function AboutMeVedang() {
	return (
		<div className="about-me">
			<h1>Vedang Sakxena</h1>
			<p>
				A Graduate Student at SFSU, currently enrolled in Electrical and Computer Engineering.
				In this team, my role is of the Scrum Master.
				My hobbies include reading, writing and travelling. I also like to play sports like Cricket, football & basketball. 
			</p>
			<img
				className='vedang-avatar'
				src={myImage}
				width={300} 
				height={300}
				alt="vedang's profile"
			/>
		</div>

	);
}

