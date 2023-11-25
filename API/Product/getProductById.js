import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { store } from "../../redux/store";
import { logout } from "../../redux/reducers/Login/signinReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
const getProductById = async (id) => {

    //var authToken = await asyncStorage.getAuthToken();
    // console.log(authToken);
    try {
        const response = await axios.get(`https://project-pbl6-production.up.railway.app/api/v1/product/${id}`, {
            // headers: {
            //     'Authorization': `Bearer ${authToken}`,
            //     'Content-Type': 'application/json',
            // },

        });

        // console.log('call API detail product');
        return response.data;
    } catch (error) {
        store.dispatch(logout())
        console.error("error get product by id", error.response.data.message);
        throw error;
    }
};

export default getProductById;
