import axios from 'axios';

export const deleteAllMenuCart = async (customerId) => {
	try {
		const response = await axios.delete(`http://13.52.182.209/customers/order/cart/delete`, {
			data: { customerId },
		});
		return response.data;
	} catch (error) {
		console.error('Error deleting menu:', error);
		throw error;
	}
};
