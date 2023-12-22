import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from '../../../constants';
import moment from 'moment';

const ListSale = ({ sales, onDetail, onEdit }) => {
    handleChangeTimeType = (time) => {
        return moment(time).format("DD/MM/YYYY");
    }
    const renderItem = ({ item }) => (
        <View>
            <View style={styles.row}>
                <Image source={{ uri: item?.url }} style={styles.image} />
                <View style={styles.column}>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '500' }}>{item.name}</Text>
                    <Text style={{ color: 'red' }}>Giảm {item.discount}%</Text>
                </View>
                <View style={styles.columnButton}>
                    <TouchableOpacity style={styles.button} >
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: '500' }}>Sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => onDetail(item.id)}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: '500' }}>Xem</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.dateColumn}>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: '500' }}>
                    Từ {handleChangeTimeType(item.started_at)}</Text>
                <Text style={{ color: 'red', fontSize: 15, fontWeight: '500' }}>Đến {handleChangeTimeType(item.ended_at)}</Text>
            </View>

        </View >
    );
    return (

        <FlatList
            data={sales}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />

    );
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        borderBottomWidth: 0.4,
        borderBottomColor: '#ccc',
        paddingBottom: 10,

    },
    dateColumn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10,
        borderBottomWidth: 0.8,
        borderBottomColor: 'black',
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
        marginLeft: 10,
    },
    button: {
        backgroundColor: colors.success,
        padding: 5,
        borderRadius: 5,
        margin: 5,
        alignItems: 'center',
        width: 80
    },
});

export default ListSale;