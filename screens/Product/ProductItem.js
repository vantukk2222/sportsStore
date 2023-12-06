import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize } from '../../constants';
import { formatMoneyVND } from '../../utilies/validation';

const ProductItem = ({ imageSource, productName, productPrice, sale }) => {
    const priceAfterSale = (price, discount) => {
        return (price * (1 - discount / 100))
    }
    return (
        <View style={styles.productItem}>
            <View style={styles.imageContainer}>
                <Image style={styles.productImage} source={{ uri: imageSource }} />
                {/* <Icon style={styles.heartIcon} name="heart" size={25} /> */}
            </View>


            <View style={styles.ratingContainer}>
                <View style={styles.productNameContainer}>
                    <Text style={styles.productName}>{productName}</Text>
                </View>
            </View>
            <View style={styles.priceContainer}>
                {sale !== null ?
                    <View style={{ flex: 1 }}>
                        <Text style={styles.priceSale}>{formatMoneyVND(productPrice)}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                color: 'red',
                                fontSize: 15,
                                fontWeight: 500,
                                marginHorizontal: 10,
                                //marginVertical: 2,
                                alignItems: 'flex-start'
                            }}>{formatMoneyVND(priceAfterSale(productPrice, sale?.discount))}</Text>
                            <View>
                                {sale?.discount > 0 && (
                                    <Text style={styles.discountPrice}>
                                        Giảm {sale?.discount}%
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>
                    :
                    <Text style={styles.productPrice}>{formatMoneyVND(productPrice)}</Text>}
                {/* <View style={styles.starRatingContainer}>
                    <Icon style={styles.starIcon} name="star" size={15} />
                    <Text style={styles.ratingText}>4.5</Text>
                </View> */}
                {/* <View style={styles.cartIconContainer}>
                    <Icon name="shopping-cart" color="white" size={25} />
                </View> */}
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    productItem: {
        borderWidth: 0.4,
        borderRadius: 18,
        // overflow: 'hidden',
        margin: 5,
        width: 180,
        height: 270,
        alignItems: 'center',
        flex: 100,
        backgroundColor: 'white'
    },
    imageContainer: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        flex: 60
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
        flex: 25

    },
    productNameContainer: {
        flex: 1,
        flexDirection: 'column', // Thay đổi từ 'column' thành 'row'
        alignItems: 'flex-start', // Căn trên cùng theo chiều dọc
        marginLeft: 15,
        flex: 15
        //flexWrap: 'wrap', // Cho phép tự động xuống dòng
    },
    productName: {
        fontSize: 11,
        fontWeight: '600',
        color: 'black',
        marginTop: 10,

    },
    // starRatingContainer: {
    //     flexDirection: 'row',
    //     marginTop: 4,
    //     alignItems: 'stretch',
    //     justifyContent: 'flex-end',  // Căn phải theo chiều ngang
    //     marginRight: 5,  // Khoảng cách giữa productName và starIcon
    // },
    // starIcon: {
    //     marginRight: 3,
    //     color: 'yellow',
    // },
    // ratingText: {
    //     color: '#16162E',
    //     fontSize: 12,
    // },
    priceContainer: {
        flexDirection: 'row',
        flex: 25
        // marginTop: 10,
    },
    productPrice: {
        fontSize: 18,
        marginLeft: 5,
        paddingLeft: 8,
        fontWeight: 'bold',
        alignContent: 'center',
        color: colors.facebook,
        flex: 2
    },
    priceSale: {
        color: 'black',
        fontSize: 12,
        //fontWeight: 500,
        marginHorizontal: 10,
        textDecorationLine: 'line-through',
        alignItems: 'flex-start'
    },
    cartIconContainer: {
        backgroundColor: colors.denNhe,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 25,
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        flex: 1
    },
    discountPrice: {
        color: 'red', // You can customize the color for the discount label
        fontSize: 12, // You can adjust the font size for the discount label
        fontWeight: 'bold',
        //marginTop: 5,
        marginLeft: 5,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'red'
    },
});

export default ProductItem;
