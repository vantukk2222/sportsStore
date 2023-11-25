import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { getProductById } from '../../API/Product';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../constants';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductbyId } from '../../redux/reducers/productReducer/getDetailProduct';
import { Modal } from 'react-native-paper';
import ModalPoup from '../../components/Modal';
import { formatMoneyVND } from '../../utilies/validation';
import SelectDropdown from 'react-native-select-dropdown'
import { Dropdown } from 'react-native-element-dropdown';
import { addToCartUser } from '../../redux/reducers/Cart/cartReducer';

const ProductDetail = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const { id, img, id_user } = route.params;
    // console.log(id);
    // const { productDetail, login } = useSelector((state) => state);
    // const {authToken, isLoading, error:errorLogin} = login 
    const { data, loading, error } = useSelector((state) => state.productDetail)
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [priceBuy, setpriceBuy] = useState(0)
    const [visible, setVisible] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);
    
    
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        const newData = data.sizeProductSet.map((item) => ({
          label: item.size,
          value: item.id.toString(), 
          
        }));
    
        setSizes(newData);
        setValue(newData[0].value)
      }, [data.sizeProductSet]);
    
    //  console.log("data: ", data);
    // const ref = useRef(null);
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]

    const closeModal = () => {
        setVisible(!visible);
        setpriceBuy(formatMoneyVND(product?.price * quantity))
    };
    const clearAuthToken = async () => {
        // await asyncStorage.removeAuthToken("authToken")
        console.log("auth token cleared");
    };
    useEffect(() => {
        // setTimeout(async()=>{
        //    await clearAuthToken()
        // },[100])
        // console.log("token selector in product detail:  ",authToken)
        setpriceBuy(formatMoneyVND(product?.price * quantity))
        // console.log('size addtocart(product detail): ',);
        
    }, [quantity])
    useEffect(() => {
        setQuantity(1)
    }, [visible])

    // const fetchData = async (id) => {
    //     try {
    //         const productData = await getProductById(id);
    //         setProduct(productData);
    //         console.log(product);
    //         //seturlImage(img);
    //         seturlImage({ uri: productData?.imageSet[0].url });
    //     } catch (error) {
    //         // Xử lý lỗi nếu có
    //         console.error("Error fetching product data:", error);
    //     }
    // };
    const addItemToCart = (id_u,id_s,quant) => {
        dispatch(addToCartUser(id_u,id_s,quant))
        setVisible(false)
    }
    const cleanup = () => {
        // Thực hiện công việc clean-up ở đây, chẳng hạn như đặt lại giá trị của quantity và product
        setQuantity(0);
        setProduct(null);
        //id = null;
    };

    // Cleanup function: được gọi khi màn hình unmount hoặc thay đổi màn hình (bấm nút "Back")
    const unsubscribe = navigation.addListener('beforeRemove', () => {
        cleanup();
    });
    // useEffect(() => {

    //     // React.useCallback(() => {
    //     fetchData(id);
    //     return () => {
    //         unsubscribe();
    //     }
    // }, [id]);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductbyId(id));
        }
    }, [id]);

    useEffect(() => {
        // console.log("Data product detail: ", data);
        setProduct(data);
        setpriceBuy(formatMoneyVND(data?.price))

    }, [data])

    return (
        <ScrollView style={styles.container}>
            <ModalPoup visible={visible} onClose={closeModal} >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                        <Text style={{color:'white',backgroundColor:'red', padding: 4}}>Close</Text>
                    </TouchableOpacity>
                    <View style={styles.productDetails}>
                        <Image
                            source={{ uri: product?.imgUrl }}
                            style={styles.productImage}
                            resizeMode="cover"
                        />
                        <View style={styles.details}>
                            <Text style={{ fontSize: 18, color: 'red' }}>Giá: {priceBuy}</Text>
                            <View style={styles.innerText}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (quantity <= 1) {
                                            setQuantity(1);
                                        } else {
                                            setQuantity(quantity - 1);
                                        }
                                    }}>
                                    <View style={styles.iconBack}>
                                        <Icon name="minus" size={15} color="#70BF7F" />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, color: 'black' }}>{quantity}</Text>
                                <TouchableOpacity onPress={() => {
                                    // if (quantity < product?.quantity) {
                                    setQuantity(quantity + 1)
                                    // }
                                }}>
                                    <View style={styles.iconBack}>
                                        <Icon name="plus" size={15} color="#70BF7F" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text>Size:</Text>
                            <Dropdown
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
                                />
                                {/* <SelectDropdown
                                data={countries}
                                // size={45}
                                style={{
                                    
                                }}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}
                            /> */}

                                {/* <Picker
                                selectedValue={selectedSize}
                                onValueChange={(itemValue) => setSelectedSize(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Small" value="small" />
                                <Picker.Item label="Medium" value="medium" />
                                <Picker.Item label="Large" value="large" />
                            </Picker> */}
                            
                        </View>
                    </View>
                    <TouchableOpacity style={styles.addToCartButton} onPress={()=> addItemToCart(id_user,value,quantity)}>
                        <Text style={{color: 'white'}}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </ModalPoup>
            <View>
                <View style={styles.iconTop}>
                    <View style={styles.iconBack}>
                        <Icon name="arrow-left" size={25} color='black' />
                    </View>
                    <View style={styles.iconBack}>
                        <Icon name="heart" size={25} color="#F33A63" />
                    </View>
                </View>

                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    {/* {urlImage ? (<Image style={styles.productImage} source={urlImage} />) : (<Text>Loading...</Text>)} */}
                    {/* {console.log("image: 121221   "+product?.imageSet[0].url)} */}
                    <Image
                        style={styles.image}
                        source={{
                            uri: product?.imgUrl,
                        }} // Đường dẫn tới hình ảnh
                    />
                </View>
            </View>

            <View style={styles.productInfo}>
                <View style={styles.manageText}>
                    {/* ten sp */}
                    <View style={styles.nameText}>
                        <Text style={{ fontSize: 30, color: '#16162E' }}>{product?.name}</Text>
                    </View>
                    {/* so luong */}
                    {/* <View style={styles.innerText}>
                        <TouchableOpacity
                            onPress={() => {
                                if (quantity <= 1) {
                                    setQuantity(1);
                                } else {
                                    setQuantity(quantity - 1);
                                }
                            }}>
                            <View style={styles.iconBack}>
                                <Icon name="minus" size={25} color="#70BF7F" />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: 'black' }}>{quantity}</Text>
                        <TouchableOpacity onPress={() => {
                            // if (quantity < product?.quantity) {
                            setQuantity(quantity + 1)
                            // }
                        }}>
                            <View style={styles.iconBack}>
                                <Icon name="plus" size={25} color="#70BF7F" />
                            </View>
                        </TouchableOpacity>
                    </View> */}
                </View>
                {/* can nang */}
                <Text
                    style={{
                        fontSize: 14,
                        paddingLeft: 8,
                        color: '#6A6A79',
                        marginTop: -10,
                    }}>
                    Weight : 1Kg
                </Text>
                {/* gia */}
                <Text
                    style={{
                        fontSize: 30,
                        paddingLeft: 8,
                        fontWeight: 'bold',
                        marginTop: 10,
                        color: colors.primary
                    }}>
                    {formatMoneyVND(product?.price)}
                </Text>

                {/* description */}
                <View style={styles.productAbout}>
                    <Text style={{ color: '#16162E', fontSize: 20 }}>Mô tả</Text>
                    <Text style={{ color: '#6A6A79', marginTop: 8 }}>
                        {product?.detail}
                    </Text>
                </View>
                <View style={styles.productAbout}>
                    <Text style={{ color: '#16162E', fontSize: 20 }}>Hãng </Text>
                    <Text style={{ color: colors.accent, marginTop: 8 }}>
                        {product?.brand}
                    </Text>
                </View>
                {/* san pham tuong tu */}
                {/* <View>
                    <Text
                        style={{
                            fontSize: 18,
                            paddingLeft: 8,
                            marginTop: 15,
                            fontWeight: 'bold',
                        }}>
                        Similar Product
                    </Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.slider}>
                            <View style={styles.categoryBox}>
                                <Image source={require('../../assets/tomato.png')} />
                            </View>
                        </View>
                    </ScrollView>
                </View> */}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <View style={styles.cart}>
                            <Text
                                style={{
                                    color: '#40AA54',
                                    fontSize: 18,
                                    marginLeft: 15,
                                    marginRight: 15,
                                }}>
                                Add to Cart
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Cart',{id_user: id_user})}}>
                        <View style={styles.buyNow} >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 18,
                                    marginLeft: 15,
                                    marginRight: 15,
                                    textTransform: 'uppercase',
                                }}>
                                Buy now
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
        // <View>
        //     <Text>Product Detail Screen</Text>
        //     {product ? (
        //         <View>
        //             <Text>Product ID: {product.id}</Text>
        //             <Text>Name: {product.name}</Text>
        //             {/* Hiển thị thông tin sản phẩm */}
        //         </View>
        //     ) : (
        //         <Text>Loading...</Text>
        //     )}
        // </View>
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
        marginHorizontal:20,
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

export default ProductDetail;