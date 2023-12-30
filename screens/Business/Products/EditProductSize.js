import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Alert, SafeAreaView } from 'react-native';
import { colors } from '../../../constants';
import { toastError, toastsuccess } from '../../../components/toastCustom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { startMapper } from 'react-native-reanimated';
import { createProductSizes, resetProductSize } from '../../../redux/reducers/productReducer/ProductSize/createProductSize';
import { removerProductInfor } from '../../../redux/reducers/productReducer/deleteProductInformation';
import { fetchProductSizebyId, resetGetProductSize } from '../../../redux/reducers/productReducer/ProductSize/getProductSize';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { editProductSizes, resetEditProductSize } from '../../../redux/reducers/productReducer/ProductSize/editProductSize';
import Loading from '../../../components/loading';
import { deleteProductSize, resetDeleteSize } from '../../../redux/reducers/Size/DeleteSize';
import { isValidInteger } from '../../../utilies/validation';


const EditProductSize = (props) => {
    const route = useRoute();
    const productinforId = route.params.productinforId
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {
        fetchProductSizebyId,
        getProductSizeState,
        editProductSizes,
        editProductSizeState,
        deleteSizeState,
        deleteProductSize
    } = props

    useEffect(() => {
        fetchProductSizebyId(productinforId)
        return () => {
            dispatch(resetGetProductSize())
            dispatch(resetEditProductSize())
            dispatch(resetDeleteSize())
        }
    }, [productinforId])
    const [sizes, setSizes] = useState([])
    const [hasSizes, setHasSizes] = useState(false);

    const [validatePrice, setValidatePrice] = useState('');
    const [validateQuantity, setValidateQuantity] = useState('');
    useEffect(() => {
        setSizes(getProductSizeState?.dataGetProductSize)
    }, [getProductSizeState?.dataGetProductSize])

    // const handleAddSize = () => {
    //     setSizes([...sizes, { price: 1, size: 'FreeSize', quantity: 1 }]);
    //     toastsuccess('Thêm', 'Thêm size thành công');
    // };
    const handleSizeChange = (index, field, value) => {
        console.log(field, value);
        console.log(sizes[index][field])
        setSizes((prevSizes) => {
            return prevSizes.map((size, i) => {
                if (i === index) {
                    // Nếu đây là phần tử cần cập nhật
                    return {
                        ...size,
                        [field]: value,
                    };
                } else {
                    // Nếu không phải phần tử cần cập nhật, trả về nguyên bản
                    return size;
                }
            });
        });
    };
    useEffect(() => {
        console.log(' console.log(sizes);', sizes);
    }, [sizes])
    const handleDeleteSize = (index, size) => {
        if (sizes.length === 1) {
            // Nếu chỉ còn 1 size, không cho phép xóa
            toastError('Xoá', 'Không thể xóa, phải có 1 size');
            return;
        }
        else {
            Alert.alert(
                'Cảnh báo',
                'Bạn có muốn xóa kích thước?',
                [
                    { text: 'Không', onPress: () => { } },
                    {
                        text: 'Có', onPress: () => {
                            {
                                deleteProductSize(size?.id)
                                const updatedSizes = sizes.filter((_, i) => i !== index);
                                setSizes(updatedSizes);
                                // toastError('Xoá', 'Xóa thành công');
                                if (deleteSizeState?.errorDeleteSize) {
                                    return;
                                } else {
                                    navigation.navigate('BusinessBottomNavigator')
                                }

                            }


                        }
                    }, // Chuyển hướng về màn hình chính
                ]
            );
            // return navigation.navigate('BusinessBottomNavigator');
        }
        //them alert hoi co muon xoa k 
        // goi api xoa size 

    };


    const renderSize = () => {
        return sizes?.map((size, index) => (
            < View key={index} style={styles.sizeContainer} >
                <Text style={styles.label}>Size {index + 1}</Text>
                <TouchableOpacity
                    onPress={() => handleDeleteSize(index, size)}
                    style={{ position: 'absolute', right: 10, top: 5 }}>
                    <Text style={{ color: 'red', fontSize: 18 }}>Xóa</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder={size?.price.toString()}
                    placeholderTextColor={'gray'}
                    value={size.price}
                    onChangeText={(value) => {
                        if (isValidInteger(value) || value == null) {
                            setValidatePrice()
                            handleSizeChange(index, 'price', value)
                        } else {
                            setValidatePrice('Mức giá phải là số nguyên')
                            handleSizeChange(index, 'price', '')
                        }
                    }}
                    keyboardType='numeric'
                />
                {validatePrice && <Text style={{
                    marginHorizontal: 5,
                    padding: 2,
                    color: 'red',
                    fontWeight: '300',
                    fontSize: 14
                }}>{validatePrice}</Text>
                }
                <TextInput
                    style={styles.input}
                    placeholder={size?.size || 'Freesize'}
                    placeholderTextColor={'gray'}
                    value={size?.size}
                    onChangeText={(value) => handleSizeChange(index, 'size', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder={size?.quantity.toString()}
                    placeholderTextColor={'gray'}
                    value={size?.quantity}
                    onChangeText={(value) => {
                        // console.log(value);
                        if (isValidInteger(value) || value == null) {
                            setValidateQuantity()
                            handleSizeChange(index, 'quantity', value)
                        } else {
                            setValidateQuantity('Số lượng phải là số nguyên')
                            handleSizeChange(index, 'quantity', '')
                        }
                    }
                    }
                    keyboardType='numeric'
                />
                {validateQuantity &&
                    <Text style={{
                        marginHorizontal: 5,
                        padding: 2,
                        color: 'red',
                        fontWeight: '300',
                        fontSize: 14
                    }}>{validateQuantity}</Text>
                }
            </View>

        ))
    }

    const createSizeObject = (price, size, quantity) => {
        if (price > 0 && size && quantity > 0) {
            return {
                id_product_information: productinforId,
                price: price || 1,
                size: size || 'FreeSize',
                quantity: quantity || 1,
            };
        }
        return false;
    };
    const handleSaveSizes = () => {
        // TODO: Gửi sizes lên server hoặc xử lý theo yêu cầu của bạn
        sizes.map(item => {
            if (createSizeObject(item.price, item.size, item.quantity)) {
                editProductSizes(item.id, createSizeObject(item.price, item.size, item.quantity));
            }
        });
        console.log('Saved Sizes:', sizes);
        setHasSizes(true)
    };

    useEffect(() => {
        if (hasSizes) {
            navigation.navigate('BusinessBottomNavigator')
            return true; // Ngăn chặn việc thoát khỏi màn hình
        }
    }, [hasSizes, navigation]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Sửa kích thước</Text>

                {renderSize()}


            </ScrollView >
            <View
                style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>

                <TouchableOpacity onPress={handleSaveSizes}
                    style={{
                        marginBottom: 10,
                        backgroundColor: 'blue',
                        height: 40, width: 150,
                        marginHorizontal: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8
                    }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Lưu size</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>


    );
}
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
        borderColor: 'gray',
        flex: 1
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
    getProductSizeState: state.getProductSize,
    editProductSizeState: state.editProductSize,
    deleteSizeState: state.deleteSize
})
const mapDispatchToProps = {
    fetchProductSizebyId,
    editProductSizes,
    deleteProductSize
}
export default connect(mapStateToProps, { ...mapDispatchToProps })(EditProductSize);
