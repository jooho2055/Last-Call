import axios from 'axios';
/**
 * This is a function for fetching data about create new menu
 * It will post new menu data
 * @returns An array that holds multiple objects
 */
export async function createNewMenu({ name, originalPrice, price, restaurantId }) {
	try {
		const response = await axios.post(`http://13.52.182.209/restaurants/menu/add`, {
			name,
			originalPrice,
			price,
			restaurantId,
		});
		return response.data;
	} catch (error) {
		console.error('Error creating new menu:', error);
		throw error;
	}
}

// export const addToCart = async () => {
// 	try {
// 		console.log('fetching');
// 		const response = await axios.get(
// 			`http://13.52.182.209/restaurants/menu/list/${restaurantId}`
// 		);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching restaurants:', error);
// 		throw error;
// 	}
// };
