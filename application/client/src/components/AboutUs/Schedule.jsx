import "../../App.css";

export default function Schedule(){
    return(

<table className="meetingSchedule">
<caption>Meeting Weekly Schedule</caption>

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
    )
}