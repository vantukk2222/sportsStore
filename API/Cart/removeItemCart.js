import axios from "axios"
import { asyncStorage } from "../../utilies/asyncStorage";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toastsuccess } from "../../components/toastCustom";
import { urlAPI } from "../apiAddress";

const removeItemCart = async (id_cart, authToken) => {
  // const data = await AsyncStorage.getItem('persist:root')
  console.log("OK em oi, remove cart API:", id_cart, authToken);
    try {
        await axios.delete(urlAPI+`/api/v1/cart/delete/${id_cart}`,{
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*',
            'Authorization': `Bearer ${authToken}`
          }
        });
        // Alert.alert("Xoa san pham id: ",id_cart)
      } catch (error) {
        // Alert.alert("Add ok san pham id: ",id_product)
        Alert.alert("error remove item cart ",error.message)
      }
}

export default removeItemCart;