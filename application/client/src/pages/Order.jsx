import React from 'react';
import HistoryOrderItem from '../components/Order/HistoryOrderItem';
import CurrentOrderItem from '../components/Order/currentOrderItem';


//This is the inputs for testing, will be move later
const inputsForcurrenttest =[
	{
		restaurant_name: "Test",
		address: "test_address",
		foods : [
			{
				name: "banana",
				quantity:"1",
				price: "$2",

			},
			{
				name: "apple",
				quantity:"1",
				price: "$3",

			},
		],
		price:"$5",
		date: "May, 23, 2023",
		time:"9 pm",
		status: "pending",
		original_p:"$6",
		actual_p:"$5",
	},
	{
		restaurant_name: "Test2",
		address: "test_address2",
		foods : [
			{
				name: "banana",
				quantity:"1",
				price: "$2",

			},
			{
				name: "apple",
				quantity:"1",
				price: "$3",

			},
		],
		price:"$5",
		date: "May, 24, 2023",
		time:"9 pm",
		status: "pending",
		original_p:"$6",
		actual_p:"$5",
	},
	{
		restaurant_name: "Test3",
		address: "test_address3",
		foods : [
			{
				name: "banana",
				quantity:"1",
				price: "$2",

			},
			{
				name: "apple",
				quantity:"1",
				price: "$3",

			},
		],
		price:"$5",
		date: "May, 25, 2023",
		time:"9 pm",
		status: "pending",
		original_p:"$6",
		actual_p:"$5",
	}
]


export default function Order() {
	return <div className='h-full w-full flex flex-col justify-center items-center bg-white gap-4'>
		<h1>Order</h1>
		<h3>Current Order</h3>
		<div className='flex flex-row border-spacing-3 gap-4'>
		{inputsForcurrenttest.map((input)=>(
			<CurrentOrderItem 
			restaurant_name={input.restaurant_name}
			address={input.address}
			foods ={input.foods}
			date={input.date}
			price={input.price}
			time={input.time}
			status={input.status}/>
		))}
		</div>
		<br />
		<h3>Order History</h3>
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			{inputsForcurrenttest.map((input)=>(
				<HistoryOrderItem
				restaurant_name={input.restaurant_name}
			    address={input.address}
			    foods ={input.foods}
			    date={input.date}
			    original_p={input.original_p}
				actual_p={input.actual_p}
			    time={input.time}/>
			))}

		</div>
		
	</div>;
}
