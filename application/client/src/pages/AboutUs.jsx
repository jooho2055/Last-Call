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

	  <table className="meetingSchedule">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Monday</th>
      <th scope="col">Tuesday</th>
      <th scope="col">Wednesday</th>
	  <th scope="col">Thursday</th>
	  <th scope="col">Friday</th>
    </tr>       
  </thead>
  <tbody>
    <tr>
      <th scope="row"> &#9200; </th>
      <td> &#10006; </td>
      <td> 1:00PM-3:00PM </td>
      <td> &#10006; </td>
	  <td> 1:30PM-4:30PM </td>
	  <th> &#10006; </th>
    </tr>
	</tbody>
</table>

		
		</div>
        
		<Familar />

		</div>
	);
}
