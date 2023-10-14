import React from 'react';

import profile from '../../images/profiles/Jooho_Profile.ico';

export default function AboutMeJooho() {
	return (
		<div>
			<h1>Hello, my name is Jooho</h1>
			<p>Major: Computer Science, Senior </p>
			<p>Role: Front-end Master</p>

			<div>
				<div>
					<p>Skills: HTML, CSS, JavaScript, React</p>
				</div>
				<img src={profile} alt="Jooho's profile" />
			</div>

			<p>
				I am really excited to take Software Engineering class with outstanding team members. It is
				an honor to be able to participate in the project as a front end.
			</p>
		</div>
	);
}
