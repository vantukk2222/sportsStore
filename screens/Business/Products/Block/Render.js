/* eslint-disable prettier/prettier */
// ProductList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from '../../../constants';
import { findMainImage } from '../../../../utilies/validation';

const Render = ({ products }) => {
    const renderItem = ({ item }) => (

        <View style={styles.row}>
            <Image source={{ uri: findMainImage(item?.imageSet) }} style={styles.image} />
            <View style={styles.column}>
                <Text style={{ color: 'black' }}>Tên: {item.name}</Text>
                <Text style={{ color: 'blue' }}>Giá: {item.price_min}</Text>
            </View>

        </View >
    );

    return (

        <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />

    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,

    },
    image: {
        width: 90,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 16,
        elevation: 15,
    },
    column: {
        flex: 1,
        marginLeft: 40
    },
    button: {
        backgroundColor: '#303F7F',
        width: 60,
        padding: 5,
        borderRadius: 5,
        margin: 5,
        alignItems: 'center',
    },
});

export default Render;
