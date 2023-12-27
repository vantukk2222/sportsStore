// SellerHomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { toastError } from '../../components/toastCustom';
const SellerHomeScreen = () => {

    const { data, loading, error } = useSelector((state) => state.userData)
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
            iconName: 'shopping-cart',
            naviga: 'OrderScreen'

            //image: require('./images/product2.jpg'),
        },
        {
            id: '4',
            name: 'Phản hồi',
            iconName: 'comments',
            //image: require('./images/product2.jpg'),
        },
        // ...Thêm sản phẩm khác
    ];

    const navigation = useNavigation();
    // Render mỗi sản phẩm trong danh sách
    const renderProductItem = ({ item }) => (
        <TouchableOpacity style={styles.productContainer}
            onPress={() => {
                if (error) {
                    toastError('Cảnh báo', 'bạn chưa đăng nhập')
                    return;
                } else {

                    navigation.navigate(item.naviga)
                }
            }}
            key={item.id}
        >
            <Icon
                style={styles.productImage}
                name={item.iconName}
                size={50}
                color={'white'} />
            <Text style={styles.productName}>{item.name}</Text>
        </TouchableOpacity>
    );
    const handleGoStatistic = () => {
        if (error) {
            toastError('Cảnh báo', 'bạn chưa đăng nhập')
            return;
        } else {
            console.log('Statistic');
            navigation.navigate('StatisticScreen');
        }

    }


    return (
        <View style={styles.container}>

            <Text style={styles.header}>Trang chủ</Text>
            <View style={{ height: 1, backgroundColor: 'white', marginBottom: 20 }}></View>
            <TouchableOpacity style={styles.dsContainer}
                onPress={() => handleGoStatistic()}
            >
                <Text style={styles.doanhSo}>Doanh số</Text>
                {/* <View style={{ marginLeft: 10 }}>
                    <Icon name={'credit-card'} size={18} color={'red'} />
                </View> */}
            </TouchableOpacity>
            <View style={{ backgroundColor: '#E3EBEE', flex: 1, borderTopRightRadius: 30, borderTopLeftRadius: 30, paddingVertical: 20, marginTop: 40 }}>
                <FlatList
                    horizontal={false}
                    data={tabs}
                    keyExtractor={(item) => item.id}
                    renderItem={renderProductItem}
                    numColumns={2}
                    style={{ marginTop: 25 }}
                />
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#30468F'
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
        color: 'white',

    },
    productContainer: {
        flex: 1,
        // alignItems: 'center',
        marginTop: 5,
        margin: 8,
        padding: 16,
        backgroundColor: '#303F7F',//'#f0f0f0',
        //borderRadius: 8,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 0.4,
        justifyContent: 'center',

    },
    productImage: {
        width: 100,
        height: 80,
        //   resizeMode: 'cover',
        marginTop: 8,
        borderRadius: 4,
        //marginLeft: 30,

        //  backgroundColor: 'red',
        flex: 1

    },
    productName: {
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 8,
        color: 'white'
    },
    dsContainer: {
        //flex: 1,

        justifyContent: 'center',
        margin: 8,
        width: 180,
        height: 50,
        //padding: 5,
        backgroundColor: '#303F7F',
        borderRadius: 18,
        borderWidth: 0.4,
        alignItems: 'center',
        flexDirection: 'row'
    },
    doanhSo: {

        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
    },
});

export default SellerHomeScreen;
