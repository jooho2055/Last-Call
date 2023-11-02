import axios from 'axios';

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
