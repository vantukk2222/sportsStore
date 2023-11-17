import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';


const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];
const ItemCard = () => {
    // const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const pricePerUnit = 10; // Giá của mỗi sản phẩm
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    // Hàm tính toán giá tổng
    const totalPrice = pricePerUnit * quantity;

    return (
        <View style={{
            padding: 8,
            margin: 5,

            flexDirection: 'row',
            // borderWidth: 2,
            // borderColor: 'gray',
            // borderRadius: 10,// chỉ dùng trên Android để tạo hiệu ứng đổ bóng
        }}>
            {/* Hiển thị ảnh sản phẩm */}
            <Image
                source={{ uri: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/503e9eea-02dd-4f8f-91e3-6ad74a9225cc/quest-5-road-running-shoes-8wZR01.png' }}
                style={{ width: 116, height: 116, marginVertical: 10, backgroundColor: 'black', borderRadius: 5 }}
            />

            {/* Hiển thị tên sản phẩm */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    // backgroundColor:'red',
                    paddingRight:40
                }}>
                    <Text style={{

                        fontSize: 14,
                        fontWeight: 'bold',
                        paddingVertical: 10,
                        marginStart: 10
                        
                    }}>
                        Tên sản phẩm
                    </Text>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={150}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Size' : '...'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    // renderLeftIcon={() => (
                    //     <AntDesign
                    //         style={styles.icon}
                    //         color={isFocus ? 'blue' : 'black'}
                    //         name="Safety"
                    //         size={20}
                    //     />
                    // )}
                    />
                    {/* Lựa chọn size */}
                    {/* <Picker
                        selectedValue={selectedSize}
                        // itemStyle={{ height: 40, width: 40, ma backgroundColor: 'red'}}
                        mode="dropdown" 
                        style={{ 
                            backgroundColor:'white',
                            height: 30,
                            width: 150,
                            marginBottom: 5,
                        }}
                        onValueChange={(itemValue) => setSelectedSize(itemValue)}
                    >
                        <Picker.Item label="Size S" value="S"/>
                        <Picker.Item label="Size M" value="M" />
                        <Picker.Item label="Size L" value="L" />
                    </Picker> */}
                    {/* Giá tổng theo số lượng */}
                    <Text style={{ marginStart: 10, marginTop: 10, fontSize: 14, fontWeight: 'bold' }}>
                        Giá tổng: {totalPrice}đ
                    </Text>
                </View>
                {/* Tăng/giảm số lượng */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => setQuantity(quantity - 1)} disabled={quantity === 1}>
                    <Icon name ='minus' style={{ fontSize: 12, marginRight: 10,padding:3,paddingRight:1, borderWidth:1}}></Icon>
                        {/* <Text style={{ fontSize: 20, marginRight: 10 }}> - </Text> */}
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12 }}>{quantity}</Text>
                    <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                        <Icon name ='plus' style={{ fontSize: 12, marginLeft: 10,padding:3,paddingRight:1, borderWidth:1}}></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ItemCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        
        // backgroundColor:'red',
        padding: 16,
    },
    dropdown: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginStart: 10,
        paddingHorizontal: 10,
        // backgroundColor:'red'
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        // backgroundColor:'red',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 12,
    },
    selectedTextStyle: {
        // backgroundColor:'red',
        fontSize: 16,
    },
    iconStyle: {
        // backgroundColor:'red',
        width: 20,
        height: 20,
    },
    
});