import axios from "axios";
import { urlAPI } from "../apiAddress";
import { toastError } from "../../components/toastCustom";
const putConfirmSell = async (isConfirm, listSell, authToken) => {

    //var authToken = await asyncStorage.getAuthToken();
    console.log("token API", authToken);
    try {
        const response = await axios.put(urlAPI + `/api/v1/bill/confirm-sell/${isConfirm}`, listSell, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '/',
                'Authorization': `Bearer ${authToken}`
            }
        }
        );


        console.log(' status response confirm ?', response.status);
        return response.status;
    } catch (error) {
        // console.error("error put change state", error.response);
        toastError("Lổi", "Bạn cần đăng nhập lại")
        throw error;
    }
};

export default putConfirmSell;
