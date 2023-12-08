import axios from "axios";
import { Alert } from "react-native";
import { urlAPI } from "../apiAddress";

const saveBillAPI = async (name, information, total, id_user, state, bill_detailSet, authToken) => {
    try {
        const response = await axios.post(urlAPI+'/api/v1/bill/save', {
          name: name,
          information: information,
          total: total,
          id_user: id_user,
          state: state,
          bill_detailSet: bill_detailSet
        }, {
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*',
            'Authorization': `Bearer ${authToken}`
          }
        });
    
        console.log(response.data); // Log response data
      } catch (error) {
        console.error('Error:', error);
      }
};

export default saveBillAPI;
