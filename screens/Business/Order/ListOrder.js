// ProductList.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from '../../../constants';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { findMainImage } from '../../../utilies/validation';

const ListOrder = ({ bills = [], isConfirm = false, stateBill = 3, onConfirm, onDelete }) => {
    const formattedDate = (originalDateString) => {
        return moment(originalDateString).format('DD-MM-YYYY');
    }
    const [selectedBills, setselectedBills] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const navigation = useNavigation()
    const toggleProductSelection = (productId) => {
        if (selectedBills.includes(productId)) {
            // Product is already selected, remove it

            setselectedBills((prevSelected) =>
                prevSelected.filter((id) => id !== productId)
            );
        } else {
            // Product is not selected, add it

            setselectedBills((prevSelected) => [...prevSelected, productId]);
        }
    };
    const toggleSelectAll = () => {
        if (selectAll) {
            // Deselect all products
            setselectedBills([]);
        } else {
            // Select all products
            setselectedBills(bills.map((bill) => bill.id));
        }
        // Toggle the selectAll state
        setSelectAll(!selectAll);
    };

    console.log(selectAll);
    const renderItem = ({ item }) => (

        <View style={styles.row}>
            {/* <Image source={{ uri: findMainImage(item?.imageSet) }} style={styles.image} /> */}
            {isConfirm === true && <CheckBox
                value={selectedBills.includes(item.id)}
                onValueChange={() => toggleProductSelection(item.id)}
                style={styles.checkbox}
                tintColors={{ true: 'green', false: 'gray' }}
            />}
            <TouchableOpacity style={styles.column}
                onPress={() => { navigation.navigate("Orderdetail", { billDetail: item }) }}>
                <Text style={{ color: 'black' }}>{item.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'blue', }}>Tạo lúc : {formattedDate(item.created_at)}</Text>
                    <Text style={{ color: 'black', fontWeight: '500', fontSize: 15, alignItems: 'flex-end' }}> {item.total}</Text>
                </View>
            </TouchableOpacity>
        </View >
    );
    // console.log('bill', bills);
    return (
        <View style={{ paddingHorizontal: 5, borderTopWidth: 20, borderTopStartRadius: 20, borderTopEndRadius: 20, borderRadius: 1, padding: 5, borderColor: '#0089FD', flex: 1 }}>

            <Text style={{ fontSize: 20, color: 'black', fontSize: 20, fontWeight: '500' }}>
                {stateBill == 0 ? 'Đơn hàng đang giao'
                    : stateBill == 1 ? 'Đơn hàng giao thành công'
                        : stateBill == 4 ? 'Đơn hàng bị hủy' : 'Đơn hàng chờ xác nhận'}
            </Text>
            {isConfirm === true && <View style={styles.columnButton}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    onConfirm(selectedBills)
                    setselectedBills([])
                    setSelectAll(false)

                }}>
                    <Text style={{ color: 'white' }}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    onDelete(selectedBills)
                    setselectedBills([])
                    setSelectAll(false)

                }}>
                    <Text style={{ color: 'red' }}>Hủy </Text>
                </TouchableOpacity>
            </View>}
            {isConfirm === true && <View style={styles.checkboxContainer}>
                <CheckBox
                    value={selectAll}
                    onValueChange={toggleSelectAll}
                    style={styles.checkbox}
                    tintColors={{ true: 'green', false: 'black' }}
                />
                <Text style={styles.label}>Select All</Text>
            </View>}
            {bills.length > 0 ?
                <FlatList
                    data={bills}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                /> :
                <View>
                    <Text style={styles.labelNotFound}>Không có đơn hàng nào</Text>
                </View>
            }

        </View>


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
        marginBottom: 5,

    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        width: '100%',
        alignItems: 'center', // Center items vertically
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
        backgroundColor: '#303F7F',
        width: 80,
        alignItems: 'flex-end',
        padding: 5,
        borderRadius: 5,
        margin: 5,
        alignItems: 'center',
    },
    columnButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        //position: 'absolute',
        // bottom: 0,
        // left: 1
    },
    label: {
        color: 'black',
        padding: 5,
        marginRight: 10,
        fontWeight: '500'
        //width: 'auto'
        //backgroundColor: 'red'
    },
    labelNotFound: {
        color: 'black',
        padding: 40,
        marginRight: 10,
        fontWeight: '400',
        fontSize: 20,

    },
    checkbox: {
        alignSelf: 'flex-start', // Align the checkbox to the start (left)
    },
});

export default ListOrder;
