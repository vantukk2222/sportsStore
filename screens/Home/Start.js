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
import Loading from "../../components/loading";
import { useNavigation } from '@react-navigation/native';
import ProductList from '../Product/ProductList';
import { asyncStorage } from '../../utilies/asyncStorage';

import { fetchCategories } from '../../redux/reducers/Caregory/getAllCategories';
//import DataTableCell from 'react-native-paper/lib/typescript/components/DataTable/DataTableCell';
import ListCategory from '../Category/ListCategory';
// <<<<<<< categoryDat
import { SafeAreaView } from 'react-native-safe-area-context';
// =======
import { fetchUserByUserName } from '../../redux/reducers/User/userInfor';
import { formatMoneyVND } from '../../utilies/validation';
import { logout } from '../../redux/reducers/Login/signinReducer';
import { listCartByIdUser, listCartByUserName } from '../../redux/reducers/Cart/listCartReducer';
import FlatListHori from '../Product/FlatListHori';
// import { fetchUserByID } from '../../redux/reducers/User/userInfor';
// >>>>>>> NewD


const Start = () => {
    // const { navigation, route } = props
    // const { navigate, goBack } = navigation
    // const userName = route.params
    // Alert.alert("username: ", userName)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // const [userName, setUserName] = useState('')

    const { data, loading, error } = useSelector((state) => state.product);
    const { authToken, userName, isLoading, error: errorLogin } = useSelector((state) => state.login)
    const { data: dataUser, loading: loadingUser, error: errorUser } = useSelector((state) => state.userData)
    // const {dataUsre, loading}
    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState('id');
    const [desc, setDesc] = useState(false);

    const { dataCate, loadingCate, errorCate } = useSelector((state) => state.categories);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        try {
            dispatch(fetchUserByUserName(userName))
            dispatch(fetchCategories());
        } catch (error) {
            dispatch(logout())
        }
    }, []);


    // useEffect(()=>{
    //     console.log("Data User in Start: ", dataUser.id);
    // },[])


    useEffect(() => {
        setCategories(dataCate);
        // console.log("cate in start:", categories);
    }, [dataCate])

    const clearAuthToken = async () => {
        await asyncStorage.removeAuthToken("authToken")
        console.log("auth token cleared");
    };


    const handleGoDetail = (item) => {
        // asyncStorage.removeAuthToken()
        navigation.navigate('DetailProduct', {
            item: item,
            id_user: dataUser.id,
        });
    };
    const handleGoList = () => {
        navigation.navigate('ProductList');
    };


    useEffect(() => {
        try { dispatch(fetchProducts(page, pageSize, sort, desc)); }
        catch (error) {
            dispatch(logout())
        }
    }, [page, pageSize, sort, desc]);


    useEffect(() => {
        try {
            setProducts(data.content);
        } catch (error) {
            dispatch(logout())

        }
    }, [data]);

    const findMainImage = (Listimg) => {
        for (let i = 0; i < Listimg.length; i++) {
            if (Listimg[i].is_main === true) {
                //console.log(images[i].url)
                var img = Listimg[i].url
                //  setImages(im)
                return Listimg[i].url;
            }
        }
        return Listimg.length > 0 ? Listimg[0].url : null;
    }
    const renderCatetory = ({ item }) => {
        { console.log(item) }
        <View style={{
            width: 80,
            height: 80,
            margin: 10,
            backgroundColor: 'lightblue',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: 'black'
        }}>

            <Text style={{ color: 'black' }}>{item.name}</Text>
        </View>
    }


    const renderProductEvent = ({ item }) => {
        <View style={styles.sales}>
            {/* <Image source={require('../../assets/lays.png')} /> */}
            <View style={styles.categoryBox}>
                <Text style={{ color: '#16162E', fontSize: 10 }}>item.name</Text>
            </View>
        </View>
    }
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Text style={{ color: 'red' }}>Error: {error}</Text>;
    }

    return (
        // <<<<<<< categoryDat
        <ScrollView>
            <SafeAreaView style={{ backgroundColor: colors.trangXam, flex: 100 }}>
                <StatusBar backgroundColor={colors.trangXam} />
                <Header />

                {/* <View style={styles.searchContainer}>
                    <TextInput style={styles.input}
                        placeholder="Search Product"
                        // placeholderTextColor="gray"
                        underlineColorAndroid={colors.alert}
                    // =======
                    //         <ScrollView style={{ backgroundColor: colors.accent, flex: 100 }}>
                    //             <StatusBar backgroundColor={colors.trangXam} />
                    //             <Header />
                    //             <View style={styles.line}></View>
                    //             <View style={styles.searchContainer}>
                    //                 <TextInput style={styles.input}
                    //                     placeholder="Search Product"
                    //                     // placeholderTextColor="gray"
                    //                     underlineColorAndroid={colors.alert}
                    //                     // onChangeText={}
                    //                 />
                    //                 <View style={styles.filter}>
                    //                     <Icon
                    //                         style={{ color: 'white', textAlign: 'center' }}
                    //                         name="search"
                    //                         size={25}
                    //                         onPress={()=>{dispatch(listCartByIdUser(47))}}
                    // >>>>>>> NewD
                    />
                    <View style={styles.filter}>
                        <Icon
                            style={{ color: 'white', textAlign: 'center' }}
                            name="search"
                            size={25}
                        />
                    </View>
                </View> */}
                {/* Category */}
                <View style={styles.categoriesContainer}>
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            paddingRight: 18,
                            paddingLeft: 18,
                            marginTop: 10,
                        }}>
                    </View>
                    <ListCategory />
                </View>

                {/* Sale */}
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/images/banner4.jpg')}
                        style={styles.backgroundImage}
                    />
                    <View style={styles.contentContainer}>
                        {/* <Text style={styles.text}>Events</Text> */}
                        <Text style={styles.textSmall}>Giảm giá lên đến 50%</Text>
                        {/* TouchableOpacity */}
                        <TouchableOpacity style={styles.touchableOpacity}>
                            <Text style={styles.buttonText}>Mua ngay!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Danh sach san pham sale */}
                <FlatListHori />
                {/* Danh sach san pham */}
                {/* Go product */}
                <View style={styles.container}>

                    {/* Hình ảnh */}
                    <Image
                        source={require('../../assets/images/banner1.jpg')}
                        style={styles.backgroundImage} />
                </View>
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
                    <Text style={{ color: '#16162E', fontSize: 18, fontWeight: 'bold' }}>
                        Popular product
                    </Text>
                    <TouchableOpacity
                        onPress={() => handleGoList()}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            color: '#F33A63', fontSize: 18, fontWeight: 'bold'
                        }}>More</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.categories}>

                    <View
                        style={{
                            backgroundColor: 'white'
                        }}>
                        <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: colors.facebook }}>
                            {products.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => handleGoDetail(item)}
                                    style={{ width: '50%', paddingHorizontal: 5, marginBottom: 10 }}>
                                    <ProductItem
                                        imageSource={findMainImage(item?.imageSet)}
                                        productName={item.name}
                                        productPrice={item.price_min}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                    </View>
                </View>
            </SafeAreaView>
        </ScrollView >
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
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.denNhe,
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
