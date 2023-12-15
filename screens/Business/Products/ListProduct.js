// ProductList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../constants';

const ListProduct = ({ products, onEdit, onDelete }) => {
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <View style={styles.column}>
                <Text style={{ color: 'black' }}>{item.name}</Text>
                <Text style={{ color: 'blue' }}>{item.price_min}</Text>
            </View>
            <View style={styles.columnButton}>
                <TouchableOpacity style={styles.button} onPress={() => onEdit(item.id)}>
                    <Text style={{ color: 'white' }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => onDelete(item.id)}>
                    <Text style={{ color: 'red' }}>Delete</Text>
                </TouchableOpacity>
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
