import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, Image, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize, images } from '../../constants/index';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchProductbyId, resetProductDetail } from '../../redux/reducers/productReducer/getDetailProduct';

import { findMainImage, formatMoneyVND } from '../../utilies/validation';
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
import { fetchUserByUserName } from '../../redux/reducers/User/userInfor';
import LoadingModal from '../../components/loading';
import { ImageItem } from '../../components/ImageItem';
import { SliderBox } from "react-native-image-slider-box";
const SPACING = 8;
export
    const CELL_WIDTH = 400 * 0.64;
const CELL_HEIGHT = CELL_WIDTH * 1.4;

const DetailProduct = ({ navigation, route }) => {
    const { item } = route.params;

    const { data, loading, error } = useSelector((state) => state.productDetail);
    const { data: dataUser, loading: loadingUser, error: errorUser } = useSelector((state) => state.userData)
    const { data: dataCommentss, isLoading: loadingComment, error: errorComment } = useSelector((state) => state.getCommentReducer)
    const [dataComment, setDataComment] = useState(dataCommentss)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [product, setProduct] = useState()
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // State để lưu chỉ số ảnh hiện tại

    const [imageUrls, setImageURLs] =  useState()

    const onImageChange = (index) => {
        setCurrentImageIndex(index); // Cập nhật chỉ số ảnh hiện tại khi chuyển đổi ảnh
    };
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

    const convertToStars = (like, dislike) => {
        const totalVotes = like + dislike;
        const percentage = (like / totalVotes) * 100;
        console.log("% like", like);
        console.log("% dislike", dislike);

        console.log("% percent", percentage);

        if (totalVotes === 0) {
            return "☆☆☆☆☆";
        } else if (percentage < 20) {
            return "⭐☆☆☆☆"; // 1 sao
        } else if (percentage < 40) {
            return "⭐⭐☆☆☆"; // 2 sao
        } else if (percentage < 60) {
            return "⭐⭐⭐☆☆"; // 3 sao
        } else if (percentage < 80) {
            return "⭐⭐⭐⭐☆"; // 4 sao
        } else {
            return "⭐⭐⭐⭐⭐"; // 5 sao
        }
    }


    // }, [userName]);
    console.log("id: ", item?.id)
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchProductbyId(item?.id));
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        };

        fetchData();

        // return () => {
        //     dispatch(resetProductDetail());
        // };
    }, [item])
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getCommentByIDProducInfor(item?.id, 0))
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
        const handleComment = async () => {
            await dispatch(fetchUserCommentByID(product?.business?.id))
            dataCommentss?.content?.map(async (eachItem) => {
                console.log("id user comment: ", eachItem?.id_user);
                await dispatch(fetchUserCommentByID(eachItem?.id_user))
            })
        }
        handleComment()

    }, [dataCommentss])

    useEffect(() => {


        if (data[item?.id] && data[item?.id].imageSet) {
            // Tạo một bản sao của product
            const updatedProduct = { ...JSON.parse(JSON.stringify(data[item?.id])) };
            // Sắp xếp lại mảng imageSet theo id
            updatedProduct.imageSet.sort((a, b) => a.id - b.id);
            // Cập nhật state product với mảng imageSet đã sắp xếp
            setProduct(updatedProduct);
            setImageURLs(updatedProduct?.imageSet?.map(item => item.url) || [])
        }

        // setProduct(data[item?.id])
        let total_quantity = 0
        data[item?.id]?.productSet?.map((eachProduct) => {
            total_quantity += eachProduct?.quantity
        })
        setTotalQuantity(total_quantity)
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
        dataUser?.id ? navigation.navigate('ModalBuyProduct', { product: product, id_user: dataUser?.id })
            : (
                toastError("Bạn chưa đăng nhập", "Xin vui lòng đăng nhập"),
                navigation.navigate("Login")
            )
        console.log("id_information: ", product?.id)
    }
    // Xử
    if (loading) {
        return <LoadingModal />;
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

                {/* {product?.imageSet?.length > 0 ?

                    images !== null ?
                        <Image source={{ uri: images }} style={styles.image} /> :
                        <Image source={{ uri: findMainImage(product?.imageSet) }} style={styles.image} />
                    : <Text style={{ color: 'black' }}>No images</Text>} */}
                <View style={styles.imageListContainer}>
                    {product?.imageSet &&
                        <SliderBox
                            images={imageUrls}
                            dotStyle={{ display: 'none' }}
                            firstItem={findMainImage(imageUrls)}
                            currentImageEmitter={index => onImageChange(index)}
                            imageLoadingColor="black"
                            resizeMode="contain"
                        />

                        //  <ScrollView horizontal={true} removeClippedSubviews={true}>
                        //     {product?.imageSet?.map((eachIMG, index) =>
                        //     {
                        //         return (<TouchableOpacity
                        //         index={index}
                        //             style={{ borderRadius: 8, borderColor: 'black', borderWidth: 1, marginStart: 5 }}
                        //             onPress={() => {
                        //                 console.log("Product:", product);
                        //                 setImages(eachIMG?.url)
                        //             }}>
                        //             <Image style={{
                        //                 resizeMode:'stretch',
                        //                 width: 190,
                        //                 height: 80,
                        //                 borderRadius: 8,
                        //             }} source={{ uri: eachIMG?.url }} />
                        //         </TouchableOpacity>)
                        //     })}
                        //     </ScrollView>
                    }
                    <View style={{alignItems:'flex-end',justifyContent:'center', marginRight:10}}>
                        <Text style={{ color: 'black', fontSize:16 }}>{`${currentImageIndex + 1}/${imageUrls?.length}`}</Text>

                    </View>
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
                            console.log("sale in detailProduct,", convertToStars(product?.number_like, product?.number_dislike));
                        }}>

                            <View style={{ flexDirection: 'row' }}><Text style={styles.priceSale}>{formatMoneyVND(product?.price_min)}</Text>
                                <View>
                                    {sale?.discount > 0 && (
                                        <Text style={styles.discountPrice}>
                                            Giảm {sale?.discount}%
                                        </Text>
                                    )}
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{
                                    color: 'red',
                                    fontSize: 24,
                                    fontWeight: 500,
                                    marginHorizontal: 10,
                                    //marginVertical: 2,
                                    alignItems: 'flex-start'
                                }}>{formatMoneyVND(priceAfterSale(product?.price_min, sale?.discount))}</Text>

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{
                                    marginHorizontal: 10,

                                }}>{convertToStars(product?.number_like, product?.number_dislike)}</Text>

                                <Text style={{
                                    color: 'red',
                                    fontSize: 14,
                                    marginHorizontal: 10,
                                    alignItems: 'flex-start'
                                }}>{"Số lượng " + totalQuantity}</Text>
                                <Text style={{
                                    color: 'red',
                                    fontSize: 14,
                                    marginHorizontal: 10,
                                    alignItems: 'flex-start'
                                }}>{"Đã bán " + product?.number_buy}</Text>
                            </View>

                        </TouchableOpacity>
                        : <View>
                            <Text style={styles.priceNotSale}>{formatMoneyVND(product?.price_min)}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{
                                    marginHorizontal: 10,

                                }}>{convertToStars(product?.number_like, product?.number_dislike)}</Text>

                                <Text style={{
                                    color: 'red',
                                    fontSize: 14,
                                    marginHorizontal: 10,
                                    alignItems: 'flex-start'
                                }}>{"Số lượng " + totalQuantity}</Text>
                                <Text style={{
                                    color: 'red',
                                    fontSize: 14,
                                    marginHorizontal: 10,
                                    alignItems: 'flex-start'
                                }}>{"Đã bán " + product?.number_buy}</Text>


                            </View>
                        </View>}



                </View>
                <View style={{
                    backgroundColor: 'white',
                    // borderRadius: 8,
                    // borderWidth:1,
                    borderColor: 'gray',
                    padding: 16,
                    elevation: 3,
                    marginTop: 5,
                }}>
                    <ShopInfo business={product?.business} />
                </View>
                <View style={{
                    backgroundColor: 'white',
                    padding: 16,
                    elevation: 3,
                    marginTop: 5,
                    // borderWidth:1
                }}>

                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 500, marginHorizontal: 10 }}>
                        Mô tả:
                    </Text>
                    <Text style={{
                        color: 'black',
                        fontSize: 18,
                        marginHorizontal: 10,
                        marginVertical: 2,
                        alignItems: 'flex-start'
                    }}>{product?.detail || "Thông tin chi tiết của sản phẩm\n Sản phẩm của  " + product?.business?.name}</Text>
                </View>

                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    padding: 16,
                    elevation: 3,
                    marginTop: 5,
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 18,
                        marginHorizontal: 10,
                        marginVertical: 2,
                        alignItems: 'flex-start',
                        fontWeight: 500
                    }}>Bình luận:</Text>
                    <View style={styles.containerComment}>
                        {dataComment?.content?.map((eachItem, index) => (
                            <CommentItem
                                key={index}
                                avatar={"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" || null}
                                name={"Nguyễn Văn Tú" || null}
                                rating={eachItem?.is_like}
                                category="Size"
                                content={eachItem?.content}
                                listImg={eachItem?.imageSet}
                                id={eachItem?.id_user}
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
                    <Text style={{ color: 'white' }}>Thêm vào giỏ hàng </Text>
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
        flexDirection: 'column'

    },
    thumbnailImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'stretch',
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