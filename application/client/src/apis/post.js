import axios from 'axios';
 /**
 * This is a function for fetching data about create new menu 
 * It will post new menu data
 * @returns An array that holds multiple objects
 */
 export async function createNewMenu({ name, orignalPrice, price, restautrantId }) {
    try {
      const response = await axios.post(`http://13.52.182.209/restaurants/menu/add`, {
        name,
        orignalPrice, 
        price, 
        restautrantId,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating new menu:', error);
      throw error;
    }
  }

  export async function Delete({restaurantId, menuId}){
    console.log("deteling");
    try {
    const res = await axios.delete(`http://13.52.182.209/restaurants/menu/delete`, {
        restaurantId,
        menuId,
      });
    console.log('Delete Response:', res.data); 
    return res.data;
  } catch (error) {
    console.error('Error deleting menu:', error);
    throw error;
  }
  }