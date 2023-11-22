import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { getProductById } from '../../API/Product';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../constants';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductbyId } from '../../redux/reducers/productReducer/getDetailProduct';
// import axios from 'axios';
const ProductDetail = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const { id, img } = route.params;
    // const [data, setData] = useState([]);
    // console.log(id);
    const { data, loading, error } = useSelector((state) => state.productDetail);
    // const fetchUser = async () => {
    //     const url = 'https://project-pbl6-production.up.railway.app/api/v1/product/'+id;
    //     const response = await axios.get(url);
    //     // console.log(response.data);
    //     setData(response)
    //   };

    const [quantity, setQuantity] = useState(0);
    const [product, setProduct] = useState(null);


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
        // console.log("data detail: ",data);
        setProduct(data);
    }, [data])
    return (
        <ScrollView style={styles.container}>
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
                    <View style={styles.innerText}>
                        <TouchableOpacity
                            onPress={() => {
                                if (quantity === 0) {
                                    setQuantity(0);
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
                            if (quantity < product?.quantity) {
                                setQuantity(quantity + 1)
                            }
                        }}>
                            <View style={styles.iconBack}>
                                <Icon name="plus" size={25} color="#70BF7F" />
                            </View>
                        </TouchableOpacity>
                    </View>
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
                    {product?.price}
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
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
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
                    <TouchableOpacity>
                        <View style={styles.buyNow}>
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
        flex: 0.5,
        display: 'flex',
        width: 150,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
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