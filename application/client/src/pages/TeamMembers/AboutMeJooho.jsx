import React from 'react';

import profile from '../../images/profiles/Jooho_Profile.ico';

export default function AboutMeJooho() {
	return (
		<div className='aboutme__container'>
			<h1 className='aboutme__jooho'>Hello, my name is Jooho</h1>
			<p className='aboutme__major'>Major: Computer Science, Senior </p>
			<p className='aboutme__role'>Role: Front-end Master</p>

			<div className='aboutme__middle'>
				<div className='aboutme__skills'>
					<p className='aboutme__skill'>Skills: HTML, CSS, JavaScript, React</p>
				</div>
				<img className='aboutme__avatar' src={profile} alt="Jooho's profile" />
			</div>

			<p className='aboutme__main'>
				I am really excited to take Software Engineering class with outstanding team members. It is
				an honor to be able to participate in the project as a front end.
			</p>
		</div>
	);
}
