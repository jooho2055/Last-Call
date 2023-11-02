// import React from 'react';
// import RestaurantList from '../components/RestaurantList';

// import { useQuery } from '@tanstack/react-query';
// import { fetchRestaurants } from '../apis/get';

// export default function SearchDetail() {
// const {
// 	isLoading,
// 	error,
// 	data: restaurants,
// } = useQuery({
// 	queryKey: ['restaurants'],
// 	queryFn: fetchRestaurants,
// });
// return (
// 	<div className='grid grid-cols-3 auto-rows-[minmax(14rem,auto)] p-6 gap-6'>
// 		{restaurants.map((restaurant, index) => (
// 			<RestaurantList key={index} restaurantInfo={restaurant} /> // must use restaurant unique id as key in the future
// 		))}
// 	</div>
// );
// }

import React from 'react';

export default function SearchDetail() {
	return <div>this is search detail page.</div>;
}
