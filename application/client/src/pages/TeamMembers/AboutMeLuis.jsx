import React from 'react';
import myImage from '../../images/profiles/Luis_Profile.png';

export default function AboutMeLuis() {
	return (
		<div>
			<h1>Hello, I'm Luis!</h1>
			<p>
				I am currrently a student in Computer Science that is going to be graduate this fall and is
				currently woring as a Korean server while also being able to get as much experience in my
				carreer as possible. My hobbies will be from powerlifting to hiking becuase I always
				believed that a healthy mind comes from a healthy body, while also enjoy reading most of my
				free time.
			</p>
			<img src={myImage} width={300} height={300} alt="Luis's profile" />
		</div>
	);
}
