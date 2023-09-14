import '../App.css';

export default function Familar() {
	return (
		<div className='familiar__container'>
			<h3 className='unfamiliar__header'> Unfamilar Software Technology</h3>

			<table className='unfamiliar__table'>
				<tr className='unfamiliar__title'>
					<th>Software Technologies</th>
					<th>Average Familiar Scale (1-5)</th>
				</tr>
				<tr>
					<th>AWS:</th>
					<th>1.5</th>
				</tr>
				<tr>
					<th>JavaScript:</th>
					<th>3</th>
				</tr>
				<tr>
					<th>React:</th>
					<th>1.5</th>
				</tr>
				<tr>
					<th>MYSQL:</th>
					<th>1.6</th>
				</tr>
				<tr>
					<th>Nginx:</th>
					<th>1</th>
				</tr>
				<tr>
					<th>Express</th>
					<th>2</th>
				</tr>
			</table>
		</div>
	);
}
