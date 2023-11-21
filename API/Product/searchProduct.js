import axios from "axios";

const searchProduct = async (name, state) => {
    try {
        const response = await axios.get('https://project-pbl6-production.up.railway.app/api/v1/product/search', {
            params: {
                name: name,
                state: state
            },
        });
        console.log('call API search ');
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};

export default searchProduct;
