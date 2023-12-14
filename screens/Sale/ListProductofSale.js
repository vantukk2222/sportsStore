import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ProductItem from '../Product/ProductItem'; // Đảm bảo đường dẫn đến file ProductItem là chính xác
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productReducer/product';
import { fetchProductbySearch } from '../../redux/reducers/productReducer/searchProducts';
import Loading from "../../components/loading";
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize } from '../../constants';
import { fetchProductbySale } from '../../redux/reducers/productReducer/getProductBySale';
import { fetchProductInSale } from '../../redux/reducers/productReducer/searchProductInSale';

export const findMainImage = (images) => {
    for (let i = 0; i < images.length; i++) {
        if (images[i].is_main === true) {
            // console.log(images[i].url)
            return images[i].url;
        }
    }
    return images.length > 0 ? images[0].url : null;
}

const ListProductofSale = ({ route }) => {
    //sale 
    const { item } = route.params;
    console.log('sale ', item)
    const dispatch = useDispatch();
    const { dataProductbySale, loadingProductbySale, errorProductbySale } = useSelector((state) => state.getProductBySale);
    const [products, setProducts] = useState([]);

    const { dataSearchProductInSale, loadingSearchProductInSale, errorSearchProductInSale } = useSelector((state) => state.searchProductInSale);
    const [searchText, setSearchText] = useState('');

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState('name');
    const [desc, setDesc] = useState(false);
    const [state, setState] = useState(0)

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
    const handleSearch = () => {

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
        setProducts(dataProductbySale.content);
    }


    //Call API when starting
    useEffect(() => {
        dispatch(fetchProductbySale(item.id, page, pageSize, sort, desc, state));
    }, [item, page, pageSize, sort, desc, state]);
    //set products = data
    useEffect(() => {
        //console.log(data);
        setProducts(dataProductbySale.content);
        //console.log(data.totalPages);
        setTotalPages(dataProductbySale.totalPages);
    }, [dataProductbySale, totalPages])

    //Call API, when search Product by name 
    useEffect(() => {

        if (searchText.length > 0) {
            console.log("get product search by sale", searchText);
            dispatch(fetchProductInSale(item.id, searchText, 0));
        }
    }, [searchText])
    //set products = dataSearch
    useEffect(() => {
        console.log(" dataSearch", dataSearchProductInSale);
        setProducts(dataSearchProductInSale.content);
    }, [dataSearchProductInSale])

    if (loadingProductbySale || loadingSearchProductInSale) {
        return <Loading />;
    }

    if (errorProductbySale || errorSearchProductInSale) {
        return <Text style={{ color: 'red' }}>Error: {errorProductbySale}</Text>;
    }
    return (
        <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
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
            </View>
            <View style={styles.line}></View>
            {/* Search tab */}
            <View style={styles.containerSearch}>
                <TextInput
                    onChangeText={(text) => { textInputSearch.current = text }}
                    style={styles.input}
                    placeholder={`Search in ${item?.businessResponse.name}`}
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

            <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: colors.trangXam }}>
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
            </ScrollView>
            {/* <FlatList style={{
                flexDirection: 'row',
                margin: 5,
                backgroundColor: colors.trangXam,
                borderRadius: 10,
                marginTop: 10
            }}
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
                            sale={item.sale}
                        />
                    </TouchableOpacity>

                )}
            /> */}
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
                        color={colors.denNhe}
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
                        color={colors.denNhe}
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
        borderColor: colors.denNhe,
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
        borderColor: colors.denNhe,
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
        borderColor: colors.denNhe,
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
        color: colors.denNhe,
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

export default ListProductofSale;
