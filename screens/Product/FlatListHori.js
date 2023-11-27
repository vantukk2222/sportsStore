import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, Dimensions } from 'react-native';

const DATA = [
    { id: '1', title: 'Product 1', image: 'https://example.com/product1.jpg' },
    { id: '2', title: 'Product 2', image: 'https://example.com/product2.jpg' },
    // Add more product data as needed
];

const windowWidth = Dimensions.get('window').width;

const FlatListHori = () => {
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <View>
            <FlatList
                data={DATA}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        width: windowWidth * 0.8,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#ececec',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    title: {
        padding: 10,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default FlatListHori;
