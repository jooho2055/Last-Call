import React from 'react';

import profile from '../../images/profiles/Dorrie_profile.jpg';

export default function AboutMeDorrie() {
	return (
		<div>
			<h1>About Dorrie</h1>
			<div>
				<img src={profile} alt='Dorrie_profile' />
			</div>
			<div>
				<article>
					<h1>Name: Dorrie Shen</h1>
					<br />
					<p>Role: Github Master</p>
					<br />
					<p>Introduction: I am CS major, and I enjoy playing games in my free time.</p>
				</article>
			</div>
		</div>
	);
}
