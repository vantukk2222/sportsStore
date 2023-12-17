// ProductBusiness.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import ListProduct from './ListProduct';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByBusiness } from '../../../redux/reducers/Business/getProductByBusiness';
import putChangeState from '../../../API/Product/putChangeState';
import { resetState, setStateProduct } from '../../../redux/reducers/productReducer/putChangeState';
import { reset } from '../../../redux/reducers/User/setInforUser';
import { toastError, toastsuccess } from '../../../components/toastCustom';
import colors from '../../../constants_Tu/colors';


const ProductBusiness = () => {
    const { dataProductbyBusi, loadingProductbyBusi, errorProductbyBusi } = useSelector((state) => state.productByBusiness)
    const dispatch = useDispatch();
    const [products, setProducts] = useState()
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [sort, setSort] = useState('name')
    const [desc, setDesc] = useState(true)
    const [state, setState] = useState(0)
    const { data, loading, error } = useSelector((state) => state.userData)

    const { dataState, loadingSate, errorState } = useSelector((state) => state.putStateProduct)
    useEffect(() => {
        //console.log(data);
        dispatch(fetchProductsByBusiness(data?.id, page, pageSize, sort, desc, state))
    }, [data, page, pageSize, sort, desc, state])
    useEffect(() => {
        // console.log(dataProductbyBusi.content);
        setProducts(dataProductbyBusi.content)
    }, [dataProductbyBusi])

    const handleEdit = (productId) => {
        // Xử lý sự kiện sửa sản phẩm
        console.log('Edit product with ID:', productId);
    };
    useEffect(() => {
        if (dataState === 202) {
            console.log("data State", dataState);
            // Xử lý sự kiện xóa sản phẩm

        }
        //else {
        //     toastError("Xoa san pham", "That bai")
        // }
        dispatch(resetState)

    }, [dataState])
    const handleDelete = (productId) => {
        // Xử lý sự kiện xóa sản phẩm
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa sản phẩm này?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xóa',

                    onPress: () => {
                        console.log("id", productId);
                        dispatch(setStateProduct(productId, 2))
                        if (dataState === 202) {
                            // Xử lý sự kiện xóa sản phẩm
                            setProducts((prevProducts) =>
                                prevProducts.filter((product) => product.id !== productId)
                            );
                            toastsuccess("Xoa san pham", "Thanh cong")
                        }

                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleNextPage = () => {
        // Xử lý sự kiện chuyển trang tới
        console.log('Go to the next page');
    };

    const handlePrevPage = () => {
        // Xử lý sự kiện chuyển trang lui
        console.log('Go to the previous page');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Product Management</Text>

            </View>
            <View style={{ height: 1, backgroundColor: 'black' }}></View>
            <ListProduct
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <View style={styles.navigation}>
                <TouchableOpacity style={styles.button} onPress={handlePrevPage}>
                    <Text>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNextPage}>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '48%', // Đặt chiều rộng của nút
    },
});

export default ProductBusiness;
