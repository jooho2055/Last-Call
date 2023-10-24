import React from 'react';
import HistoryOrderItem from '../components/Order/HistoryOrderItem';
import CurrentOrderItem from '../components/Order/currentOrderItem';


//This is the inputs for testing, will be move later
const inputsForcurrenttest =[
	{
		restaurant_name: "Test",
		foods : [
			{
				name: "banana",
				price: "$2",

			},
			{
				name: "apple",
				price: "$3",

			},
		],
		price:"$5",
		date: "May, 23, 2023",
		status: "pending",
	},
	{
		restaurant_name: "Test2",
		foods : [
			{
				name: "banana",
				price: "$2",

			},
			{
				name: "apple",
				price: "$3",

			},
		],
		price:"$5",
		date: "May, 24, 2023",
		status: "pending",
	}
]


export default function Order() {
	return <div className='h-full flex flex-col justify-center items-center '>
		<h1>Order</h1>
		<h3>Current Order</h3>
		{inputsForcurrenttest.map((input)=>(
			<CurrentOrderItem 
			restaurant_name={input.restaurant_name}
			foods ={input.foods}
			date={input.date}
			price={input.price}
			status={input.status}/>
		))}
		
		<h3>Order History</h3>
		<div>

		</div>
		
	</div>;
}
