import axios from "axios";
import { urlAPI } from "../apiAddress";

const getAllBillUser = async (id_user) => {

    console.log("user ID in BillUser API:", id_user);
    try {
        const response = await axios.get(urlAPI+'/api/v1/bill/get-by-id-user/'+id_user)
        // console.log("Data list cart API: ", response.data)
        return response.data;    
    } catch (error) {
        console.error('Error getting bill by  id user: ', error);
        throw error;
    }
};

export default getAllBillUser;
