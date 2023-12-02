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

export const deleteOneMenuCart = async ({ menuId, customerId }) => {
	try {
		const response = await axios.delete(
			`http://13.52.182.209/customers/order/cart/delete/menu`,
			{
				data: { menuId, customerId }, // Use params if the body is not accepted
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error deleting menu:', error);
		throw error;
	}
};
