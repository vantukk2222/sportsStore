import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ProductItem from './ProductItem'; // Đảm bảo đường dẫn đến file ProductItem là chính xác
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productReducer/product';
import Loading from "../../components/loading";
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize } from '../../constants';
const ProductList = (props) => {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.data);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(30);
    const [sort, setSort] = useState('name');
    const [desc, setDesc] = useState(false);

    const navigation = useNavigation();
    const handleGoDetail = (id) => {
        navigation.navigate('ProductDetail', {
            id: id
        });
    };
    // const url = 'https://png.pngtree.com/png-clipart/20210227/ourmi…ning-shoes-everyday-clipart-png-image_2965548.jpg'
    useEffect(() => {
        dispatch(fetchProducts(page, pageSize, sort, desc));
    }, [page, pageSize, sort, desc]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Text style={{ color: 'red' }}>Error: {error}</Text>;
    }
    return (


        <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>

            <View style={{
                flexDirection: 'row',
                marginBottom: 10,
                marginTop: 5,
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <View style={{ backgroundColor: colors.accent, width: 40, height: 40, borderRadius: 10, alignItems: 'center', marginLeft: 10 }}>
                    <Icon
                        onPress={() => navigation.goBack('Start')}
                        name="arrow-left"
                        size={25}
                        color='black'
                        style={{ marginTop: 5 }}
                    />
                </View>
                <View style={{ backgroundColor: colors.accent, width: 40, height: 40, borderRadius: 10, alignItems: 'center', marginRight: 10 }}>
                    <Icon name="shopping-cart"
                        onPress={() => navigation.goBack('Start')}
                        size={25}
                        color='black'
                        style={{ marginTop: 5 }} />
                </View>
            </View>
            <View
                style={{
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'row',
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
            <FlatList
                style={{ flexDirection: 'row', margin: 5 }}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleGoDetail(item.id)}>
                        < ProductItem
                            imageSource={item.imageSet[0].url}
                            productName={item.name}
                            productPrice={item.price}
                        />
                    </TouchableOpacity>

                )}
            />
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
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
        backgroundColor: '#FFFFFF',
        padding: 3,
        elevation: 2,
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
        backgroundColor: '#40AA54',
        padding: 10,
        textAlign: 'center',
        borderRadius: 5,
        elevation: 5,
    },
});

export default ProductList;
