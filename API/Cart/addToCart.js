import axios from "axios"
import { asyncStorage } from "../../utilies/asyncStorage";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toastsuccess } from "../../components/toastCustom";

const addToCart = async (id_user, id_Size,quantity,authToken = '') => {
  // const data = await AsyncStorage.getItem('persist:root')
  console.log("OK em oi, add to cart API:", id_user, id_Size,quantity,authToken);
    try {
        await axios.post('https://project-pbl6-production.up.railway.app/api/v1/cart/save', {
          id_user: id_user,
          id_size: id_Size,
            quantity: quantity,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*',
            'Authorization': `Bearer ${authToken}`
          }
        });
        // Alert.alert("Add ok san pham id: ",id_Size)
        // toastsuccess('Thành công', `Bạn vừa thêm ${quantity} sản phẩn này vào giỏ hàng`)
      } catch (error) {
        // Alert.alert("Add ok san pham id: ",id_product)
        Alert.alert("error add to cart ",error.message)
      }
}

export default addToCart;