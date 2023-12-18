import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { colors } from '../../../constants';
import { toastError, toastsuccess } from '../../../components/toastCustom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { startMapper } from 'react-native-reanimated';
import { createProductSizes, resetProductSize } from '../../../redux/reducers/productReducer/ProductSize/createProductSize';
import { removerProductInfor } from '../../../redux/reducers/productReducer/deleteProductInformation';

const CreateSize = ({ navigation }, props) => {
    const route = useRoute();
    const id_productinformation = route.params?.id_productinformation || null;
    // const { dataProductSize, loadingProductSize, errorProductSize } = useSelector((state) => state.createProductSize)
    const {
        initialState,
        initialDeleteProState,
        createProductSizes,
    } = props;

    console.log("CreateSize", id_productinformation);
    const dispatch = useDispatch();
    const [hasSizes, setHasSizes] = useState(false);

    const [sizes, setSizes] = useState([
        { price: 1, size: 'FreeSize', quantity: 1 }
    ]);
    useEffect(() => {
        return () => {
            dispatch(resetProductSize())
        }
    }, [id_productinformation])


    useEffect(() => {
        console.log("data product size", initialState?.dataProductSize);
        if (initialState?.errorProductSize != null) {
            toastsuccess('Thêm size', 'Thành công')
        }

    }, [initialState?.dataProductSize])


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (!hasSizes) {
                // Hiển thị cảnh báo nếu không có kích thước
                Alert.alert(
                    'Cảnh báo',
                    'Bạn lưu các kích thước. Bạn có muốn quay lại?',
                    [
                        { text: 'Không', onPress: () => { } },
                        {
                            text: 'Có', onPress: () => {
                                {
                                    dispatch(removerProductInfor(id_productinformation))
                                    if (initialDeleteProState?.errorDelePro) {
                                        toastError('Bạn chưa lưu kích thước sản phẩm')
                                    } else {
                                        navigation.navigate('BusinessBottomNavigator')
                                    }

                                }


                            }
                        }, // Chuyển hướng về màn hình chính
                    ]
                );
                return true; // Ngăn chặn việc thoát khỏi màn hình
            }
            return false; // Cho phép việc thoát khỏi màn hình
        });
        return () => backHandler.remove();
    }, [hasSizes, navigation]);



    const handleAddSize = () => {
        setSizes([...sizes, { price: 1, size: 'FreeSize', quantity: 1 }]);
        toastsuccess('Thêm', 'Thêm size thành công');
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...sizes];
        updatedSizes[index][field] = value;
        setSizes(updatedSizes);
    };
    const createSizeObject = (price, size, quantity) => {
        return {
            id_product_information: id_productinformation,
            price: price || 1,
            size: size || 'FreeSize',
            quantity: quantity || 1,
        };
    };
    const handleSaveSizes = () => {
        // TODO: Gửi sizes lên server hoặc xử lý theo yêu cầu của bạn
        sizes.map(item => {
            createProductSizes(createSizeObject(item.price, item.size, item.quantity));
        });
        console.log('Saved Sizes:', sizes);
        setHasSizes(true)
    };
    const handleDeleteSize = (index) => {
        if (sizes.length === 1) {
            // Nếu chỉ còn 1 size, không cho phép xóa
            toastError('Xoá', 'Không thể xóa, phải có 1 size');
            return;
        }

        const updatedSizes = [...sizes];
        updatedSizes.splice(index, 1);
        setSizes(updatedSizes);
        toastError('Xoá', 'Xóa thành công');
    };
    if (initialState?.errorProductSize) {
        toastError('Thêm size', 'Không thành công')
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Tạo Size cho Product Information</Text>

            {sizes.map((size, index) => (
                <View key={index} style={styles.sizeContainer}>
                    <Text style={styles.label}>Size {index + 1}</Text>
                    <TouchableOpacity
                        onPress={() => handleDeleteSize(index)}
                        style={{ position: 'absolute', right: 10, top: 5 }}>
                        <Text style={{ color: 'red', fontSize: 18 }}>Xóa</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        placeholderTextColor={'gray'}
                        value={size.price}
                        onChangeText={(value) => handleSizeChange(index, 'price', value)}
                        keyboardType='numeric'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={size.size}
                        value={size.size}
                        onChangeText={(value) => handleSizeChange(index, 'size', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Quantity"
                        placeholderTextColor={'gray'}
                        value={size.quantity}
                        onChangeText={(value) => handleSizeChange(index, 'quantity', value)}
                        keyboardType='numeric'
                    />
                </View>
            ))}
            <View
                style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 10, marginBottom: 10, flex: 1 }}>
                <TouchableOpacity onPress={handleAddSize} style={{ marginBottom: 10, backgroundColor: 'blue', height: 40, width: 150, marginHorizontal: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Thêm size</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSaveSizes} style={{ marginBottom: 10, backgroundColor: 'blue', height: 40, width: 150, marginHorizontal: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Lưu size</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginHorizontal: 2,
        backgroundColor: colors.trangXam
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
        color: 'black',
        textAlign: 'center',
    },
    sizeContainer: {
        marginBottom: 20,
        borderRadius: 8,
        borderWidth: 0.4,
        borderColor: 'gray'
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.8,
        marginBottom: 10,
        paddingLeft: 10,
        color: 'black',
        marginHorizontal: 5

    },
});
const mapStateToProps = (state) => ({
    initialState: state.createProductSize,
    initialDeleteProState: state.deleteProductInformation

})
const mapDispatchToProps = {
    createProductSizes
}
export default connect(mapStateToProps, { ...mapDispatchToProps, removerProductInfor })(CreateSize);
