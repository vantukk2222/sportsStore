import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    FlatList,
    TextInput,
    Image,
    Alert,
} from 'react-native';
import Header from '../../components/Header'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize, images } from '../../constants/index';

import ProductItem from '../Product/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productReducer/product';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProductList from '../Product/ProductList';
import { asyncStorage } from '../../utilies/asyncStorage';

import { fetchCategories } from '../../redux/reducers/Caregory/getAllCategories';
//import DataTableCell from 'react-native-paper/lib/typescript/components/DataTable/DataTableCell';
import ListCategory from '../Category/ListCategory';
// <<<<<<< categoryDat
import { SafeAreaView } from 'react-native-safe-area-context';
// =======
import { fetchUserByUserName } from '../../redux/reducers/User/userInfor';
import { findMainImage, formatMoneyVND } from '../../utilies/validation';
import { logout } from '../../redux/reducers/Login/signinReducer';
import { listCartByIdUser, listCartByUserName } from '../../redux/reducers/Cart/listCartReducer';
import FlatListSale from '../Sale/FlatListSale';
import { toastError } from '../../components/toastCustom';
import LoadingModal from '../../components/loading';
import { SliderBox } from "react-native-image-slider-box";

// import { fetchUserByID } from '../../redux/reducers/User/userInfor';
// >>>>>>> NewD



