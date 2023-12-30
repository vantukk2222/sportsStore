import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../constants_Tu/colors';
const Orderdetail = (props) => {

    const route = useRoute()
    const billDetail = route.params.billDetail;

    console.log(billDetail);
    const formattedDate = (originalDateString) => {
        return moment(originalDateString).format('DD-MM-YYYY');
    }
    const handleSetTextInfor = (str) => {
        let index = str.indexOf("|")
        // console.log(str.substring(0, index));
        return <Text style={{ color: '#32373D' }}>{str.substring(10, index)}</Text>

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
                <View style={styles.container}>
                    <View style={{ backgroundColor: 'white', borderRadius: 8, marginHorizontal: 10 }}>
                        <View style={styles.itemContainer}>
                            <Icon

                                size={30}
                                name={'bookmark'}
                                style={{
                                    color: 'green',
                                }}></Icon>
                            <Text style={styles.valueTotal}>{billDetail.total} VND</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.value}>{formattedDate(billDetail.created_at)}</Text>
                        </View>
                    </View>
                </View >
                <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 5, marginHorizontal: 5, height: 400 }}>

                    <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ marginTop: 1, flex: 1 }}>
                        {billDetail.bill_detailSet?.map((item) => {
                            return (
                                <View style={styles.row} key={item.product.id}>
                                    {console.log(item.product.image_product_information)}
                                    <Image source={{ uri: item.product.image_product_information }} style={styles.image} />
                                    <View style={styles.column}>
                                        <Text style={{ color: 'black', flexWrap: 'wrap', marginRight: 4, fontWeight: '500', marginLeft: 2 }}>{item.product.name_product_information}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ color: '#32373D' }}>{item.price} VND</Text>
                                            <Text style={{ color: '#32373D', marginRight: 20 }}> SL {item.quantity}</Text>
                                            {/* <Text style={{ color: '#DF3833', marginRight: 10, alignItems: 'center' }}>- {item.product.sale.discount} %</Text> */}
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 5, marginHorizontal: 5, paddingVertical: 40, marginTop: 20 }}>
                    <View style={styles.itemContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {handleSetTextInfor(billDetail.information)}
                        </View>
                    </View>
                </View>
            </ScrollView >
        </SafeAreaView >
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30
        // backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#32373D',
        padding: 10
    },
    itemContainer: {
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    value: {
        fontSize: 16,
        color: 'gray'
    },
    valueTotal: {
        fontSize: 20,
        color: '#32373D',
        fontWeight: '500'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        height: 100,
        width: '100%'

    },
    image: {
        width: 90,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 10,
        //  elevation: 15,
    },
    column: {
        flex: 1,

        paddingLeft: 5
    },
});

export default Orderdetail;