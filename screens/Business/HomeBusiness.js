// SellerHomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../constants';
import { useNavigation } from '@react-navigation/native';
const SellerHomeScreen = () => {
    // Giả sử danh sách sản phẩm của người bán
    const tabs = [
        {
            id: '1',
            name: 'Thêm sản phẩm',
            iconName: 'archive',
            naviga: 'CreateNewProduct'

            // image: require('./images/product1.jpg'),
        },
        {
            id: '2',
            name: 'Thêm sự kiện',
            iconName: 'calendar-check',
            naviga: 'CreateSale'
            //image: require('./images/product2.jpg'),
        },
        {
            id: '3',
            name: 'Quản lý đơn hàng',
            iconName: 'shopping-cart'
            //image: require('./images/product2.jpg'),
        },
        {
            id: '4',
            name: 'Phản hồi',
            iconName: 'comments'
            //image: require('./images/product2.jpg'),
        },
        // ...Thêm sản phẩm khác
    ];

    const navigation = useNavigation();
    // Render mỗi sản phẩm trong danh sách
    const renderProductItem = ({ item }) => (
        <TouchableOpacity style={styles.productContainer}
            onPress={() => {
                navigation.navigate(item.naviga)
            }}
            key={item.id}
        >
            <Icon
                style={styles.productImage}
                name={item.iconName}
                size={60}
                color={'gray'} />
            <Text style={styles.productName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            <Text style={styles.header}>Seller Home</Text>
            <View style={{ height: 1, backgroundColor: 'white' }}></View>
            <TouchableOpacity style={styles.dsContainer}>
                <Text style={styles.doanhSo}>Xem doanh số</Text>
            </TouchableOpacity>
            <FlatList
                horizontal={false}
                data={tabs}
                keyExtractor={(item) => item.id}
                renderItem={renderProductItem}
                numColumns={2}
                style={{ marginTop: 25 }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.facebook
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 25,
        color: 'white',

    },
    productContainer: {
        flex: 1,
        // alignItems: 'center',
        margin: 8,
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        borderWidth: 0.4,
        justifyContent: 'center',

    },
    productImage: {
        width: 150,
        height: 100,
        resizeMode: 'cover',
        marginTop: 8,
        borderRadius: 4,
        //marginLeft: 30,

        //  backgroundColor: 'red',
        flex: 1

    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black'
    },
    dsContainer: {
        flex: 1,
        justifyContent: 'center',
        margin: 8,
        //padding: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        borderWidth: 0.4,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    doanhSo: {

        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
    },
});

export default SellerHomeScreen;
