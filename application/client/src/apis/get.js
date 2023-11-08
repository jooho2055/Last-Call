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
 * This is a function for fetching data about currentorder
 * It will only show order for that customer 
 * @returns An array that holds multiple objects
 */
export const getCurrentOrder = async (id) => {
    try {
      const response = await axios.get(`http://13.52.182.209/customers/order/current/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching current order:', error);
      throw error;
    }
  };
/**
 * This is a function for fetching data about pasttorder
 * It will only show order for that customer 
 * @returns An array that holds multiple objects
 */
  export const getPastOrder = async (id) => {
    try {
      const response = await axios.get(`http://13.52.182.209/customers/order/past/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching past order:', error);
      throw error;
    }
  };

  /**
 * This is a function for fetching data about restaurant menu
 * It will only show Menu for that restaurant of that id 
 * @returns An array that holds multiple objects
 */
export const getMenuTable = async (id) =>{
    try{
    console.log('fetching');  
    const response = await axios.get(`http://13.52.182.209/restaurants/menu/list/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current order:', error);
    throw error;
  }
  }

