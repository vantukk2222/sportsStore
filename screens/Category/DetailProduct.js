import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, Image, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize, images } from '../../constants/index';
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../components/loading";
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchProductbyId, resetProductDetail } from '../../redux/reducers/productReducer/getDetailProduct';

import { formatMoneyVND } from '../../utilies/validation';
import ShopInfo from '../Business/ShopInfo';
import HeaderComp from '../../components/Header';
import { toastError } from '../../components/toastCustom';
import { logout } from '../../redux/reducers/Login/signinReducer';
import moment from 'moment';
import { CommentItem } from '../../components/commenComp';
import getUserByIDUser from '../../API/User/getUserByID';
import { fetchUserCommentByID } from '../../redux/reducers/Comment/user_CommentReducer';
import { store } from '../../redux/store';
import { getCommentByIDProducInfor, resetCommentProduct } from '../../redux/reducers/Comment/get_CommentByID_Product_InforReducer';
import getCommentByID from '../../API/Comments/getComment';
import { resetComment } from '../../redux/reducers/Comment/post_CommentReducer';
const SPACING = 8;
export
    const CELL_WIDTH = 400 * 0.64;
const CELL_HEIGHT = CELL_WIDTH * 1.4;

const DetailProduct = ({ navigation, route }) => {

    const { data, loading, error } = useSelector((state) => state.productDetail);
    const { authToken, userName, isLoading, error: errorLogin } = useSelector((state) => state.login)
    const { data: dataUser, loading: loadingUser, error: errorUser } = useSelector((state) => state.userData)
    const { data: dataCommentss, isLoading: loadingComment, error: errorComment } = useSelector((state) => state.getCommentReducer)
    const [dataComment, setDataComment] = useState(dataCommentss)
    const { item } = route.params;
    const [product, setProduct] = useState()

    const [images, setImages] = useState(null)
    const [sale, setSale] = useState(null)
    // console.log("id_User Detail:", id_user);

    const dispatch = useDispatch()
    const isExpired = (endDate) => {
        const currentDate = moment();
        const expirationDate = moment(endDate);
        return expirationDate.isBefore(currentDate);
    };
    const priceAfterSale = (price, discount) => {
        return (price * (1 - discount / 100))
    }
    const findMainImage = (Listimg) => {
        for (let i = 0; i < Listimg?.length; i++) {
            if (Listimg[i]?.is_main === true) {
                //console.log(images[i].url)
                var img = Listimg[i]?.url
                //  setImages(im)
                return Listimg[i]?.url;
            }
        }
        return Listimg?.length > 0 ? Listimg[0]?.url : null;
    }

    useEffect(() => {
        if (userName) {
            try {
                dispatch(fetchUserByUserName(userName))
            } catch (error) {
                // dispatch(logout())
            }
        }

    }, [userName]);
    // console.log("id: ",item?.id)
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchProductbyId(item?.id));
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        };

        fetchData();

        return () => {
            dispatch(resetProductDetail());
        };
    }, [item])
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(getCommentByIDProducInfor(item?.id, 0))
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);

            }
        }
        fetchData()

        return () => {
            dispatch(resetCommentProduct())
        }

    }, [item?.id])
    useEffect(() => {
        setDataComment(dataCommentss)
        dataComment?.content?.map( async(eachItem)=>{
            await dispatch(fetchUserCommentByID(eachItem?.id_user))
        })

    }, [dataCommentss])

    useEffect(() => {
        setProduct(data[item?.id])
        if (!isExpired(data[item?.id]?.sale?.ended_at)) {
            setSale(data[item?.id]?.sale)
        }
        else { }
        // console.log('productDetail\n', data.sale)
        return () => {
            setProduct('')
        }
    }, [data[item?.id]])
    // console.log("product", item);
    handleAddtocart = () => {
        dataUser?.id ? navigation.navigate('ModalBuyProduct', { product: product, id_user: dataUser?.id }) : toastError("Bạn chưa đăng nhập", "Xin vui lòng đăng nhập")
        console.log("id_information: ", product?.id)
    }
    // Xử
    if (loading) {
        return <Loading />;
    }
    // Assume commentData is an array containing comment objects
    // const commentData = [
    //     {
    //         avatar: dataUser?.image_url || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    //         name: dataUser?.name,
    //         rating: dataComment?.content?.is_like,
    //         category: 'Size',
    //         content: dataComment?.content?.content ,
    //         listImg: dataComment?.content?.imageSet 
    //     },
    //     // More comment objects...
    // ];

    return (
        <SafeAreaView style={{ flex: 100 }}>
            <HeaderComp init="Chi tiết" />
            <ScrollView style={styles.container} nestedScrollEnabled={true}>
                {product?.imageSet?.length > 0 ?
                    images !== null ?
                        <Image source={{ uri: images }} style={styles.image} /> :
                        <Image source={{ uri: findMainImage(product?.imageSet) }} style={styles.image} />
                    : <Text style={{ color: 'black' }}>No images</Text>}

                <View style={styles.imageListContainer}>
                    <FlatList
                        data={product?.imageSet}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{ borderRadius: 8, borderColor: 'black', borderWidth: 1, marginStart: 5 }}
                                onPress={() => {
                                    setImages(item.url)
                                }}>
                                <Image
                                    source={{ uri: item.url }}
                                    style={styles.thumbnailImage}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={styles.productContainer}>
                    <Text style={styles.name}>{product?.name}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 8 }}>
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 500 }}></Text>
                        {product?.categorySet?.length > 0 ?
                            product?.categorySet.map(eachSize => {
                                return (
                                    <View
                                        key={eachSize.name}
                                    >
                                        <Text style={styles.textCategory}>
                                            {eachSize.name}
                                        </Text>
                                    </View>
                                )
                            })
                            : <Text style={{
                                color: 'black'
                            }}>Not found</Text>
                        }
                    </View>
                    {sale && !isExpired(sale?.ended_at) ?
                        <TouchableOpacity onPress={() => {
                            console.log("sale in detailProduct,", sale?.ended_at);
                        }}>
                            <Text style={styles.priceSale}>{formatMoneyVND(product?.price_min)}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{
                                    color: 'red',
                                    fontSize: 24,
                                    fontWeight: 500,
                                    marginHorizontal: 10,
                                    //marginVertical: 2,
                                    alignItems: 'flex-start'
                                }}>{formatMoneyVND(priceAfterSale(product?.price_min, sale?.discount))}</Text>
                                <View>
                                    {sale?.discount > 0 && (
                                        <Text style={styles.discountPrice}>
                                            Giảm {sale?.discount}%
                                        </Text>
                                    )}
                                </View>
                            </View>

                        </TouchableOpacity>
                        : <Text style={styles.priceNotSale}>{formatMoneyVND(product?.price_min)}</Text>}



                </View>
                <View style={styles.detailsContainer}>
                    <ShopInfo business={product?.business} />
                </View>
                <View style={styles.detailsContainer}>

                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 500, marginHorizontal: 10 }}>
                        Mô tả:
                    </Text>
                    <Text style={{
                        color: 'black',
                        fontSize: 18,
                        marginHorizontal: 10,
                        marginVertical: 2,
                        alignItems: 'flex-start'
                    }}>{product?.detail ||"Thông tin chi tiết của sản phẩm\n Sản phẩm của  "+product?.business?.name}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={{
                        color: 'black',
                        fontSize: 18,
                        marginHorizontal: 10,
                        marginVertical: 2,
                        alignItems: 'flex-start',
                        fontWeight: 500
                    }}>Bình luận:</Text>
                    <View style={styles.containerComment}>
                        {dataComment?.content?.map((eachItem,index)=>(
                            <CommentItem
                            key = {index}
                            avatar={"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" || null}
                                    name={"Nguyễn Văn Tú" || null}
                                    rating={eachItem?.is_like}
                                    category="Size"
                                    content={eachItem?.content}
                                    listImg={eachItem?.imageSet}
                                    id = {eachItem?.id_user}
                            ></CommentItem>
                        )

                        )}
                        {/* {console.log("comment", dataComment?.content)}
                        <FlatList
                            data={dataComment?.content}
                            renderItem={({ item }) => (
                                <CommentItem
                                    avatar={"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" || null}
                                    name={"Nguyễn Văn Tú" || null}
                                    rating={item?.is_like}
                                    category="Size"
                                    content={item?.content}
                                    listImg={item?.imageSet}
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        /> */}
                    </View>
                </View>
                <View style={{
                    backgroundColor: 'white',
                    padding: 16,
                    marginTop: 20
                }}>
                    <Text style={{
                        height: 30,
                        color: 'black',
                        fontSize: 18,
                        marginHorizontal: 10,
                        marginVertical: 2,
                        alignItems: 'flex-start',
                        fontWeight: 500
                    }}></Text>
                </View>

            </ScrollView>


            {/* <Icon
                name="angle-left"
                size={35}
                color='black'
                style={{
                    padding: SPACING,
                    position: 'absolute',
                    top: 1,
                    left: 4,
                    zIndex: 2
                }}
                onPress={() => {
                    navigation.goBack();
                }}
            /> */}



            <View
                style={
                    {
                        flex: 10,
                        // padding: SPACING,
                        position: 'absolute',
                        //top: 220,
                        bottom: 0,
                        height: 70,
                        marginBottom: 15,
                        marginHorizontal: 50,
                        //  marginHorizontal: 15,
                        borderRadius: 8,
                        borderWidth: 1,
                        backgroundColor: 'white',
                        borderColor: 'black',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',

                    }
                }>
                <TouchableOpacity
                    onPress={() => { handleAddtocart() }}
                    style={{
                        borderRadius: 2,
                        borderWidth: 1,
                        borderColor: 'white',
                        backgroundColor: '#4873E0',
                        height: '100%',
                        width: '100%',
                        // marginBottom:5,
                        justifyContent: 'center', // Center vertically
                        alignItems: 'center',
                    }}>
                    <Icon name="cart-plus" size={25} color='white' />
                    <Text style={{ color: 'white' }}>Add to cart </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('Cart', {id_user: id_user})}
                    style={{
                        borderRadius: 2,
                        borderWidth: 1,
                        borderColor: 'black',
                        backgroundColor: colors.google,
                        height: '100%',
                        width: '50%',
                        justifyContent: 'center', // Center vertically
                        alignItems: 'center',
                    }}>
                    <Text style={{ alignItems: 'center', color: 'white', fontWeight: 500, fontSize: 18 }}>Buy Now </Text>
                </TouchableOpacity> */}
            </View>

        </SafeAreaView >
    );
}
export default DetailProduct;
const styles = StyleSheet.create({
    containerComment: {
        flex: 1,
        backgroundColor: '#fff',
    },
    originalPrice: {
        color: 'black',
        fontSize: 24,
        fontWeight: '500',
        marginHorizontal: 10,
    },
    discountPrice: {
        color: 'red', // You can customize the color for the discount label
        fontSize: 15, // You can adjust the font size for the discount label
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 20,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'red'
    },
    price: {
        fontSize: 14,
        opacity: 0.8,
        color: colors.vangNhat,
    },
    priceNotSale: {
        color: 'black',
        fontSize: 24,
        //fontWeight: 500,
        marginHorizontal: 10,
        alignItems: 'flex-start'
    },
    priceSale: {
        color: 'black',
        fontSize: 24,
        //fontWeight: 500,
        marginHorizontal: 10,
        textDecorationLine: 'line-through',
        alignItems: 'flex-start'
    },
    container: {
        paddingBottom: 20,
        marginTop: 5,
        paddingTop: 5,
        //height: 200,
        backgroundColor: 'white',
        //overflow: 'scroll',
        flex: 70
        // flexGrow: 1,

    }, textCategory: {
        color: 'black',
        marginRight: 4,
        borderRadius: 8,
        backgroundColor: colors.accent,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 3,
        padding: 5,
        alignItems: 'flex-start'
    },
    imageListContainer: {
        marginTop: 10,
        marginBottom: 20,

    },
    thumbnailImage: {
        width: 60,
        height: 60,
        // marginRight: 10,

        borderRadius: 8,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 16,
    },
    productContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        elevation: 3,
    },
    detailsContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        elevation: 3,
        marginTop: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: colors.facebook
    },
    price: {
        fontSize: 18,
        color: 'green',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
    },

})