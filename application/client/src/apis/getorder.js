import axios from "axios"
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