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

import {isEqual} from 'lodash';
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
// import MaterialCommunityIcons
// {Items}
const MyCart = ({ route, navigation}, props) => {
  const {
    cartState,
    // paymentState
  } = props;
  const { id_user } = route.params
  const dispatch = useDispatch()
  const { dataCart, loadingCart, errorCart } = useSelector((state) => state.listCartReducer)

  // console.log("data Cart: ", dataCart);
  const [product, setProduct] = useState(cartState?.dataCart);
  const [total, setTotal] = useState(null);
  const [link, setlink] = useState(null)
  // const groupedProductsByBusinessWithQuantity = new Map();


  // const [transformedData, settransformedData] = useState([...groupedProductsByBusinessWithQuantity].map(([business, products]) => ({
  //   business,
  //   products,
  // }))) 

  const [groupedProducts, setGroupedProducts] = useState([]);
  const [visible, setVisible] = useState(false)
  // useEffect(() => {
  //   // console.log("i = ", i);

  //   const groupedByBusiness = {};

  //   product?.forEach(item => {
    
  //     const productDetails = {
  //       ...item.product,
  //       quantity_cart: item.quantity, // Số lượng sản phẩm trong giỏ hàng
  //       id_Cart : item.id
  //     };
      
  //     const { business, product } = item;
  //     if (!groupedByBusiness[business.id]) {
  //       groupedByBusiness[business.id] = {
  //         business,
  //         products: [productDetails],
  //       };
  //     } else {
  //       groupedByBusiness[business.id].products.push(productDetails);
  //     }

  //   });

  //   const groupedProductsArray = Object.values(groupedByBusiness);
  //   setGroupedProducts(groupedProductsArray);

  // }, []); // Chạy chỉ một lần khi component mount
  useEffect(() => {
    // Update groupedProducts whenever product changes
    // Ensure product has values before updating groupedProducts
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

  // Kết quả: mảng sản phẩm đã được nhóm theo business
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

  useEffect(() => {
    // setTriggerRerender(true);
    setTotal(getTotal(product))
  }, [product]);

  
  useEffect(() => {
    if (!isEqual(product,dataCart)){
    // console.log('dataCart in Cart:', dataCart);
    dispatch(listCartByIdUser(id_user))
    setProduct(dataCart)
    }
    // console.log('id_user in cart: ', id_user);
  }, [dataCart])

  const getTotal = (cartProducts) => {
    let totalPrice = 0;

    cartProducts?.forEach((cartItem) => {
      console.log("product in Mycart:", cartItem);
      totalPrice += cartItem?.product?.price * cartItem?.quantity
    });

    return totalPrice;
  };
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
      await Linking.openURL(getlink)
      toastsuccess("Thành công", "Thanh toán thành công");
      dispatch(listCartByIdUser(id_user))
      setProduct(dataCart)
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
            justifyContent: 'space-between',
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
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
            }}>
            Chi tiết đơn hàng
          </Text>
          <View></View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: COLOURS.black,
            fontWeight: '500',
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}>
          Đơn hàng của tôi
        </Text>
        {/* {console.log(`cartItem:`, product.map((productItem) => productItem))} */}
        {groupedProducts.map((productItem, index) => {
          console.log(`cartItem map ${index} `, productItem);
          return (
            <View key={index} style={{ margin: 10 }}>
              <View style={{
                backgroundColor: 'white',
                borderRadius: 8,
                padding: 16,
                elevation: 3,
                marginTop: 20
              }}>
                <ShopInfo business={productItem.business} />
              </View>
              {/* <View style={{ backgroundColor: '#F1F1F1', padding: 10, marginBottom: 5, flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                
                <Text style={{ fontSize: 16, color: 'black', fontStyle: 'italic' }}>{(String(productItem.businessId)).toUpperCase()}</Text>
                <Icon name="angle-right" size={30} onPress={() => {}} />
              </View> */}
              <View style={{ paddingBottom: 20, marginBottom: 45, minHeight:150, borderRadius: 5, borderColor: 'gray', borderWidth: 2 }} nestedScrollEnabled={true}>
                {/* {console.log('productItem: ', productItem.productSet[0].size.product)} */}
                {/* {console.log('eachItem in prodductItem',productItem)} */}
                {productItem.products ? productItem.products.map((eachproductItem, eachindex) => {
                  return <RenderProducts data={eachproductItem} product_all ={groupedProducts} />;
                }) : null}
              </View>
             </View>
           );
         })}
         {/* <View style={{margin:10}}>
          <View style={{backgroundColor:'#F1F1F1', padding:10, marginBottom:5, flexDirection:'row',display: 'flex',justifyContent: 'space-between'}}>
            <Text style={{fontSize:16, color:'black'}}>Tên cừa hàng</Text>
            <Icon name="angle-right" size={30} onPress={() => {  }} />
          </View> 
        <ScrollView style={{padding: 8,marginBottom:45, height: 280, borderRadius:5, borderColor:'gray',  borderWidth:2}} nestedScrollEnabled={true}>
        {product ? product.map((productItem, index) => renderProducts(productItem, index)) : null}

        </ScrollView> 

         <ScrollView style={{padding: 8, marginBottom:45, height: 280,  borderRadius:5, borderColor:'gray',  borderWidth:2}} nestedScrollEnabled={true}>
        {product ? product.map((productItem, index) => renderProducts(productItem, index)) : null} 

         </ScrollView>

        </View>  */}
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
                {formatMoneyVND(total/20)}
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
                {formatMoneyVND(total *1.05)}
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
            Thanh toán ({formatMoneyVND(total *1.05)} )
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
