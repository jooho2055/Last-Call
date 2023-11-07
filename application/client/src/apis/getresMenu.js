import axios from 'axios';

export const getMenuTable = async (id) =>{
    try{
    const response = await axios.get(`http://13.52.182.209/restaurants/menu/list/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current order:', error);
    throw error;
  }
  }

  export function createNewMenu({ name, originalPrice, price, restautrantId }) {
    return axios
    .post("http://13.52.182.209/restaurants/menu/add",{
          name,
          originalPrice,
          price,
          restautrantId,
    })
    .then(res=>res.data)
  }  