import React from 'react';
import './AboutMeLeslie.css';
import backgroundImage from '../../images/profiles/About_background.jpeg'; 

export default function AboutMeLeslie() {

  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh', 
    border: '10px solid #efdfa9'
  };
  return (
    <div className="background" style={divStyle}>
      <h1> &#127800; Welcome to my Page &#127800; </h1>
      <img
        className="Leslie_profile"
        src={require('../../images/profiles/Leslie_perfil.png')}
        alt="Leslie's Profile"
     />
	<div class="flex-container">
	 <div>Hello, my name is Leslie Mora Ponce. I am front end helper
		in this project.
	 </div>


	</div>

    </div>
  ); 
}
