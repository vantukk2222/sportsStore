import axios from "axios";

import axiosInstance from "../axiosConfig";

const searchProduct = async (name, state) => {
    var authToken = await asyncStorage.getAuthToken();
    try {
        const response = await axiosInstance.get('product/search', {
            params: {
                name: name,
                state: state
            },
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('call API search ');
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        console.log(error.response);
        throw error;
    }
};

export default searchProduct;
