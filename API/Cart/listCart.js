import axios from "axios";
import { urlAPI } from "../apiAddress";

const getCartByIDUser = async (id_user) => {

    console.log("user ID in cartAPI:", id_user);
    try {
        const response = await axios.get(urlAPI+'/api/v1/cart/get-by-id-user/'+id_user)
        // console.log("Data list cart API: ", response.data)
        return response.data;    
    } catch (error) {
        console.error('Error getting cart by user name: ', error);
        throw error;
    }
};

export default getCartByIDUser;
