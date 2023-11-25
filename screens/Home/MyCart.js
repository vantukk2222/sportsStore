import React, { useState, useEffect,useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {COLOURS, Items} from '../database/Database';
// {Items}
// {MaterialCommunityIcons}
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from './Database';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { listCartByIdUser, listCartByUserName } from '../../redux/reducers/Cart/listCartReducer';
import { formatMoneyVND } from '../../utilies/validation';
// import MaterialCommunityIcons
// {Items}
const MyCart = ({ route, navigation }) => {
  const { id_user } = route.params
  const dispatch = useDispatch()
  const { dataCart, loadingCart, errorCart } = useSelector((state) => state.listCartReducer)
  const [product, setProduct] = useState(dataCart);
  const [total, setTotal] = useState(null);
  const [triggerRerender, setTriggerRerender] = useState(false);


  // useEffect(() => {
  //   // const unsubscribe = navigation.addListener('focus', () => {
  //   // getDataFromDB();
  //   // }
  //   // );
  //   // return unsubscribe;
  // });
  const updateCartAPI = useCallback(async () => {
    // Gọi API hoặc dispatch action để cập nhật giỏ hàng trước khi rời khỏi màn hình
    try {
      // Gọi API cập nhật giỏ hàng với product và id_user
      // Ví dụ: dispatch(updateCartAction(id_user, product));
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  }, [id_user, product]);

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
    dispatch(listCartByIdUser(id_user))
    // console.log('dataCart in Cart:', dataCart);
    setProduct(dataCart)
    // console.log('id_user in cart: ', id_user);
  }, [id_user])

  const getTotal = (cartProducts) => {
    let totalPrice = 0;
  
    cartProducts.forEach((cartItem) => {
      cartItem.productSet.forEach((product) => {
        totalPrice += product.size.product.price * product.quantity;
      });
    });
  
    return totalPrice;
  };
  //remove data from Cart

  const removeItemFromCart = async (id) => {
    let itemArray = [...product];
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        for (let j = 0; j < array[index].productSet.length; j++) {
          // console.log(id+'\n',array[index].productSet[j]);

          if (array[index].productSet[j].id_cart == id) {
            array[index].productSet.split(j, 1);
            console.log(array[index].productSet[j]);
            break
          }
        }
        // await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        // getDataFromDB();
      }
      // console.log('data cart', itemArray[0].productSet);
      // console.log('data cart', array[0].productSet);
      setProduct(array)
    }

    // // Tìm và xoá phần tử có id_cart tương ứng
    // let updatedProductData = product.map(item => {
    //   if (item.productSet) {
    //     item.productSet = item.productSet.filter(product => {
    //       console.log('id_cart:', product.id_cart, 'id:', id);

    //       return product.id_cart !== id;
    //     });
    //   }
    //   console.log('phan tu k trung id_cart ', item.productSet);
    //   return item;
    // });

    // setProduct([...updatedProductData]); // Cập nhật state bằng bản sao mới

  };


  //checkout


  const checkOut = async () => {
    try {
      dispatch(listCartByUserName(47))
    } catch (error) {
      return error;
    }


  };

  const renderProducts = (data, index) => {
    
    // console.log('data render cartItem:', data.size.product.imageSet[0]?.url);
    const [quantity_buy, setQuantity_Buy] = useState(data.quantity)
    const [total_eachProduct, setToTal_eachProduct] = useState(quantity_buy * data.size.product.price)
    const updateTotal = (newQuantity, productPrice) => {
      const updatedTotal = total - (data.quantity * data.size.product.price) + (newQuantity * productPrice);
      setTotal(updatedTotal);
    };
    useEffect(() => {
      setToTal_eachProduct(quantity_buy * data.size.product.price)
      // setTotal(getTotal(product))

    }, [quantity_buy])
    return (
      <TouchableOpacity
        key={data.id_cart}
        // onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}
        style={{
          width: '100%',
          height: 120,
          marginVertical: 6,
          // paddingBottom: 25,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
            // paddingBottom:5,
            // marginBottom:5
            // overflow: 'hidden', // Thêm dòng này

          }}>
          <Image
            source={{ uri: data.size.product.imageSet.find(image => image.is_main === true).url }}
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
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: COLOURS.black,
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              {data.size.product.name}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                  color: 'red'
                }}>
                {formatMoneyVND(total_eachProduct)}
              </Text>
              <Text>
                {/* {data.size.product.price + data.size.product.price / 20} */}
                Giảm giá
              </Text>
            </View>
          </View>
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
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  onPress={() => {
                    quantity_buy <= 1 ? setQuantity_Buy(1) : setQuantity_Buy(quantity_buy - 1)
                    updateTotal(quantity_buy - 1, data.size.product.price);

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
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  onPress={() => {
                    setQuantity_Buy(quantity_buy + 1)
                    updateTotal(quantity_buy +1, data.size.product.price);

                  }}
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(14)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
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

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
      }}>
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
            Order Details
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
          My Cart
        </Text>
        {/* {console.log(`cartItem:`, product.map((productItem) => productItem))} */}
        {product.map((productItem, index) => {
          // console.log(`cartItem map ${index} `, productItem);
          return (
            <View key={index} style={{ margin: 10 }}>
              <View style={{ backgroundColor: '#F1F1F1', padding: 10, marginBottom: 5, flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, color: 'black', fontStyle: 'italic' }}>{(productItem.business.name).toUpperCase()}</Text>
                <Icon name="angle-right" size={30} onPress={() => { /* handle onPress */ }} />
              </View>
              <ScrollView style={{ padding: 8, marginBottom: 45, height: 280, borderRadius: 5, borderColor: 'gray', borderWidth: 2 }} nestedScrollEnabled={true}>
                {/* {console.log('productItem: ', productItem.productSet[0].size.product)} */}
                {productItem.productSet ? productItem.productSet.map((eachproductItem, eachindex) => renderProducts(eachproductItem, eachindex)) : null}
              </ScrollView>
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

        </View> */}
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
              Delivery Location
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
                    2 Petre Melikishvili St.
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOURS.black,
                      fontWeight: '400',
                      lineHeight: 20,
                      opacity: 0.5,
                    }}>
                    0162, Tbilisi
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
              Payment Method
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
                    VISA
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLOURS.black,
                      fontWeight: '500',
                    }}>
                    Visa Classic
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOURS.black,
                      fontWeight: '400',
                      lineHeight: 20,
                      opacity: 0.5,
                    }}>
                    ****-9092
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
              Order Info
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
                Subtotal
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: COLOURS.black,
                  opacity: 0.8,
                }}>
                &#8377;{total}.00
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
                Shipping Tax
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: COLOURS.black,
                  opacity: 0.8,
                }}>
                &#8377;{total / 20}
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
                Total
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: COLOURS.black,
                }}>
                &#8377;{total + total / 20}
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
            CHECKOUT (&#8377;{total + total / 20} )
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyCart;