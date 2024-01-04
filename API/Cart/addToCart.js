import axios from "axios"
import { toastError, toastsuccess } from "../../components/toastCustom";
import { urlAPI } from "../apiAddress";

const addToCart = async (id_user, id_product ,quantity,authToken = '') => {
  // const data = await AsyncStorage.getItem('persist:root')
  console.log("OK em oi, add to cart API:", id_user, id_product,quantity,authToken);
    try {
        await axios.post(urlAPI+'/api/v1/cart/save', {
          id_user: id_user,
          id_product: id_product,
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
        console.log("type of error.message", typeof(error.message))
        if(error.message.includes("403"))
          {
            toastError("Xin lỗi","Phiên đăng nhập hết hạn, Vui lòng đăng nhập lại")
          }

        if(error.message.includes("400")){toastError("Có lỗi đã xảy ra","Sản phẩm này không tồn tại trong shop")}
      }
}

export default addToCart;