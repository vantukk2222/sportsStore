import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ShopInfo = (props) => {
    const buss = props.business;
    //const { name, id, about } = buss;
    //console.log(buss);
    const navigation = useNavigation();
    return (
        <View >
            <View style={styles.shopContainer}>
                <Image source={{ uri: 'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808…2xCs7vrBkH27q_8GMMViNG57GtVP5ssoQjUdA&oe=6568D2F6' }} style={styles.shopImage} />
                <View style={styles.shopInfo}>
                    <Text style={styles.shopName}>{buss?.name}</Text>
                    <Text style={styles.shopDescription}>{buss?.about}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={{ borderRadius: 4, height: 35, padding: 5, borderWidth: 1, borderColor: 'red' }}
                        onPress={() => { navigation.navigate('Business', { business: buss }) }}>
                        <Text style={styles.shopButton}>Xem shop</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.moreContainer}>
                <Text style={styles.shopDescription}>
                    < Text style={{ color: 'red' }}>{buss?.count_product}</Text> Sản phẩm</Text>
                <Text style={styles.shopDescription}>
                    < Text style={{ color: 'red' }}>{buss?.count_comment_like}</Text> Lượt thích</Text>
                <Text style={styles.shopDescription}>
                    < Text style={{ color: 'red' }}>{buss?.count_comment}</Text> Bình luận</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    moreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        //borderBottomWidth: 1,
        // borderBottomColor: '#ddd',
        justifyContent: 'space-evenly'
    },
    shopImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    shopInfo: {
        flex: 1,
    },
    shopName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    shopDescription: {
        fontSize: 14,
        color: 'black',

    },
    shopButton: {
        fontSize: 14,
        color: 'red',
    },
});

export default ShopInfo;