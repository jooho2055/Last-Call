import React from 'react';

import profile from '../../images/profiles/Gwangwoo_Profile.jpeg';

export default function AboutMeJooho() {
	return (
		<div className='aboutme__container2'>
			<h1 className='aboutme__jooho'>Hello, my name is Gwangwoo</h1>
			<p className='aboutme__major'>Major: Computer Science, Senior </p>
			<p className='aboutme__role'>Role: Back-end Master</p>

			<div className='aboutme__middle'>
				<div className='aboutme__skills'>
					<p className='aboutme__skill'>Skills: HTML, CSS, JavaScript, Java, Python, React</p>
				</div>
				<img className='aboutme__avatar' src={profile} alt="Gwangwoo's profile" />
			</div>

			<p className='aboutme__main'>
				I'm currently living in San Francisco. As an undergraduate student at San Francisco State
				University I am eager to learn from experienced professionals in the industry and apply my
				skills to real-world challenges. I am a quick learner, an effective communicator, and a
				collaborative team player, and I believe that my attention to detail and ability to work
				under pressure make me a strong fit for the role.
			</p>
		</div>
	);
}
