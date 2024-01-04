import axios from "axios"
import { toastError, toastsuccess } from "../../components/toastCustom";
import { urlAPI } from "../apiAddress";

const putCart = async (id_cart, id_user, id_product ,quantity,authToken = '') => {
  // const data = await AsyncStorage.getItem('persist:root')
  console.log("OK em oi, put cart API:", id_user, id_cart,quantity,authToken);

    try {
      await axios.put(
        urlAPI + `/api/v1/cart/change-quantity/${id_cart}?quantity=${quantity}`,
        {}, 
        {
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*',
            'Authorization': `Bearer ${authToken}`
          }
        }
      );
      
       
      } catch (error) {
        // Alert.alert("Add ok san pham id: ",id_product)
        console.log("type of error.message", error.message)
        if(error.message.includes("403"))
          {
            toastError("Xin lỗi","Phiên đăng nhập hết hạn, Vui lòng đăng nhập lại")
          }

        if(error.message.includes("400")){toastError("Có lỗi đã xảy ra","Sản phẩm này không tồn tại trong shop")}
      }
}

export default putCart;