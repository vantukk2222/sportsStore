import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {COLOURS, Items} from '../database/Database';
// {Items}
// {MaterialCommunityIcons}
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from '../Home/Database';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { listCartByIdUser, listCartByUserName } from '../../redux/reducers/Cart/listCartReducer';
import { formatMoneyVND, isExpired } from '../../utilies/validation';
import ShopInfo from '../Business/ShopInfo';
import getDetailProduct, { fetchProductbyId } from '../../redux/reducers/productReducer/getDetailProduct';
import { fetchCategories } from '../../redux/reducers/Caregory/getAllCategories';
import { Dropdown } from 'react-native-element-dropdown';
import { removerItemCartByID } from '../../redux/reducers/Cart/removeCartReducer';
import Loading from '../../components/loading';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import { toastError, toastsuccess } from '../../components/toastCustom';
import { putCartByID } from '../../redux/reducers/Cart/putCartReducer';
const RenderProducts = ({ id_buy, data, onHandleSale, onHandleGetID, bus_ID }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  // console.log("data :", data);
  const { data: dataDetail, loading: loadingDetail, error: errorDetail } = useSelector((state) => state.productDetail)
  const { isLoading, error } = useSelector((state) => state.removeItemCartReducer)
  const [quantity_buy, setQuantity_Buy] = useState(data?.quantity_cart)
  const [total_eachProduct, setToTal_eachProduct] = useState(quantity_buy * data?.price)
  // const [toggleCheckBox, setToggleCheckBox] = useState(id_buy.includes(data?.id_product_information))

  const [total_eachProductAfterSale, setToTal_eachProductAfterSale] = useState(() => {
    if (dataDetail[data?.id_product_information]?.sale !== null) {
      return quantity_buy * data?.price * (1 - dataDetail[data?.id_product_information]?.sale?.discount / 100)
    }
    else {
      return quantity_buy * data?.price
    }
  })
  // useEffect(() => {
  //   // if(id_buy?.includes(data?.id_product_information)){onHandleGetID("add", data?.id_product_information)}
  //   // else{
  //   //   onHandleGetID("remove", data?.id_product_information)
  //   // }
  //   setToggleCheckBox(id_buy?.includes(data?.id));
  // }, [id_buy]);

  // const [informationProduct, setInformationProduct] = useState(dataDetail)
  const [isFocus, setIsFocus] = useState(false);
  // const [value, setValue] = useState(null);
  // const [sizes, setSizes] = useState([])

  const removeItemFromCart = (id_cart) => {
    // console.log("ID_Cart in CartScreen: ", id_cart);
    // dispatchAPI....
    dispatch(removerItemCartByID(id_cart)).then((ok) => {
      if (ok) {
        toastsuccess("Thành công", "Xoá sản phẩm\n" + data?.name_product_information + "")
      }
      else {
        toastError("Lỗi", "Đã xảy ra lỗi, hãy thử lại!")
      }
    })
  }

  useEffect(() => {
    // console.log("data in renderProducts",dataDetail[data?.id_product_information]);
    dispatch(fetchProductbyId(data?.id_product_information))

    // setInformationProduct({...informationProduct, dataDetail})
  }, [data])

  useEffect(() => {
    const productIdInfo = data?.id_product_information;

    // Check if the sale information for the product exists and is not null
    const hasSaleInfo = productIdInfo && dataDetail[productIdInfo]?.sale !== null && !isExpired(dataDetail[productIdInfo]?.sale?.ended_at);

    // Determine the value based on whether sale information exists
    const valueToPass = hasSaleInfo ? quantity_buy * data?.price * (1 - dataDetail[productIdInfo]?.sale?.discount / 100) : quantity_buy * data?.price;

    // Call onHandleSale with the determined value
    onHandleSale(data?.id, valueToPass);
    // if(id_buy?.includes(data?.id_product_information)){onHandleGetID("add", data?.id_product_information)}
    // else{
    //   onHandleGetID("remove", data?.id_product_information)
    // }
  }, []);
  // console.log('data render cartItem:', data.imageSet[0]?.url);
  useEffect(() => {
    setToTal_eachProduct(quantity_buy * data?.price)
    setToTal_eachProductAfterSale(() => {
      if (dataDetail[data?.id_product_information]?.sale !== null) {
        return quantity_buy * data?.price * (1 - dataDetail[data?.id_product_information]?.sale?.discount / 100)
      }
      else {
        return quantity_buy * data?.price
      }
    })
    // setTotal(getTotal(product))

  }, [quantity_buy])
  // if(isLoading) return (<Loading></Loading>)
  // console.log("ID_BUY in renderProducts", id_buy);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("data detail product", dataDetail[data?.id_product_information]);
        navigation.navigate('DetailProduct', { item: dataDetail[data?.id_product_information] }),
          // id_user: dataUser?.id,


          console.log("detail product in renderProducts in cart:", dataDetail[data.id_product_information]?.sale?.discount);

      }}
      key={data?.id_cart}
      // onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}
      style={{
        width: '100%',
        height: 140,
        marginVertical: 6,
        // paddingBottom: 25,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D1E3F9'
      }}>
      {/* <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => {
          if (newValue) {
            console.log("ID ne", data?.id);
            onHandleGetID("add", data?.id)
          }
          else {
            console.log("ID ne", data?.id);
            onHandleGetID("remove", data?.id)

          }
          setToggleCheckBox(newValue)
        }}
      /> */}
      <View
        style={{
          width: '30%',
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLOURS?.backgroundLight,
          borderRadius: 10,
          marginRight: 22,
          marginLeft: 5,
          // paddingBottom:5,
          // marginBottom:5
          // overflow: 'hidden', // Thêm dòng này
        }}>
        <Image
          source={{ uri: data?.image_product_information }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',

          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'space-around',
        }}>
        <View style={{}}>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 14,
              maxWidth: '100%',
              color: COLOURS.black,
              fontWeight: '600',
              letterSpacing: 1,
              paddingEnd: 3

            }}>
            {/* {1} */}
            {data?.name_product_information}
          </Text>
          {dataDetail[data?.id_product_information]?.sale ?
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  // fontStyle:''
                  textDecorationLine: 'line-through',
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                  color: 'gray'
                }}>
                {formatMoneyVND(total_eachProduct)}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                  color: 'red'
                }}>
                {formatMoneyVND(total_eachProductAfterSale)}
                {/* Giảm giá */}
              </Text>
            </View>
            :
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  // fontStyle:''
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                  color: 'red'
                }}>
                {formatMoneyVND(total_eachProduct)}
              </Text>

            </View>}
        </View>
        <Text style={{ fontSize: 12 }}>{data?.size}</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={sizes}
                                maxHeight={150}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Size' : '...'}
                                value={value}
                                
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}
                                /> */}
            <View
              style={{
                borderRadius: 100,
                marginRight: 20,
                padding: 4,
                borderWidth: 1,
                borderColor: "black",
                // opacity: 0.5,
              }}>
              <MaterialCommunityIcons
                onPress={async () => {
                  // dataDetail[data?.id_product_information]
                  quantity_buy <= 1 ? setQuantity_Buy(1) : setQuantity_Buy(quantity_buy - 1)
                  await dispatch(putCartByID(data?.id_Cart, bus_ID, data?.size, quantity_buy - 1))
                }}
                name="minus"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                }}
              />
            </View>
            <Text>
              {quantity_buy}
            </Text>
            <View
              style={{
                borderRadius: 100,
                marginLeft: 20,
                padding: 4,
                borderWidth: 1,
                borderColor: "black",
                // opacity: 0.5,
              }}>
              <MaterialCommunityIcons
                onPress={async () => {
                  // dataDetail[data?.id_product_information]
                  setQuantity_Buy(quantity_buy + 1)
                  const id_size = dataDetail[data?.id_product_information]?.productSet.find(item => item.size === data?.size).id
                  console.log("Size",id_size , "\n\n")
                  await dispatch(putCartByID(data?.id_Cart,bus_ID,id_size,quantity_buy + 1))


                }}
                name="plus"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => removeItemFromCart(data?.id_Cart)}
            style={{ paddingEnd: 4, paddingBottom: 4 }}>
            <MaterialCommunityIcons
              name="delete-outline"
              style={{
                fontSize: 16,
                color: 'red',
                backgroundColor: COLOURS.backgroundLight,
                padding: 8,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    // height: 700
  },

  dropdown: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginStart: 10,
    paddingHorizontal: 10,
    // backgroundColor:'red'
  },

  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    // backgroundColor:'red',
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    // width:'20%',
    // height
    alignItems: 'flex-end',
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 5,
  },
  addToCartButton: {
    // width:'10%',
    backgroundColor: '#2dd644',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover', // Có thể sử dụng 'contain', 'stretch', 'center',...
  },
  iconTop: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 6,
    paddingRight: 6,
  },
  header: {
    width: '100%',
    zIndex: 1,
    marginTop: 100,
  },
  categoryBox: {
    height: 74,
    width: 69,
    padding: 7,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    margin: 10,
    elevation: 1,
    borderRadius: 3,
  },
  slider: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 10,
  },
  iconBack: {
    backgroundColor: '#FFFFFF',
    padding: 3,
    elevation: 2,
    borderRadius: 5,
  },
  productInfo: {

    backgroundColor: '#F7F7F7',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 80,
    // height: '60%',
    flex: 1,
    marginBottom: 0,
    paddingBottom: 0,
  },
  manageText: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  }, nameText: {
    flex: 1
  },
  innerText: {
    // marginLeft: 30,
    // alignItems: 'flex-start',
    // flex: 0.5,
    display: 'flex',
    width: 150,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
  },
  productAbout: {
    marginTop: 8,
    paddingLeft: 8,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
  },
  cart: {
    borderColor: '#c1f4ca',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  buyNow: {
    backgroundColor: '#40AA54',
    padding: 10,
    borderRadius: 10,
  },
});


export default RenderProducts;