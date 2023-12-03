import axios from 'axios';
/**
 * This is a function for fetching data about create new menu
 * It will post new menu data
 * @returns An array that holds multiple objects
 */
export async function createNewMenu({ name, originalPrice, price, restaurantId,desc,img}) {
	try {
		const response = await axios.post(`http://13.52.182.209/restaurants/menu/add`, {
			name,
			originalPrice,
			price,
			restaurantId,
            desc,
            img,
		});
		return response.data;
	} catch (error) {
		console.error('Error creating new menu:', error);
		throw error;
	}}


export const addToCart = async ({ menuId, customerId, restaurantId, quantity }) => {
	try {
		const response = await axios.post(`http://13.52.182.209/customers/order/cart/add`, {
			menuId,
			customerId,
			restaurantId,
			quantity,
		});
		return response.data;
	} catch (error) {
		console.error('Error creating new menu:', error);
		throw error;
	}
};

export const editLeftoverFoodQuantity = async ({ restaurantId, menuId, quantity }) => {
	try {
		const response = await axios.post(`http://13.52.182.209/restaurants/menu/setqauntity`, {
			restaurantId,
			menuId,
			quantity,
		});
		return response.data;
	} catch (error) {
		console.error('Error creating new menu:', error);
		throw error;
	}
};

export const editMenuItem = async({menuId, quantity, name, price, originalPrice, desc}) =>{
	try{
		const response = await axios.post('http://13.52.182.209/restaurants/menu/edit', {
			menuId,
			quantity,
			name,
			price,
			originalPrice,
			desc,
		});
		return response.data;
	}catch(error){
		console.error('Error edit menu', error);
		throw error;
	}
}