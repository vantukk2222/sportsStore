/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { reset } from '../../../redux/reducers/User/setInforUser';
import { toastError, toastsuccess } from '../../../components/toastCustom';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchProductsByBusiness, resetProductByBusiness } from '../../../../redux/reducers/Business/getProductByBusiness';
import { colors } from '../../../../constants';
import ListProduct from '../ListProduct';
import LoadingModal from '../../../../components/loading';
import Toast from 'react-native-toast-message';
import Render from './Render';

const ListProductBlock = (props) => {
    const navigation = useNavigation()
    const { dataProductbyBusi, loadingProductbyBusi, errorProductbyBusi } = useSelector((state) => state.productByBusiness)

    const route = useRoute();
    const dispatch = useDispatch();
    const [products, setProducts] = useState()

    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [sort, setSort] = useState('name')
    const [desc, setDesc] = useState(true)
    const [state, setState] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    const business = route.params.businessInfor;
    // console.log(business);

    useEffect(() => {
        dispatch(fetchProductsByBusiness(business?.id, page, pageSize, sort, desc, state))
        return () => {
            setTotalPage(0);
            dispatch(resetProductByBusiness());
        }
    }, [business, page, pageSize, sort, desc, state])
    useEffect(() => {
        //console.log(dataProductbyBusi.content);
        setProducts(dataProductbyBusi.content)
        setTotalPage(dataProductbyBusi.totalPages)
    }, [dataProductbyBusi])

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
    if (loadingProductbyBusi) {
        return <LoadingModal />
    }
    if (errorProductbyBusi) {
        Toast.error('loi')
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Danh sách sản phẩm bị khóa</Text>


            </View>
            <View style={{ height: 1, backgroundColor: 'black' }}>

            </View>
            {loadingProductbyBusi === true ? <LoadingModal /> :
                <Render
                    products={products}
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


export default ListProductBlock;