const Start = () => {

    // const { navigation, route } = props
    // const { navigate, goBack } = navigation
    // const userName = route.params
    // Alert.alert("username: ", userName)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('')

    const { data, loading, error } = useSelector((state) => state.product);
    const { authToken, userName:UNAME, isLoading, error: errorLogin } = useSelector((state) => state.login)
    const { data: dataUser, loading: loadingUser, error: errorUser } = useSelector((state) => state.userData)
    // const {dataUsre, loading}
    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState('name');
    const [desc, setDesc] = useState(false);

    const { dataCate, loadingCate, errorCate } = useSelector((state) => state.categories);
    const [categories, setCategories] = useState([])

    // useEffect(() => {
    //     setUserName(UNAME)
    //     const dispatchGet = async () => {
    //         await dispatch(fetchUserByUserName(userName))
    //         await dispatch(fetchCategories());
    //     }
    //     if (userName) {
    //         try {
    //             dispatchGet()
    //         } catch (error) {
    //             // dispatch(logout())
    //         }
    //     }
    // }, [userName]);
    useEffect(() => {
        if (userName) {
            try {
                dispatch(fetchUserByUserName(userName))
                dispatch(fetchCategories());
            } catch (error) {
                // dispatch(logout())
            }
        }
    }, [userName]);
    // useFocusEffect(
    //     React.useCallback(() => {
    //         // Đoạn code bạn muốn thực hiện khi màn hình Start được focus
    //         // Ví dụ: load lại dữ liệu, hoặc thực hiện các tác vụ cần thiết
    //         // Ví dụ:
    //         dispatch(fetchProducts(page, pageSize, sort, desc));
    //     }, [])
    // );

    // useEffect(()=>{
    //     console.log("Data User in Start: ", dataUser.id);
    // },[])


    useEffect(() => {
        setCategories(dataCate);
        // console.log("cate in start:", categories);
    }, [dataCate])


    const handleGoDetail = (item) => {
        console.log("item data in Start:", item);
        // asyncStorage.removeAuthToken()
        navigation.navigate('DetailProduct', {
            item: item,
            // id_user: dataUser?.id,
        });
    };

    const handleGoList = () => {
        navigation.navigate('Product');
    };


    // useEffect(() => {
    //     const dispatchGet = async () => {
    //         await dispatch(fetchProducts(page, pageSize, sort, desc));
    //     }

    //     try {
    //         dispatchGet()
    //     }
    //     catch (error) {
    //         // dispatch(logout())
    //     }
    // }, [page, pageSize, sort, desc]);
    useEffect(() => {
        try { dispatch(fetchProducts(page, pageSize, sort, desc)); }
        catch (error) {
            // dispatch(logout())
        }
    }, [page, pageSize, sort, desc]);


    useEffect(() => {
        try {
            setProducts(data.content);
        } catch (error) {
            // dispatch(logout())

        }
    }, [data]);



    if (loading) {
        return <LoadingModal />;
    }

    if (error) {
        toastError("Xin lỗi", "Đã có lỗi xảy ra với kết nối")
        return <LoadingModal />;
    }
    const imagePaths = [
        require('../../assets/images/banner1.jpg'),
        require('../../assets/images/banner2.jpg'),
        require('../../assets/images/banner3.jpeg'),
        require('../../assets/images/banner4.jpg'),
        require('../../assets/images/banner5.jpeg'),
        require('../../assets/images/banner6.jpeg'),
        require('../../assets/images/banner7.jpeg'),

        // Thêm các đường dẫn tới các ảnh khác trong thư mục tương tự ở đây
    ];

    return (
        // <<<<<<< categoryDat
        // <ScrollView>
        <SafeAreaView style={{ backgroundColor: colors.trangXam, flex: 100 }}>
            <StatusBar backgroundColor={colors.trangXam} />
            <Header />
            <ScrollView>

                {/* Categories */}
                <View style={styles.categoriesContainer}>

                    <ListCategory />
                </View>


                {/* Sale */}

                <SliderBox
                    images={imagePaths}
                    ImageComponent={Image}
                    ImageComponentStyle={{
                        resizeMode: 'stretch', // or 'stretch' or 'contain'
                        width: '90%',
                        height: 500,
                        borderRadius: 8,
                    }}
                    dotColor="red"
                    inactiveDotColor="black"
                    dotStyle={{ height: 10, width: 10, borderRadius: 50 }}
                    imageLoadingColor="black"
                    resizeMode="stretch"
                    autoplay={true}
                    circleLoop={true}
                />

                {/* Danh sach san pham sale */}
                <FlatListSale />


                {/* Danh sach san pham */}
                {/* Go product */}
                {/* <View style={styles.container}>

                    <Image
                        source={require('../../assets/images/banner1.jpg')}
                        style={styles.backgroundImage} />
                </View> */}
                <View
                    style={{
                        backgroundColor: "#FCFCFC",
                        borderRadius: 20,
                        marginTop: 35,
                        borderColor: 'gray',
                        borderWidth: 0.4
                    }}>
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            paddingRight: 18,
                            paddingLeft: 18,
                            marginTop: 10,
                        }}>
                        {/* // <<<<<<< categoryDat */}
                        <Text style={{
                            color: 'black',
                            fontSize: 30,
                            fontWeight: '700'
                        }}>Sản phẩm
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                handleGoList()
                                // console.log("token in start: ", authToken)

                                // console.log("DataUser:", dataUser?.id);
                            }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text style={{
                                color: '#F33A63', fontSize: 18, fontWeight: 'bold'
                            }}>Xem</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categories}>

                        <View
                            style={{
                                backgroundColor: 'white'
                            }}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "#FCFCFC" }}>
                                {products?.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() => handleGoDetail(item)}
                                        style={{ width: '50%', paddingHorizontal: 5, marginBottom: 10 }}>
                                        <ProductItem
                                            imageSource={findMainImage(item?.imageSet)}
                                            productName={item.name}
                                            productPrice={item.price_min}
                                            sale={item?.sale}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>

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

            </View>
        </SafeAreaView>
        // {/* </ScrollView > */}
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 550,
        // marginTop: 15,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        margin: 20,
    },
    text: {
        color: colors.accent,
        marginBottom: 5,
        fontSize: 45,
        fontWeight: '700',
    },
    textSmall: {
        fontSize: 26,
        color: colors.denNhe,
        fontWeight: '600',
    },
    touchableOpacity: {
        backgroundColor: colors.google,
        padding: 20,
        borderRadius: 20,
        borderColor: 'yellow',
        borderWidth: 1

    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '450',
    },
    buttonText2: {
        color: 'white',
        fontSize: 16,
    },
    containerProduct: {
        flex: 1,
        height: 800
    },
    headerContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 10,
    },
    location: {
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    searchContainer:
    {
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: colors.trangXam,
        marginHorizontal: 10,
        borderRadius: 8,
        borderBlockColor: 'black',
        borderWidth: 1,

    },
    line: {
        height: 1,
        backgroundColor: colors.accent,
    },
    input: {
        paddingTop: 10,
        width: 300,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        //backgroundColor: '#fff',
        color: colors.trangXam,//'#424242',
        borderRadius: 15,
        backgroundColor: colors.disable,
        // placeholder: 'gray',
        fontSize: 15
    },
    filter: {
        backgroundColor: colors.alert,
        padding: 10,
        textAlign: 'center',
        borderRadius: 5,
        elevation: 5,
        borderRadius: 25
    },

    categoriesContainer: {
        display: 'flex',
        backgroundColor: colors.trangXam,
        marginVertical: 5,
        borderRadius: 1,
        borderWidth: 0.5,
        borderColor: 'black',
        //height: 300
    },
    categoriesList: {
        marginVertical: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: 'red'

    },
    categories: {
        display: 'flex',
        justifyContent: 'space-evenly',
        backgroundColor: colors.facebook,
        marginTop: 15,
        // borderRadius: 8,
        // borderWidth: 1,
        // borderColor: colors.denNhe,
        flex: 20,

    },
    slider: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: colors.trangXam,
        marginHorizontal: 0,
        borderRadius: 8,
        marginTop: 2,
        marginBottom: 5
    },
    salesSlider: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: colors.trangXam,
        marginRight: 5,
        borderRadius: 8
    },
    sales: {
        height: 100,
        width: 80,
        backgroundColor: '#FFFFFF',
        borderColor: '#efefef',
        borderWidth: 1,
        borderRadius: 7,
        borderColor: colors.google,
        padding: 10,
        margin: 10,
    },
    label: {
        backgroundColor: '#FF4646',
        width: 78,
        marginTop: -13,
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9,
        marginLeft: -10,
    },
    heartIcon: {
        marginTop: 10,
    },
    categoryBox: {
        height: 74,
        width: 69,
        padding: 7,
        //display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        margin: 5,
        elevation: 1,
        borderRadius: 3,
    },
    tabs: {
        padding: 15,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    tabFont: {
        fontSize: 14,
        color: colors.disable
    },
    tabFontNew: {
        fontSize: 14,
        color: '#63B974',
        fontWeight: 'bold',
        borderBottomColor: '#63B974',
        borderBottomWidth: 2,
    },

    productCard: {
        height: 230,
        width: 166,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        borderRadius: 5,
    },
});

export default Start;
