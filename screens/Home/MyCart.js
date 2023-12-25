import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  ToastAndroid,
  Alert,
  Modal,
  Button,
} from 'react-native';
// import InAppBrowser from 'react-native-inappbrowser-reborn';

import { isEqual } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {COLOURS, Items} from '../database/Database';
// {Items}
// {MaterialCommunityIcons}
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from './Database';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect, useDispatch, useSelector } from 'react-redux';
import { listCartByIdUser } from '../../redux/reducers/Cart/listCartReducer';
import { formatMoneyVND } from '../../utilies/validation';
import ShopInfo from '../Business/ShopInfo';
import getDetailProduct, { fetchProductbyId } from '../../redux/reducers/productReducer/getDetailProduct';
import { fetchCategories } from '../../redux/reducers/Caregory/getAllCategories';
import RenderProducts from '../Cart/CartScreen';
import { saveBill } from '../../redux/reducers/Bill/billReducer';
import { toastError, toastsuccess } from '../../components/toastCustom';
import Loading from '../../components/loading';
import { removePaymentState, savePayment } from '../../redux/reducers/Payment/paymentReducer';
import WebView from 'react-native-webview';
import CheckBox from '@react-native-community/checkbox';
// import MaterialCommunityIcons
// {Items}
const MyCart = ({ route, navigation }, props) => {
  const {
    cartState,
    // paymentState
  } = props;

  const { id_user } = route.params
  const dispatch = useDispatch()

  const { dataCart, loadingCart, errorCart } = useSelector((state) => state.listCartReducer)

  const [product, setProduct] = useState(cartState?.dataCart);
  const [total, setTotal] = useState(0);
  const [link, setlink] = useState(null)

  const [groupedProducts, setGroupedProducts] = useState([]);
  const [visible, setVisible] = useState(false)

  const [sale, setSale] = useState({});
  const [id_buy, setID_Buy] = useState([])
  const [toggleCheckBox, setToggleCheckBox] = useState({})

  

  const getID_Buy = (key, value) => {
    if (key === "remove") {
      console.log("price of id", value);
      setTotal(total - sale[value])
      const updatedItems = id_buy.filter(item => item !== value); // Lọc ra các phần tử khác với giá trị cần loại bỏ
      setID_Buy(updatedItems);
    }
    if (key === "add") {
      
      console.log("price of id", value);
      setTotal(total + sale[value])

      setID_Buy(prev => ([...prev, value]))
    }

  }
  const handleItemBusiness = (key, value) => {
    if (key === "check") {
      value?.products?.forEach((eachProduct) => {
        if (!id_buy?.includes(eachProduct?.id_product_information)) {
          setID_Buy(prevState => [...prevState, eachProduct?.id_product_information]);
          setTotal((prevTotal) => prevTotal + sale[eachProduct?.id_product_information]);
        }
      });
    }
    if (key === "uncheck") {
      value?.products?.forEach((eachProduct) => {
        setID_Buy(prevState => prevState.filter(item => item !== eachProduct?.id_product_information));
        setTotal((prevTotal) => prevTotal - sale[eachProduct?.id_product_information]);

      });
    }

  };

  const handleSalePress = (key, value) => {
    // Xử lý giá trị từ component con ở đây
    setSale(prevDictionary => ({
      ...prevDictionary,
      [key]: value,
    }));
  };
  // useEffect(() => {
  useEffect(() => {
    if (product && product.length > 0) {
      const groupedByBusiness = {};

      product.forEach((item) => {
        const productDetails = {
          ...item.product,
          quantity_cart: item.quantity,
          id_Cart: item.id,
        };

        const { business } = item;
        if (!groupedByBusiness[business.id]) {
          groupedByBusiness[business.id] = {
            business,
            products: [productDetails],
          };
        } else {
          groupedByBusiness[business.id].products.push(productDetails);
        }
      });

      const groupedProductsArray = Object.values(groupedByBusiness);
      setGroupedProducts(groupedProductsArray);
    }
  }, [product]);

  console.log("data cart:", groupedProducts);


  const updateCartAPI = useCallback(async () => {
    // Gọi API hoặc dispatch action để cập nhật giỏ hàng trước khi rời khỏi màn hình
    try {
      // Gọi API cập nhật giỏ hàng với product và id_user
      dispatch(listCartByIdUser(id_user)).then(() => {
        // After the cart data is updated, setProduct can be called
        setProduct(dataCart);
      });
      // Ví dụ: dispatch(updateCartAction(id_user, product));
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  }, [id_user]);



  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      // Hủy bỏ sự kiện trước khi rời khỏi màn hình để tránh chuyển đi không cần thiết
      e.preventDefault();
      // Gọi hàm updateCartAPI để cập nhật giỏ hàng trước khi rời khỏi màn hình
      updateCartAPI().then(() => {
        navigation.dispatch(e.data.action);
      });
    });

    return () => {
      // Hủy bỏ sự kiện listener khi không cần thiết nữa
      navigation.removeListener('beforeRemove');
    };
  }, [navigation, updateCartAPI]);

  // useEffect(() => {
  //   // setTriggerRerender(true);
  //   setTotal(getTotal(product))
  // }, [id_buy]);
  useEffect(()=>{
    groupedProducts?.map((eachproductItem)=>{
      setToggleCheckBox({
      [eachproductItem?.business?.id]: false
      })
    })
  },[])

  useEffect(() => {
    if (!isEqual(product, dataCart)) {
      // console.log('dataCart in Cart:', dataCart);
      dispatch(listCartByIdUser(id_user))
      setProduct(dataCart)
    }
    // console.log('id_user in cart: ', id_user);
  }, [dataCart, product])

  // const getTotal = (cartProducts) => {
  //   let totalPrice = 0;

  //   cartProducts?.forEach((cartItem) => {
  //     console.log("product in Mycart:", cartProducts);
  //     totalPrice += cartItem?.product?.price * cartItem?.quantity * (1 - sale[cartItem?.product?.id_product_information]/100)
  //   });

  //   return totalPrice;
  // };
  //remove data from Cart


  //checkout

  //   const openBrowser = async () => {
  //   const url = dataMOMO;
  //   const supported = await Linking.canOpenURL(url);

  //   if (supported) {
  //     await Linking.openURL(url);
  //   } else {
  //     console.error('Cannot open URL');
  //   }
  // };

  // const openLinkInWebView = () => setVisible(true)
  const checkOut = async () => {
    try {
      const getlink = await dispatch(savePayment(id_user));
      console.log("Momo Link previous:", getlink);
      setlink(getlink)
      await Linking.openURL(getlink).then(() => {
        navigation.navigate("Start")
        toastsuccess("Thành công", "Thanh toán thành công");
        dispatch(listCartByIdUser(id_user))
        setProduct(dataCart)
      })
    } catch (error) {
      toastError("Xin lỗi", "Đã có lỗi xảy ra với máy chủ");
      return error;
    }
    setVisible(true);
  };


  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
      }}>
      {/* <Modal
          visible={visible}
          presentationStyle={'pageSheet'}
          animationType={'slide'}
          onRequestClose={()=>setVisible(false)}
          >
            <WebView source ={{uri: link}}/>
            </Modal> */}
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 16,
            paddingHorizontal: 16,
            // justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundDark,
                padding: 12,
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 18,
              color: COLOURS.blue,
              fontWeight: '600',
            }}>
            Giỏ hàng
          </Text>
          <View></View>
        </View>

        {/* {console.log(`cartItem:`, product.map((productItem) => productItem))} */}
        {groupedProducts.map((productItem, index) => {
          console.log(`cartItem map ${index} `, productItem);
          
          return (
            <View key={index} style={{ margin: 10 }}>
              <View style={{
                backgroundColor: 'white',
                borderRadius: 8,
                flexDirection: 'row',
                flex: 10,
                padding: 12,
                // marginBottom: 5,
                elevation: 3,
                marginTop: 20,
                paddingStart: 0,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CheckBox
                  style={{ flex: 1 }}
                  disabled={false}
                  value={toggleCheckBox[productItem?.business?.id]}
                  onValueChange={(newValue) => {
                    if (newValue) {
                      handleItemBusiness("check", productItem)
                      const currentState = { ...toggleCheckBox };
                    currentState[productItem?.business?.id] = newValue
                    console.log("checkbox",  productItem?.business?.id + " \t"+toggleCheckBox[productItem?.business?.id]);
                    setToggleCheckBox(currentState)
                      //   onHandleGetID("check",buss?.id)
                    }
                    else {
                      handleItemBusiness("uncheck", productItem)
                      const currentState = { ...toggleCheckBox };
                    currentState[productItem?.business?.id] = newValue
                    console.log("checkbox " , productItem?.business?.id + " \t"+ toggleCheckBox[productItem?.business?.id]);
                    setToggleCheckBox(currentState)
                      //   onHandleGetID("uncheck",buss?.id)
                    }
                    
                    
                  }} />
                <View style={{ flex: 9 }}>
                  <ShopInfo business={productItem.business} inCart={true} />

                </View>
              </View>

              <View style={{ paddingBottom: 20, marginBottom: 45, minHeight: 150, borderRadius: 5, borderColor: 'gray', borderWidth: 2 }} nestedScrollEnabled={true}>
                {/* {console.log('productItem: ', productItem.productSet[0].size.product)} */}
                {/* {console.log('eachItem in prodductItem',productItem)} */}
                {productItem.products ? productItem.products.map((eachproductItem, eachindex) => {
                  return <RenderProducts data={eachproductItem} onHandleSale={handleSalePress} id_buy={id_buy} onHandleGetID={getID_Buy} />;
                }) : null}
              </View>
            </View>
          );
        })}

        <View>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 20,
              }}>
              Địa chỉ giao hàng
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    color: COLOURS.blue,
                    backgroundColor: COLOURS.backgroundLight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 12,
                    borderRadius: 10,
                    marginRight: 18,
                  }}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    style={{
                      fontSize: 18,
                      color: COLOURS.blue,
                    }}
                  />
                </View>
                <View>
                  <Text
                    onPress={() => { console.log("data Sale test in Cart", id_buy[1]) }}
                    style={{
                      fontSize: 14,
                      color: COLOURS.black,
                      fontWeight: '500',
                    }}>
                    Địa chỉ của bạn
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOURS.black,
                      fontWeight: '400',
                      lineHeight: 20,
                      opacity: 0.5,
                    }}>
                    Vui lòng thêm địa chỉ giao hàng trước khi thanh toán!
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{ fontSize: 22, color: COLOURS.black }}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 20,
              }}>
              Phương thức thanh toán
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    color: COLOURS.blue,
                    backgroundColor: COLOURS.backgroundLight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 12,
                    borderRadius: 10,
                    marginRight: 18,
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '900',
                      color: COLOURS.blue,
                      letterSpacing: 1,
                    }}>
                    MOMO
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLOURS.black,
                      fontWeight: '500',
                    }}>
                    QR MOMO
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOURS.black,
                      fontWeight: '400',
                      lineHeight: 20,
                      opacity: 0.5,
                    }}>
                    ****-0497
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{ fontSize: 22, color: COLOURS.black }}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 40,
              marginBottom: 80,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 20,
              }}>
              Thông tin đơn hàng
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: COLOURS.black,
                  opacity: 0.5,
                }}>
                Giá đơn hàng
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: COLOURS.black,
                  opacity: 0.8,
                }}>
                {formatMoneyVND(total)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 22,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: COLOURS.black,
                  opacity: 0.5,
                }}>
                Phí giao hàng
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: COLOURS.black,
                  opacity: 0.8,
                }}>
                {formatMoneyVND(total / 20)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: COLOURS.black,
                  opacity: 0.5,
                }}>
                Tổng
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: COLOURS.black,
                }}>
                {formatMoneyVND(total * 1.05)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <OpenURLButton url={'https://google.com'} > Mở trang web</OpenURLButton> */}
        <TouchableOpacity
          onPress={() => (total != 0 ? checkOut() : null)}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: 'uppercase',
            }}>
            Thanh toán ({formatMoneyVND(total * 1.05)} )
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const mapStateToProps = (state) => ({
  cartState: state.listCartReducer,
  // paymentState: state.savePaymentReducer
})

export default connect(mapStateToProps)(MyCart);
