import axios from 'axios';
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