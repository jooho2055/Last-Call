import React,{useEffect, useState} from 'react';
import HistoryOrderItem from '../components/Order/HistoryOrderItem';
import CurrentOrderItem from '../components/Order/currentOrderItem';

//This is the inputs for testing, will be move later
const inputsForcurrenttest = [
	{
		restaurant_name: 'Test',
		address: 'test_address',
		foods: [
			{
				name: 'banana',
				quantity: '1',
				price: '2',
			},
			{
				name: 'apple',
				quantity: '1',
				price: '3',
			},
		],
		price: '$5',
		date: 'May, 23, 2023',
		time: '9 pm',
		status: 3,
		original_p: '6',
		actual_p: '5',
	},
	{
		restaurant_name: 'Test2',
		address: 'test_address2',
		foods: [
			{
				name: 'banana',
				quantity: '1',
				price: '2',
			},
			{
				name: 'apple',
				quantity: '1',
				price: '3',
			},
		],
		price: '$5',
		date: 'May, 24, 2023',
		time: '9 pm',
		status: 1,
		original_p: '6',
		actual_p: '5',
	},
	{
		restaurant_name: 'Test3',
		address: 'test_address3',
		foods: [
			{
				name: 'banana',
				quantity: '1',
				price: '2',
			},
			{
				name: 'apple',
				quantity: '1',
				price: '3',
			},
		],
		price: '5',
		date: 'May, 25, 2023',
		time: '9 pm',
		status: 0,
		original_p: '6',
		actual_p: '5',
	},
];
export default function Order() {
	const [currentorderlist, setCurrentorder]=useState([]);
	const [pastorderlist, setPastorder] = useState([]);
	useEffect(()=>{
		fetchcurrentorder();
		fetchpastorder();
	},[])
	const fetchcurrentorder=()=>{
		fetch('http://13.52.182.209/customers/order/current',{
			method: 'GET',
		})
		.then((res)=>res.json())
		.then((data)=>setCurrentorder(data))
		.then((error)=>console.error('Error', error));
	}
	const fetchpastorder=()=>{
		fetch('http://13.52.182.209/customers//order/past',{
			method: 'GET',
		})
		.then((res)=>res.json())
		.then((data)=>setPastorder(data))
		.then((error)=>console.error('Error', error));
	}
	return (
		<div className='min-h-full m-auto flex flex-col justify-center items-center bg-white gap-4'>
			<br />
			<h3>Current Order</h3>
			<div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-5 gap-4'>
				{inputsForcurrenttest.map((input) => (
					<CurrentOrderItem currentorderInfo={input}/>
				))}
			</div>
			<br />
			<hr className='border-t-4 border-solid border-blue-500 w-full' />
			<br />
			<h3>Order History</h3>
			<div className='grid sm:grid-cols-1 md:grid-cols-1 grid-cols-2 gap-9'>
				{inputsForcurrenttest.map((input) => (
					<HistoryOrderItem historyOrderInfo={input}/>
				))}
			</div>
		</div>
	);
}
