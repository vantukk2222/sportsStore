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
import { ChooseOptionModal } from '../../components/modalMethodPayment';
import { asyncStorage } from '../../utilies/asyncStorage';
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
  const { data: dataUser, loading: loadingUser, error: errorUser } = useSelector((state) => state.userData)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('QR MOMO');

  const [product, setProduct] = useState(cartState?.dataCart);
  const [total, setTotal] = useState(0);
  const [link, setlink] = useState(null)

  const [groupedProducts, setGroupedProducts] = useState([]);
  const [visible, setVisible] = useState(false)

  const [sale, setSale] = useState({});
  const [id_buy, setID_Buy] = useState([])
  const [toggleCheckBox, setToggleCheckBox] = useState({})
  const [list_business_id_product, setlist_business_id_product] = useState({})

  const getID_Buy = (key, value) => {
    if (key === "remove") {
      // console.log("price of id", value);
      setTotal(total - sale[value])
      const updatedItems = id_buy.filter(item => item !== value); // Lọc ra các phần tử khác với giá trị cần loại bỏ
      setID_Buy(updatedItems);
    }
    if (key === "add") {
      // console.log("price of id", value);
      setTotal(total + sale[value])

      setID_Buy(prev => ([...prev, value]))
    }

  }
  const handleItemBusiness = (key, value) => {
    if (key === "check") {
      value?.products?.forEach((eachProduct) => {
        if (!id_buy?.includes(eachProduct?.id)) {
          // setID_Buy(prevState => [...prevState, eachProduct?.id]);
          setTotal((prevTotal) => prevTotal + sale[eachProduct?.id]);
        }
      });
    }
    if (key === "uncheck") {
      value?.products?.forEach((eachProduct) => {
        // setID_Buy(prevState => prevState.filter(item => item !== eachProduct?.id));
        setTotal((prevTotal) => prevTotal - sale[eachProduct?.id]);
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

      // const uniqueProductInfoIdsByBusiness = {};

      // // Lặp qua mỗi phần tử trong data để lấy ra id_product_information không trùng lặp theo business.id
      // groupedProductsArray.forEach(({ business, products }) => {
      //   const { id: businessId } = business;

      //   // Nếu chưa có mục nào cho businessId, tạo một mảng mới
      //   if (!uniqueProductInfoIdsByBusiness[businessId]) {
      //     uniqueProductInfoIdsByBusiness[businessId] = [];
      //   }

      //   // Lặp qua mảng products và lưu trữ id_product_information không trùng lặp
      //   products.forEach(({ id }) => {
      //     // Nếu id_product_information chưa được lưu trữ, thêm vào mảng tương ứng với businessId
      //     if (!uniqueProductInfoIdsByBusiness[businessId].includes(id)) {
      //       uniqueProductInfoIdsByBusiness[businessId].push(id);
      //     }
      //   });

      //   // Sắp xếp mảng id_product_information tương ứng với businessId
      //   uniqueProductInfoIdsByBusiness[businessId].sort();
      // });

      // console.log("uniqueProductInfoIdsByBusiness", uniqueProductInfoIdsByBusiness);

      // setlist_business_id_product(uniqueProductInfoIdsByBusiness)

      //   const list_each_business_product = { ...list_business_id_product }
      // groupedProductsArray?.map((item) => {
      //   const list_Id_products = []
      //   item?.products?.map((eachProducts) => {
      //     const productId = eachProducts?.id;
      //     if (!list_each_business_product[item?.business?.id]?.includes(productId)) {
      //       list_Id_products.push(productId);
      //     }
      //   })
      //   list_each_business_product[item?.business?.id] = list_Id_products
      //   // console.log("products",item.products)
      // })
      // setlist_business_id_product((prelist) => ({ ...prelist, list_each_business_product }))
      setGroupedProducts(groupedProductsArray);
    }
  }, [product]);

  useEffect(()=>{

    const getProductInfoByBusinessId = (dataCart) => {
      const result = {};

      // Lặp qua từng item trong data để lấy thông tin cần thiết
      dataCart.forEach((item) => {
        const businessId = item.business.id;
        const productInfoId = item.product.id;

        // Nếu businessId chưa tồn tại trong result thì tạo một mảng mới
        if (!result[businessId]) {
          result[businessId] = [];
        }

        // Thêm id_product_information vào mảng tương ứng với businessId
        result[businessId].push(productInfoId);
      });

      return result;
    };
    const productInfoByBusinessId = getProductInfoByBusinessId(dataCart);
    setlist_business_id_product(productInfoByBusinessId)
  },[dataCart])
  // console.log("data cart:", groupedProducts);

  const getidCart = (id_product_information_list) => {
    // Tìm các đối tượng có id_product_information trùng khớp với danh sách id
    const filteredItems = dataCart?.filter(item =>
      id_product_information_list?.includes(item?.product?.id)
    );

    // Lấy ra các id cấp độ cao hơn (id của products và business)
    const ids = filteredItems?.map(item => item?.id);

    return ids;

  }
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

  useEffect(() => {
    // console.log("\n\nID buy", id_buy + "\n\n");
    // console.log("\n\nID buss", groupedProducts[0]?.business?.id + "\n\n");

    // console.log("List id buy",JSON.stringify(list_business_id_product.list_each_business_product[groupedProducts[0]?.business?.id]))

    const currentState = { ...toggleCheckBox };
    // 
    groupedProducts?.map((eachproductItem) => {
      const isBInA = list_business_id_product[eachproductItem?.business?.id].every((value) => id_buy.includes(value));

      currentState[eachproductItem?.business?.id] = isBInA
      // currentState[eachproductItem?.business?.id] = id_buy.includes(list_business_id_product[eachproductItem?.business?.id])
      // console.log("curen state: ", eachproductItem?.business?.id, JSON.stringify(id_buy), JSON.stringify(list_business_id_product[eachproductItem?.business?.id]));
    })
    setToggleCheckBox(currentState)

  }, [id_buy])
  
  // console.log("list toggle: ", toggleCheckBox);

  useEffect(() => {
    if (!isEqual(product, dataCart)) {
      // console.log('dataCart in Cart:', dataCart);
      dispatch(listCartByIdUser(id_user))
      setProduct(dataCart)
    }
  }, [dataCart, product])


  //   useEffect(() => {
  // //     const uniqueProductInfoIds = {};

  // // // Lặp qua mỗi phần tử trong data để lấy ra id_product_information không trùng lặp theo business.id
  // // groupedProducts.forEach(({ business, products }) => {
  // //     const { id: businessId, id_productInforeSet } = business;

  // //     // Nếu chưa có mục nào cho business.id, tạo một mục mới trong đối tượng uniqueProductInfoIds
  // //     if (!uniqueProductInfoIds[businessId]) {
  // //         uniqueProductInfoIds[businessId] = new Set();
  // //     }

  // //     // Thêm các id_product_information không trùng lặp vào Set tương ứng với business.id
  // //     id_productInforeSet.forEach((productId) => {
  // //         uniqueProductInfoIds[businessId].add(productId);
  // //     });
  // // });

  // // // Chuyển đổi Set thành mảng trong đối tượng uniqueProductInfoIds
  // // Object.keys(uniqueProductInfoIds).forEach((businessId) => {
  // //     uniqueProductInfoIds[businessId] = Array.from(uniqueProductInfoIds[businessId]);
  // // });

  // // console.log("uniqueProductInfoIds: ",uniqueProductInfoIds);


  //     // const list_each_business_product = { ...list_business_id_product }
  //     // groupedProducts?.map((item) => {
  //     //   const list_Id_products = []
  //     //   item?.products?.map((eachProducts) => {
  //     //     const productId = eachProducts?.id;
  //     //     if (!list_each_business_product[item?.business?.id]?.includes(productId)) {
  //     //       list_Id_products.push(productId);
  //     //     }
  //     //   })
  //     //   list_each_business_product[item?.business?.id] = list_Id_products
  //     //   // console.log("products",item.products)
  //     // })
  //     // setlist_business_id_product((prelist) => ({ ...prelist, list_each_business_product }))
  //   }, [groupedProducts])
  // const openLinkInWebView = () => setVisible(true)
  const checkOut = async () => {
    const list_id_cart = getidCart(id_buy)
    console.log("cart list id", list_id_cart);
    try {
      const method = selectedOption === "QR MOMO" ? "captureWallet" : "payWithATM"

      console.log("Method payment: ", method);
      const getlink = await dispatch(savePayment(method, list_id_cart));
      console.log("Momo Link previous:", getlink);
      setlink(getlink)
      await Linking.openURL(getlink).then(() => {
        navigation.goBack()
        toastsuccess("Thành công", "Thanh toán thành công");
        dispatch(listCartByIdUser(id_user))
        dispatch(getAllBillByIDUser(id_user))
        setProduct(dataCart)
      })
    } catch (error) {
      toastError("Xin lỗi", "Đã có lỗi xảy ra với máy chủ");
      return error;
    }
    // setVisible(true);
  };


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSelectOption = async (option) => {
    setSelectedOption(option);
    setModalVisible(false);

    // Do something with the selected option
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
          // console.log(`cartItem map ${index} `, productItem);

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
                paddingStart: 0,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CheckBox
                  style={{ flex: 1 }}
                  disabled={false}
                  value={toggleCheckBox[productItem?.business?.id]}
                  onValueChange={async (newValue) => {

                    if (newValue) {
                      await handleItemBusiness("check", productItem)
                      const currentState = { ...toggleCheckBox };
                      currentState[productItem?.business?.id] = true

                      productItem?.products?.map((eachproductItem) => {
                        console.log("ID product: ", eachproductItem?.id);
                        currentState[eachproductItem?.id] = true
                      })
                      setToggleCheckBox(currentState)
                      console.log("check", productItem?.business?.id + " \t" + toggleCheckBox[productItem?.business?.id]);

                      //   onHandleGetID("check",buss?.id)
                    }
                    else {
                      handleItemBusiness("uncheck", productItem)
                      const currentState = { ...toggleCheckBox };
                      currentState[productItem?.business?.id] = false

                      productItem?.products?.map((eachproductItem) => {
                        console.log("ID product: ", eachproductItem?.id);
                        currentState[eachproductItem?.id] = false
                      })
                      setToggleCheckBox(currentState)
                      console.log("uncheck ", productItem?.business?.id + " \t" + toggleCheckBox[productItem?.business?.id]);
                      //   onHandleGetID("uncheck",buss?.id)
                    }


                  }} />
                <View style={{ flex: 9 }}>
                  <ShopInfo business={productItem?.business} inCart={true} />

                </View>
              </View>

              <View style={{ minHeight: 150, borderRadius: 5, borderColor: 'gray', borderWidth: 1 }} nestedScrollEnabled={true}>
                {/* {console.log('productItem: ', productItem.productSet[0].size.product)} */}
                {/* {console.log('eachItem in prodductItem',productItem)} */}
                {productItem.products ? productItem.products.map((eachproductItem, eachindex) => {
                  return <View style={{ flexDirection: "row" }}>
                    <View style={{
                      width: '7%',
                      marginVertical: 6,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#D1E3F9'

                    }}>
                      <CheckBox
                        disabled={false}
                        value={toggleCheckBox[eachproductItem?.id]}
                        onValueChange={(newValue) => {
                          if (newValue) {
                            // console.log("ID ne", eachproductItem?.id);
                            getID_Buy("add", eachproductItem?.id)
                          }
                          else {
                            // console.log("ID ne", eachproductItem?.id);
                            getID_Buy("remove", eachproductItem?.id)
                          }
                          const newToggle = { ...toggleCheckBox }
                          newToggle[eachproductItem?.id] = newValue
                          setToggleCheckBox(newToggle)
                        }}></CheckBox>
                    </View>
                    <View style={{ width: '93%' }}>
                      <RenderProducts bus_ID={id_user} key={eachindex} data={eachproductItem} onHandleSale={handleSalePress} id_buy={id_buy} onHandleGetID={getID_Buy} />
                    </View>
                  </View>
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
              <TouchableOpacity
                onPress={() => {

                  
                  // console.log("data:", dataCart);
                  navigation.navigate('setInfor', {infor: dataUser })
                }}
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
                    // onPress={() => { console.log("data Sale test in Cart", list_business_id_product) }}
                    style={{
                      fontSize: 14,
                      color: COLOURS.black,
                      fontWeight: '500',
                    }}>
                    Địa chỉ của bạn
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      color: COLOURS.black,
                      fontWeight: '400',
                      lineHeight: 20,
                      opacity: 0.5,
                    }}>
                    {dataUser?.address}
                  </Text>
                </View>
              </TouchableOpacity>
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
            <TouchableOpacity
              onPress={openModal}
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
                      color: 'red',
                      letterSpacing: 1,
                    }}>
                    {selectedOption === "QR MOMO" ? "MOMO" : "ATM"}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'red',
                      fontWeight: '500',
                    }}>
                    {selectedOption}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOURS.black,
                      fontWeight: '400',
                      lineHeight: 20,
                      opacity: 0.5,
                    }}>
                    {selectedOption === "QR MOMO" ? "****-0497" : "9704 **** **** **18"}
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{ fontSize: 22, color: COLOURS.black }}
              />
            </TouchableOpacity>
            <ChooseOptionModal
              visible={modalVisible}
              onClose={closeModal}
              onSelectOption={handleSelectOption}
            />
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
                {formatMoneyVND(total > 1000000 ? total / 40 : 0)}
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
                {formatMoneyVND(total > 1000000 ? (total + total / 40) : total)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView >

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
            Thanh toán ({formatMoneyVND(total > 1000000 ? (total + total / 40) : total)} )
          </Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};


const mapStateToProps = (state) => ({
  cartState: state.listCartReducer,
  // paymentState: state.savePaymentReducer
})

export default connect(mapStateToProps)(MyCart);
