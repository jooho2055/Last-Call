import React from 'react';
import '../../App.css';
import profile from '../../images/profiles/Dorrie_profile.jpg';

export default function AboutMeDorrie() {
	return <div>
		   <h1 className='Dorrie_title'>About Dorrie</h1>
		   <div className='D_Left_part'>
			<img className='Dorrie_img' src={profile} alt="Dorrie_profile"/>
		   </div>
		   <div className='D_Right_part'>
		   <article className='Dorrie_article'>
				<h1>Name: Dorrie Shen</h1>
				<br/>
				<p className='Dorrie_p'>Role: Github Master</p>
				<br/>
				<p>Introduction: I am CS major, and I enjoy playing games in my free time.</p>
			</article>
			</div>

	</div>;
}
