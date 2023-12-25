// ProductList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from '../../../constants';
import { findMainImage } from '../../Category/ListProductByCategory';

const ListProduct = ({ products, onEdit, onDelete, removeState, onRecover }) => {
    const renderItem = ({ item }) => (

        <View style={styles.row}>
            <Image source={{ uri: findMainImage(item?.imageSet) }} style={styles.image} />
            <View style={styles.column}>
                <Text style={{ color: 'black' }}>{item.name}</Text>
                <Text style={{ color: 'blue' }}>{item.price_min}</Text>
            </View>
            {
                removeState === false ?

                    <View style={styles.columnButton}>
                        <TouchableOpacity style={styles.button} onPress={() => onEdit(item.id)}>
                            <Text style={{ color: 'white' }}>Sửa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => onDelete(item.id)}>
                            <Text style={{ color: 'red' }}>Ẩn</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.columnButton}>
                        <TouchableOpacity style={styles.button} onPress={() =>
                            onRecover(item.id)
                            //console.log('img:', findMainImage(item?.imageSet))
                        }>
                            <Text style={{ color: 'white' }}>Hiện</Text>
                        </TouchableOpacity>
                    </View>
            }
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
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 5,
        borderRadius: 5,
        margin: 5,
        alignItems: 'center',
    },
});

export default ListProduct;
