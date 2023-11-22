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
import { fetchCategories } from '../../redux/reducers/Caregory/getAllCategories';


const Start = (props) => {
    // const { navigation, route } = props
    // const { navigate, goBack } = navigation
    const navigation = useNavigation();

    const { dataCate, loadingCate, errorCate } = useSelector((state) => state.categories);
    const [categories, setCategories] = useState([])

    const [pageSizCate, setPageSizeCate] = useState(5);
    const [sortCate, setSortCate] = useState('name');
    const [descCate, setDescCate] = useState(true);
    useEffect(() => {
        dispatch(fetchCategories(pageSizCate, sortCate, descCate));
    }, [pageSizCate, sortCate, descCate]);
    useEffect(() => {
        setCategories(dataCate.content);
    }, [dataCate])
    // useEffect(()=>{
    //    const  
    // },[])
    const clearAuthToken = async () => {
        await asyncStorage.removeAuthToken("authToken")
        console.log("auth token cleared");
    };


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



    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.product);
    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState('name');
    const [desc, setDesc] = useState(false);
    useEffect(() => {
        dispatch(fetchProducts(page, pageSize, sort, desc));
    }, [page, pageSize, sort, desc]);

    useEffect(() => {
        setProducts(data.content);
    }, [data]);


    if (loading) {
        return <Loading />;
    }

    if (error || errorCate) {
        return <Text style={{ color: 'red' }}>Error: {error}</Text>;
    }

    return (
        <ScrollView>
            <StatusBar backgroundColor={colors.accent} />
            <Header />
            <View
                style={{
                    padding: 20,
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 10,
                }}>
                <TextInput
                    style={styles.input}
                    placeholder="Search Product"
                    placeholderTextColor="gray"
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
                        Categories
                    </Text>
                    <Text style={{ color: '#F33A63', fontSize: 14, fontWeight: 'bold' }}>
                        See all
                    </Text>
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.slider}>


                        {/* <Image source={require('../../assets/Carrot.png')} /> */}
                        {/* {handleRenderCategory} */}

                    </View>
                </ScrollView>
            </View>
            <View style={styles.tabs}>
                <Text style={styles.tabFont}>All</Text>
                <Text style={styles.tabFont}>Top sale</Text>
                <Text style={styles.tabFontNew}>Event</Text>
                <Text style={styles.tabFont}>Whats new </Text>
            </View>
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
                        Event
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

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
                        <View style={styles.sales}>
                            {/* <Image source={require('../../assets/oreo.png')} /> */}
                            <View style={styles.label}>
                                <Text style={{ color: 'white', textAlign: 'center' }}>-15%</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
    searchBar: {
        width: '100%',
        padding: 20,
    },
    input: {
        paddingTop: 10,
        width: 300,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: '#424242',
        borderRadius: 8,


    },
    label: {
        backgroundColor: '#FF4646',
        width: 100,
        marginTop: -13,
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9,
        marginLeft: -10,
    },
    filter: {
        backgroundColor: '#40AA54',
        padding: 10,
        textAlign: 'center',
        borderRadius: 5,
        elevation: 5,
    },
    categories: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    slider: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 10,
    },
    salesSlider: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 10,
    },
    heartIcon: {
        marginTop: 10,
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
    sales: {
        height: 100,
        width: 100,
        backgroundColor: '#FFFFFF',
        borderColor: '#efefef',
        borderWidth: 1,
        borderRadius: 7,
        padding: 10,
        margin: 10,
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
