import axios from "axios";

const getProduct = async (page, pageSize, sort, desc) => {
    try {
        const response = await axios.get('https://project-pbl6-production.up.railway.app/api/v1/product', {
            params: {
                page: page,
                page_size: pageSize,
                sort: sort,
                desc: desc
            },
        });
        return response.data.content;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};

export default getProduct;
