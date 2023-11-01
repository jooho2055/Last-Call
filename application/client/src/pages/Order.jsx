import React,{useEffect, useState} from 'react';
import HistoryOrderItem from '../components/Order/HistoryOrderItem';
import CurrentOrderItem from '../components/Order/currentOrderItem';
import { useSelector } from 'react-redux';

export default function Order() {
	const [currentorderlist, setCurrentorder]=useState([]);
	const [pastorderlist, setPastorder] = useState([]);
	const customerId = useSelector((state)=>state.user.userId);
	useEffect(()=>{
		fetchcurrentorder(customerId);
		fetchpastorder(customerId);
	},[])
	const fetchcurrentorder=(customerId)=>{
		fetch(`http://13.52.182.209/customers/order/current/${customerId}`,{
			method: 'GET',
		})
		.then((res)=>res.json())
		.then((data)=>setCurrentorder(data))
		.then((error)=>console.error('Error', error));
	}
	const fetchpastorder=(customerId)=>{
		fetch(`http://13.52.182.209/customers//order/past/${customerId}`,{
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
				{currentorderlist.map((input) => (
					<CurrentOrderItem currentorderInfo={input}/>
				))}
			</div>
			<br />
			<hr className='border-t-4 border-solid border-blue-500 w-full' />
			<br />
			<h3>Order History</h3>
			<div className='grid sm:grid-cols-1 md:grid-cols-1 grid-cols-2 gap-9'>
				{pastorderlist.map((input) => (
					<HistoryOrderItem historyOrderInfo={input}/>
				))}
			</div>
		</div>
	);
}
