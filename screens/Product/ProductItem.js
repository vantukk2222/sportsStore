import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize } from '../../constants';

const ProductItem = ({ imageSource, productName, productPrice }) => {

    return (
        <View style={styles.productItem}>
            <View style={styles.imageContainer}>
                <Image style={styles.productImage} source={{ uri: imageSource }} />
                <Icon style={styles.heartIcon} name="heart" size={25} />
            </View>


            <View style={styles.ratingContainer}>
                <View style={styles.productNameContainer}>
                    <Text style={styles.productName}>{productName}</Text>
                </View>
                <View style={styles.starRatingContainer}>
                    <Icon style={styles.starIcon} name="star" size={15} />
                    <Text style={styles.ratingText}>4.5</Text>
                </View>

            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>{productPrice}</Text>
                <View style={styles.cartIconContainer}>
                    <Icon name="shopping-cart" color="white" size={25} />
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    productItem: {
        borderWidth: 1,
        borderRadius: 18,
        // overflow: 'hidden',
        margin: 5,
        width: 180,
        height: 270,
        alignItems: 'center',
        flex: 0.5
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
    },
    productImage: {
        width: '80%', // Chiếm 80% của imageContainer
        height: 150,
        //resizeMode: 'cover',
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 0,
        color: 'red',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    productNameContainer: {
        flex: 1,
        flexDirection: 'column', // Thay đổi từ 'column' thành 'row'
        alignItems: 'flex-start', // Căn trên cùng theo chiều dọc
        marginLeft: 15,
        //flexWrap: 'wrap', // Cho phép tự động xuống dòng
    },
    productName: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
        marginTop: 10,
    },
    starRatingContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',  // Căn phải theo chiều ngang
        marginRight: 5,  // Khoảng cách giữa productName và starIcon
    },
    starIcon: {
        marginRight: 3,
        color: 'yellow',
    },
    ratingText: {
        color: '#16162E',
        fontSize: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    productPrice: {
        fontSize: 18,
        paddingLeft: 8,
        fontWeight: 'bold',
        color: colors.placeholder
    },
    cartIconContainer: {
        backgroundColor: '#40AA54',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 25,
        padding: 5,
        borderRadius: 5,
    },
});

export default ProductItem;
