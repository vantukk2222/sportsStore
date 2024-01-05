// ProductBusiness.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import ListProduct from './ListProduct';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchProductsByBusiness } from '../../../redux/reducers/Business/getProductByBusiness';
import putChangeState from '../../../API/Product/putChangeState';
import { resetState, setStateProduct } from '../../../redux/reducers/productReducer/putChangeState';
import { reset } from '../../../redux/reducers/User/setInforUser';
import { toastError, toastsuccess } from '../../../components/toastCustom';

import { setHireProduct } from '../../../redux/reducers/productReducer/hireProduct';
import { colors } from '../../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../../../components/loading';


const ProductBusiness = (props) => {
    const {
        hireState,
        setHireProduct
    } = props
    const navigation = useNavigation()
    const { dataProductbyBusi, loadingProductbyBusi, errorProductbyBusi } = useSelector((state) => state.productByBusiness)
    const dispatch = useDispatch();
    const [products, setProducts] = useState()
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [sort, setSort] = useState('name')
    const [desc, setDesc] = useState(true)
    const [state, setState] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const { data, loading, error } = useSelector((state) => state.userData)
    const [removeState, setRemoveState] = useState(false)

    const { dataState, loadingSate, errorState } = useSelector((state) => state.putStateProduct)
    useEffect(() => {
        console.log(data);
        dispatch(fetchProductsByBusiness(data?.id, page, pageSize, sort, desc, state))
        return () => {
            setTotalPage(0)
        }
    }, [data, page, pageSize, sort, desc, state])
    useEffect(() => {
        // console.log(dataProductbyBusi.content);
        setProducts(dataProductbyBusi.content)
        setTotalPage(dataProductbyBusi.totalPages)
    }, [dataProductbyBusi])

    const handleEdit = (productId) => {
        if (errorProductbyBusi) {
            toastError("Xin lỗi", "Đã xảy ra lổi, thử lại sau")
        } else {
            navigation.navigate('EditProductInfor', { productId: productId })
        }
        // Xử lý sự kiện sửa sản phẩm

        // console.log('Edit product with ID:', productId);
    };
    const handleRecover = (productId) => {
        if (errorProductbyBusi) {
            toastError("Xin lỗi", "Đã xảy ra lổi, thử lại sau")
        } else {
            setHireProduct(productId, false)// bo an 
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId));

        }

    }
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
        if (errorProductbyBusi) {
            toastError("Xin lỗi", "Đã xảy ra lổi, thử lại sau")
        } else {
            Alert.alert(
                'Xác nhận',
                'Bạn có chắc chắn muốn ẩn sản phẩm này?',
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    {
                        text: 'Ẩn',

                        onPress: () => {
                            console.log("product", productId, 'business', data?.id);
                            setHireProduct(productId, true)
                            //  console.log('Status hire', hireState?.dataStatusHire);
                            if (hireState?.dataStatusHire?.status === 202) {
                                // Xử lý sự kiện xóa sản phẩm
                                setProducts((prevProducts) =>
                                    prevProducts.filter((product) => product.id !== productId)
                                );
                                //toastsuccess("Xoa san pham", "Thanh cong")
                            }

                        },
                    },
                ],
                { cancelable: false }
            );
        }
        // Xử lý sự kiện xóa sản phẩm

    };

    const handleNextPage = () => {

        if (page + 1 <= totalPage) {

            setPage(page + 1)
            console.log('Go to the next page');
        }

    };

    const handlePrevPage = () => {
        // Xử lý sự kiện chuyển trang lui
        if (page > 0) {
            setPage(page - 1)
            console.log('Go to the previous page');
        }
    };
    // if (error || errorState) {

    //     toastError("Xin lỗi", "Lổi kết nối")
    //     //setProducts()
    //     //   navigation.navigate('Home')
    //     // return <View></View>
    // }
    // if (errorProductbyBusi) {
    //     toastError("Xin lỗi", "Đã xảy ra lổi, thử lại sau")
    // }
    useEffect(()=>{console.log("Product bussiness");},[])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{removeState === false ? 'Quản lý sản phẩm' : 'Sản phẩm bị ẩn'}</Text>
                <View style={{ borderRadius: 4, marginLeft: 10, borderWidth: 0.8, borderColor: 'black' }}>
                    {removeState === false ?
                        <Icon name='trash' size={26} color={'gray'} style={{ alignContent: 'flex-end', padding: 4 }} onPress={() => {
                            setState(2)
                            setRemoveState(true)
                            setPage(0)
                            setTotalPage(0)
                        }} /> :
                        <Icon name='list' size={26} color={'gray'} style={{ alignContent: 'flex-end', padding: 4 }} onPress={() => {
                            setState(0)
                            setRemoveState(false)
                            setPage(0)
                            setTotalPage(0)
                        }} />

                    }

                </View>

            </View>

            <View style={{ height: 1, backgroundColor: 'black' }}>



            </View>
            {loadingProductbyBusi === true ? <LoadingModal /> :
                <ListProduct
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    removeState={removeState}
                    onRecover={handleRecover}
                />
            }
            <View style={styles.navigation}>
                <TouchableOpacity
                    style={page === 0 ? styles.disableButton : styles.button}
                    disabled={page > 0 ? false : true}
                    onPress={handlePrevPage}
                >
                    <Text style={{ color: 'white', fontWeight: '500' }}>Trang trước</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={page + 1 >= totalPage ? styles.disableButton : styles.button}
                    disabled={page + 1 >= totalPage ? true : false}
                    onPress={handleNextPage}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Trang sau</Text>
                </TouchableOpacity>
            </View>
        </View >
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
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 10,
        flex: 1
        //backgroundColor: 'red'
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '48%', // Đặt chiều rộng của nút
    },
    disableButton: {
        backgroundColor: colors.xam,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '48%', // Đặt chiều rộng của nút
    }
});
const mapStateToProps = (state) => ({
    hireState: state.hireProduct
})
const mapDispatchToProps = {
    setHireProduct
}
export default connect(mapStateToProps, { ...mapDispatchToProps })(ProductBusiness);


