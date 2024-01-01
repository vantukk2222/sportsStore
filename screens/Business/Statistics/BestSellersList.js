import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-paper';
import { findMainImage } from '../../../utilies/validation';
import { colors } from '../../../constants';
const BestSellersList = ({ dataPro }) => {
    // console.log('dataPro', dataPro);
    const renderItem = (item) => {
        console.log(findMainImage(item.item.imageSet));
        return (
            <List.Item
                style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.4 }}
                key={item.item.id}
                left={(props) => (
                    <View style={{
                        width: 60, height: 100, flex: 0.5, justifyContent: 'center', alignItems: 'center', marginRight: -100,
                        borderWidth: 1, borderRadius: 20
                    }}>
                        <Image
                            source={{ uri: findMainImage(item.item.imageSet) }}
                            style={{ width: 50, height: 50, borderRadius: 25 }}
                        />
                    </View>
                )}
                right={(props) => (
                    <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: -60, width: 120, paddingTop: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                            {`Giá: ${item.item?.price_min}`}
                        </Text>
                        <Text style={{ fontSize: 14, color: 'black', }}>{`${item.item.name}`}</Text>
                        <Text style={{ fontSize: 14, color: 'black' }}>{`Số lần bán: ${item.item.number_buy}`}</Text>
                    </View>
                )}
            />)
    }
    return (
        <View style={{ paddingVertical: 5, height: '100%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: 'black', borderBottomWidth: 0.6, padding: 5 }}>
                Sản Phẩm Bán Chạy
            </Text>
            <FlatList
                data={dataPro}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item) => renderItem(item)}
            />

        </View>
    );
};


export default BestSellersList;