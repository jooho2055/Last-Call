import axios from 'axios';

/**
 * This is a function for fetching data about restaurants
 * It will only show opened restaurants
 * @returns An array that holds multiple objects
 */
export const fetchRestaurants = async () => {
	try {
		const response = await axios.get(`http://13.52.182.209/search`);
		console.log('fetching....');
		return response.data;
	} catch (error) {
		console.error('Error fetching restaurants:', error);
		throw error;
	}
};

/**
 * This is a function for fetching restaurants for a search box
 * It will show both opened and closed restaurants
 * @param search The value holds a input from a user
 * @returns An array that holds multiple objects
 */
export const fetchSearchboxRestaurants = async (search) => {
	try {
		console.log('fetching');
		const response = await axios.get(`http://13.52.182.209/search?search=${search}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching restaurants:', error);
		throw error;
	}
};

/**
 * This is a function for fetching restaurants available menu list
 * @param restaurantId The restaurantId holds a restaurant's unique id
 * @returns An array that holds multiple menu lists
 */
export const fetchRestaurantAvailableMenu = async (restaurantId) => {
	try {
		console.log('fetching');
		const response = await axios.get(
			`http://13.52.182.209/restaurants/menu/list/${restaurantId}`
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching restaurants:', error);
		throw error;
	}
};

/**
 * This is a function for fetching a restaurant information
 * @param restaurantId The restaurantId holds a restaurant's unique id
 * @returns An object that holds restaurant's information
 */
export const fetchRestaurantInfo = async (restaurantId) => {
	try {
		console.log('fetching');
		const response = await axios.get(`http://13.52.182.209/restaurants/info/${restaurantId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching restaurants:', error);
		throw error;
	}
};
