import axios from "axios";

const getCartByIDUser = async (id_user) => {
    try {
        const response = await axios.get('https://project-pbl6-production.up.railway.app/api/v1/cart/get-by-id-user/'+id_user)
        console.log("Data list cart API: ", response.data[0].business.name)
        return response.data;    
    } catch (error) {
        console.error('Error getting cart by user name: ', error);
        throw error;
    }
};

export default getCartByIDUser;
