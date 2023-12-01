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

export const fetchRestaurantsProfile = async (id) =>{
	try{
		const response = await axios.get(`http://13.52.182.209/restaurants/profile/${id}`);
		return response.data;
	}catch (error) {
		console.error('Error fetching restaurants:', error);
		throw error;
	}
}
