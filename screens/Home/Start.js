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
} from 'react-native';
import Header from '../../assets/components/Header'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize, images } from '../../constants/index';

import ProductItem from '../Product/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productReducer/product';
import Loading from "../../assets/components/loading";
import { useNavigation } from '@react-navigation/native';
import ProductList from '../Product/ProductList';
import ListCategory from '../Category/ListCategory';
import { fetchCategories } from '../../redux/reducers/Caregory/getAllCategories';



const Start = (props) => {
    // const { navigation, route } = props
    // const { navigate, goBack } = navigation
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // const token = useSelector((state) => state.login.authToken) OK
    const { data, loading, error } = useSelector((state) => state.product);
    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState('name');
    const [desc, setDesc] = useState(false);

    const { dataCate, loadingCate, errorCate } = useSelector((state) => state.categories);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        // console.log("Token Start: ", token); OK 
        dispatch(fetchCategories());
    }, []);

    useEffect(() => {
        setCategories(dataCate);

    }, [dataCate])
    //console.log(categories);
// =======
//         dispatch(fetchCategories(pageSizCate, sortCate, descCate));
//     }, [pageSizCate, sortCate, descCate]);
//     useEffect(() => {
//         setCategories(dataCate.content);
//     }, [dataCate])
//     // useEffect(()=>{
//     //    const  
//     // },[])
    const handleGoDetail = (id, img) => {
        // asyncStorage.removeAuthToken()
        navigation.navigate('ProductDetail', {
            id: id,
            img: img
        });
    };
    const handleGoList = () => {
        navigation.navigate('ProductList');
    };

    // const handleRenderCategory = categories.map((item, index) => (
    //     <View style={styles.categoryBox}>
    //         <Text key={index} style={{ color: '#16162E', fontSize: 10 }}>{item.name}</Text>
    //     </View>
    // ));




    useEffect(() => {
        dispatch(fetchProducts(page, pageSize, sort, desc));
    }, [page, pageSize, sort, desc]);

    useEffect(() => {
        
        setProducts(data.content);
    }, [data]);

    // const renderCatetory = ({ item }) => {
    //     { console.log(item) }
    //     <View style={{
    //         width: 80,
    //         height: 80,
    //         margin: 10,
    //         backgroundColor: 'lightblue',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         borderRadius: 8,
    //         borderWidth: 1,
    //         borderColor: 'black',
    //         backgroundColor: 'black'
    //     }}>

    //         <Text style={{ color: 'black' }}>{item.name}</Text>
    //     </View>
    // }


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
        <ScrollView style={{ backgroundColor: colors.accent, flex: 100 }}>
            <StatusBar backgroundColor={colors.trangXam} />
            <Header />
            <View style={styles.line}></View>
            <View style={styles.searchContainer}>
                <TextInput style={styles.input}
                    placeholder="Search Product"
                    placeholderTextColor="white"
                    underlineColorAndroid={colors.alert}
                />
                <View style={styles.filter}>
                    <Icon
                        style={{ color: 'white', textAlign: 'center' }}
                        name="search"
                        size={25}
                    />
                </View>
            </View>

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
                    {/* <Text style={{ color: '#16162E', fontSize: 18, fontWeight: 'bold' }}>
                        Menu :
                    </Text> */}
                    {/* {renderCatetory} */}
                </View>
                <ListCategory />
                {/* <View
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingRight: 18,
                        paddingLeft: 18,
                        marginTop: 10,
                    }}>
                    <Text style={{ color: '#16162E', fontSize: 18, fontWeight: 'bold' }}>
                        Categories
                    </Text>
                    <Text style={{ color: '#F33A63', fontSize: 14, fontWeight: 'bold' }}>
                        See all
                    </Text>
                </View>

                <FlatList style={styles.categoriesList}
                    data={categories}
                    renderItem={renderCatetory}
                    keyExtractor={(item) => item.id}
                    horizontal={true} /> */}
                {/* <View style={styles.categoryBox}>
                        <Text style={{ color: '#16162E', fontSize: 10 }}>Cate</Text>
                    </View> */}


                {/* <Image source={require('../../assets/Carrot.png')} /> */}
                {/* {handleRenderCategory} */}
            </View>


            {/* <View style={styles.tabs}>
                <Text style={styles.tabFont}>All</Text>
                <Text style={styles.tabFont}>Top sale</Text>
                <Text style={styles.tabFontNew}>Event</Text>
                <Text style={styles.tabFont}>Whats new </Text>
            </View> */}
            <View style={styles.categories}>
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingRight: 18,
                        paddingLeft: 18,
                        marginTop: 10,
                        marginVertical: 10
                    }}>
                    <Text style={{ color: '#16162E', fontSize: 18, fontWeight: 'bold' }}>
                        Sale : Giảm tất cả 50%
                    </Text>


                    <TouchableOpacity
                        onPress={() => handleGoList()}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            color: '#F33A63', fontSize: 14, fontWeight: 'bold'
                        }}>Buy now</Text>
                    </TouchableOpacity>
                </View>

                {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
                <View style={styles.salesSlider}>
                    <View style={styles.sales}>
                        {/* <Image source={require('../../assets/lays.png')} /> */}
                        <View style={styles.label}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>-50%</Text>
                        </View>
                    </View>
                    <View style={styles.sales}>
                        {/* <Image source={require('../../assets/canyy.png')} /> */}
                        <View style={styles.label}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>-25%</Text>
                        </View>
                    </View>
                    <View style={styles.sales}>
                        {/* <Image source={require('../../assets/tropi.png')} /> */}
                        <View style={styles.label}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>-35%</Text>
                        </View>
                    </View>
                </View>
                {/* </ScrollView> */}
            </View>


            {/* Danh sach san pham */}
            <View style={styles.categories}>
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingRight: 18,
                        paddingLeft: 18,
                        marginTop: 10,
                    }}>
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
                            color: '#F33A63', fontSize: 14, fontWeight: 'bold'
                        }}>More</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        backgroundColor: 'white'
                    }}>
                    {/* product item */}
                    <FlatList
                        style={{ flexDirection: 'row', margin: 5 }}
                        data={products}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleGoDetail(item?.id, item.imageSet[0]?.url)}>
                                < ProductItem
                                    imageSource={item?.imageSet[0]?.url}
                                    productName={item?.name}
                                    productPrice={item?.price}
                                />
                            </TouchableOpacity>
                        )}
                    />
                    {/* <ProductList /> */}

                </View>
            </View>


            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('UITab');
                    //navigate('UITab')
                }}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    borderColor: 'black',
                    borderRadius: 1

                }}>
                <Text style={{
                    color: 'black',
                }}>Products</Text>
            </TouchableOpacity>
        </ScrollView >
    );

};
const styles = StyleSheet.create({
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
        borderWidth: 1

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
        // placeholderTextColor: colors.alert,
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
        marginTop: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 5,
        backgroundColor: colors.trangXam
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
        backgroundColor: 'white',
        marginTop: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.denNhe,
        flex: 20

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
