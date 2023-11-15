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


export async function Delete({ restaurantId, menuId }) {
  console.log('deleting');
  try {
    const res = await axios.delete(`http://13.52.182.209/restaurants/menu/delete`, {
      params: { restaurantId, menuId }, 
    });
    console.log('Delete Response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error deleting menu:', error);
    throw error;
  }
}

  export async function EditMenu ({menuId, name, desc, img, quantity, price, originalPrice}){
    console.log("Editing");
    try{
      const res = await axios.put(`http://13.52.182.209/menu/edit`,{
        menuId,
        name,
        desc: 'This is Pizza',
        img,
        quantity,
        price,
        originalPrice,
      });
      return res.data;
    }catch(error){
      console.error('Error edit menu: ', error);
      throw error;
    }
  }