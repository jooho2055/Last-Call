import axios from 'axios';

export const editQuantityInCart = async ({ cartId, quantity }) => {
	try {
		const response = await axios.put(`http://13.52.182.209/customers/order/cart/edit`, {
			cartId,
			quantity,
		});
		return response.data;
	} catch (error) {
		console.error('Error creating new menu:', error);
		throw error;
	}
};
