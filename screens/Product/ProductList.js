import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ProductItem from './ProductItem'; // Đảm bảo đường dẫn đến file ProductItem là chính xác
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productReducer/product';
import { fetchProductbySearch } from '../../redux/reducers/productReducer/searchProducts';
import Loading from "../../components/loading";
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize } from '../../constants';
const ProductList = (props) => {

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.product);
    const [products, setProducts] = useState([]);

    const { dataSearch, loadingSearch, errorSearch } = useSelector((state) => state.productSearch);
    const [searchText, setSearchText] = useState('');

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(30);
    const [sort, setSort] = useState('name');
    const [desc, setDesc] = useState(false);

    const navigation = useNavigation();

    const textInputSearch = useRef('');
    const [isAll, setIsAll] = useState(true);

    const [totalPages, setTotalPages] = useState(1);

    //Function : Go to screens detail with  product's id
    const handleGoDetail = (item) => {
        console.log('id', item.id);
        navigation.navigate('DetailProduct', {
            item: item
        });
    };

    //Function : set search text = value of text input
    const handleSearch = (e) => {
        console.log(e);
        const text = textInputSearch.current;
        if (text.length > 0) {
            console.log('Search Text:', text);
            setIsAll(false);
            setSearchText(text);
            textInputSearch.current = '';
        }
    }

    const handleSetAll = () => {
        setIsAll(true);
        setProducts(data.content);
    }

    //Call API when starting
    useEffect(() => {
        dispatch(fetchProducts(page, pageSize, sort, desc));
    }, [page, pageSize, sort, desc]);
    //set products = data
    useEffect(() => {
        //console.log(data);
        setProducts(data.content);
        //console.log(data.totalPages);
        setTotalPages(data.totalPages);
    }, [data, totalPages])

    //Call API, when search Product by name 
    useEffect(() => {

        if (searchText.length > 0) {
            console.log("get data search", searchText);
            dispatch(fetchProductbySearch(searchText));
        }
    }, [searchText])
    //set products = dataSearch
    useEffect(() => {
        console.log(" dataSearch", dataSearch);
        setProducts(dataSearch);
    }, [dataSearch])

    if (loading || loadingSearch) {
        return <Loading />;
    }

    if (error || errorSearch) {
        return <Text style={{ color: 'red' }}>Error: {error}</Text>;
    }
    return (


        <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
            {/* <View style={styles.lineTop}></View> */}
            <View style={styles.containerTop}>
                <View style={styles.iconBack}>
                    <Icon
                        onPress={() => navigation.goBack('Start')}
                        name="arrow-left"
                        size={25}
                        color={colors.accent}
                        style={{ marginTop: 5 }}
                    />
                </View>
                <View>
                    <Text style={styles.title}>Product List</Text>
                </View>
                <View style={styles.iconCart}>
                    <Icon name="shopping-cart"
                        onPress={() => navigation.goBack('Start')}
                        size={25}
                        color={colors.accent}
                        style={{ marginTop: 5 }} />
                </View>
            </View>
            <View style={styles.line}></View>
            {/* Search tab */}
            <View style={styles.containerSearch}>
                <TextInput
                    onChangeText={(text) => { textInputSearch.current = text }}
                    style={styles.input}
                    placeholder={searchText.length <= 0 ? "Search Product" : searchText}
                    placeholderTextColor="gray"
                    underlineColorAndroid={colors.alert}
                />
                <View style={styles.filter} onTouchEnd={handleSearch}>
                    <Icon
                        style={{ color: 'white', textAlign: 'center' }}
                        name="search"
                        size={24}
                    />
                </View>
            </View>
            {isAll === false &&

                <TouchableOpacity
                    style={styles.button}
                    onPress={
                        handleSetAll
                    }>
                    <Text style={styles.buttonText}>All</Text>
                </TouchableOpacity>

            }
            <View style={styles.line}></View>

            <FlatList style={{ flexDirection: 'row', margin: 5, backgroundColor: colors.facebook, borderRadius: 10 }}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('DetailProduct', { item }) }}>
                        < ProductItem
                            imageSource={item.imageSet[0].url}
                            productName={item.name}
                            productPrice={item.price_min}
                        />
                    </TouchableOpacity>

                )}
            />
            {isAll === true && <View style={styles.containerPages}>
                <View style={styles.iconBackPage}>
                    <Icon
                        onPress={() => {
                            if (page > 0) {
                                setPage(page - 1);
                            }
                        }}
                        name="chevron-left"
                        size={25}
                        color={colors.accent}
                        style={{ marginTop: 5 }}
                    />
                </View>

                <Text style={styles.buttonText}>{page < totalPages - 1 ? page : 'Hết'}</Text>

                <View style={styles.iconNextPage}>
                    <Icon
                        onPress={() => {
                            console.log(page)
                            if (page < totalPages - 1) {
                                setPage(page + 1);
                            }
                        }}
                        name="chevron-right"
                        size={25}
                        color={colors.accent}
                        style={{ marginTop: 5 }}
                    />
                </View>
            </View>}
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    containerTop: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 15,
        display: 'flex',
        justifyContent: 'space-between',
    },

    title: {
        color: 'black',
        alignItems: 'center',
        marginTop: 5,
        fontSize: fontSize.h3
    },
    containerSearch:
    {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
    }

    , iconCart: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 10,
        borderColor: colors.accent,
        borderWidth: 1, // Độ dày đường viền
        borderRadius: 5
    }
    , containerPages: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 15,
        marginRight: 30,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    iconBackPage: {
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 10,
        borderColor: colors.accent,
        borderWidth: 1, // Độ dày đường viền
        borderRadius: 5,
    },
    iconNextPage: {
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 10,
        borderColor: colors.accent,
        borderWidth: 1, // Độ dày đường viền
        borderRadius: 5,
    }
    ,
    iconTop: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 6,
        paddingRight: 6,
        marginTop: -60,
    },
    productCard: {
        height: 230,
        width: 166,
        backgroundColor: '#FFFFFF',
        elevation: 1,
        marginTop: 10,
        borderRadius: 5,
    },
    iconBack: {

        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 10,
        borderColor: colors.accent,
        borderWidth: 1, // Độ dày đường viền
        borderRadius: 5,

    },
    gridContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    productContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingLeft: 7,
        paddingRight: 7,
    },
    heartIcon: {
        marginTop: 10,
    }, input: {
        paddingTop: 2,
        width: 300,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: '#424242',
        borderRadius: 8,
    },
    filter: {
        backgroundColor: colors.accent,
        padding: 10,
        textAlign: 'center',
        borderRadius: 5,
        elevation: 5,
        marginHorizontal: 20
    }, button: {
        marginHorizontal: 10,
        borderColor: colors.accent,
        borderWidth: 1, // Độ dày đường viền
        borderRadius: 5, // Độ cong góc của đường viền
        padding: 10,
        width: 50,
        marginBottom: 10
    },
    buttonText: {
        color: colors.primary,
        fontSize: fontSize.h3,
    },
    line: {
        height: 1,
        backgroundColor: colors.accent,
    },
    lineTop: {
        marginTop: 2,
        height: 1,
        backgroundColor: colors.accent,
    },
});

export default ProductList;
