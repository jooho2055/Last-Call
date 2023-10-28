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
		<h3>Current Order</h3>
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
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
		<hr className='border-t-4 border-solid border-blue-500 w-full' />
		<br />
		<h3>Order History</h3>
		<div className='grid grid-cols-1 md:grid-cols-2 gap-9'>
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
