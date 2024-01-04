import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, ScrollView, SafeAreaView } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { toastError, toastsuccess } from '../../../components/toastCustom';
import { fetchBillbyIdBusiness, resetGetBillbyIdBusi } from '../../../redux/reducers/Bill/getBillbyIdBusiness';
import { useNavigation } from '@react-navigation/native';

import { ActivityIndicator } from 'react-native-paper';
import ListOrder from './ListOrder';
import { colors } from '../../../constants';
import { IsConfirmBill } from '../../../redux/reducers/Bill/confirmBill';
import Icon from 'react-native-vector-icons/FontAwesome5';

const OrderScreen = (props) => {
    const {
        getBillbyIdBusiState,
        fetchBillbyIdBusiness,
        confirmBillState,
        IsConfirmBill
    } = props

    const navigation = useNavigation()
    const { data, loading, error } = useSelector((state) => state.userData)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(20)
    const [sort, setSort] = useState('id')
    const [desc, setDesc] = useState(false)
    const [state, setState] = useState(3)
    const [totalPage, setTotalPage] = useState(0)
    const dispatch = useDispatch();
    const [bills, setBills] = useState([])
    useEffect(() => {
        if (data) {
            fetchBillbyIdBusiness(data.id, page, pageSize, sort, desc, state)
        }
        return () => {
            resetGetBillbyIdBusi()
        }
    }, [data, state, page, pageSize, sort, desc])
    useEffect(() => {
        console.log(getBillbyIdBusiState?.dataGetBillbyIdBusi?.totalPages);
        setBills(getBillbyIdBusiState?.dataGetBillbyIdBusi?.content);
        setTotalPage(getBillbyIdBusiState?.dataGetBillbyIdBusi?.totalPages)
    }, [getBillbyIdBusiState?.dataGetBillbyIdBusi])

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
    const handleConfirm = (listId) => {
        if (listId.length <= 0) {
            toastsuccess('Cảnh báo', 'Không có đơn hàng nào được chọn')
            return
        }
        console.log(listId);
        IsConfirmBill(true, listId)
        setState(0)
        setDesc(true)
        //addProductSale(saleId, selectedProducts)

        //navigation.goBack('Sale')
    }
    const handleDelete = (listId) => {
        if (listId.length <= 0) {
            toastsuccess('Cảnh báo', 'Không có đơn hàng nào được chọn')
            return
        }
        Alert.alert(
            'Cảnh báo',
            'Bạn xác nhận hủy đơn hàng này',
            [
                { text: 'Không', onPress: () => { } },
                {
                    text: 'Có', onPress: () => {
                        {
                            IsConfirmBill(true, listId)
                            setState(4)
                            setDesc(true)

                        }


                    }
                }, // Chuyển hướng về màn hình chính
            ]
        );

        //  console.log(listId);
        //addProductSale(saleId, selectedProducts)

        //navigation.goBack('Sale')
    }
    if (getBillbyIdBusiState?.loadingGetBillbyIdBusi) {
        return <ActivityIndicator size="large" color={colors.success} style={{ padding: 40, alignItems: 'center' }} />
    }

    return (
<View style={{flex:100}}>
<View style={{ flexDirection: 'row', backgroundColor: '#2196F5', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}>
                    <Icon name="angle-left" size={30} style={{
                        color: 'white',
                        alignItems: 'flex-end',
                        marginLeft: 15,
                    }}></Icon>
                </TouchableOpacity>

                <Text style={{
                    padding: 2,
                    paddingRight: 30,
                    color: 'white',
                    fontWeight: '600',
                    fontSize: 24,
                    textAlign: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>Đơn hàng</Text>
                <View></View>

            </View>
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, height: '60%' }}>
            
                <View style={{ height: 1, backgroundColor: 'black' }} />
                <View style={{ flex: 0 }}>
                    <ScrollView style={styles.scrollViewContainer} horizontal>
                        <TouchableOpacity
                            onPress={() => state !== 3 && setState(3)}
                            style={styles.buttonEdit}>
                            {getBillbyIdBusiState?.loadingGetBillbyIdBusi ? <ActivityIndicator size="large" color={colors.success} /> :
                                <Text style={{ fontSize: 20, color: 'black', fontSize: 20, fontWeight: '500' }}>Xác nhận</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => state !== 0 && setState(0) && setDesc(true)}
                            style={styles.buttonEdit}>
                            {getBillbyIdBusiState?.loadingGetBillbyIdBusi ? <ActivityIndicator size="large" color={colors.success} /> :
                                <Text style={{ fontSize: 20, color: 'black', fontSize: 20, fontWeight: '500' }}>Đang giao</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => state !== 1 && setState(1)}
                            style={styles.buttonEdit}>
                            {getBillbyIdBusiState?.loadingGetBillbyIdBusi ? <ActivityIndicator size="large" color={colors.success} /> :
                                <Text style={{ fontSize: 20, color: 'black', fontSize: 20, fontWeight: '500' }}>Giao thành công</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => state !== 4 && setState(4)}
                            style={styles.buttonEdit}>
                            {getBillbyIdBusiState?.loadingGetBillbyIdBusi ? <ActivityIndicator size="large" color={colors.success} /> :
                                <Text style={{ fontSize: 20, color: 'black', fontSize: 20, fontWeight: '500' }}>Đã hủy</Text>}
                        </TouchableOpacity>
                    </ScrollView>

                </View>

                <View style={{ flex: 1, marginBottom: 10 }}>
                    {getBillbyIdBusiState?.loadingGetBillbyIdBusi ? <ActivityIndicator size="large" color={colors.success} /> :
                        state == 3 ? <ListOrder bills={bills} isConfirm={true} onConfirm={handleConfirm} onDelete={handleDelete} />
                            : state == 0 ? <ListOrder bills={bills} stateBill={state} />
                                : state == 1 ? <ListOrder bills={bills} stateBill={state} />
                                    : <ListOrder bills={bills} stateBill={state} />
                    }
                </View>
                <View style={styles.navigation}>
                    <TouchableOpacity
                        style={page === 0 ? styles.disableButton : styles.buttonOrder}

                        onPress={handlePrevPage}
                    >
                        <Text style={{ color: 'white', fontWeight: '500' }}>Trang trước</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={page + 1 >= totalPage ? styles.disableButton : styles.buttonOrder}
                        disabled={page + 1 >= totalPage ? true : false}
                        onPress={handleNextPage}>
                        <Text style={{ color: 'white', fontWeight: '500' }}>Trang sau</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView >
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 100,
        paddingTop: 10,
        paddingHorizontal: 20,
        //backgroundColor: colors.xam

    },
    header: {
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 10,
        flex: 1,
        //backgroundColor: 'red'
    },
    scrollViewContainer: {
        //  borderBottomColor: 'gray',
        //   borderBottomWidth: 0.8,
        borderTopWidth: 0.8,
        borderTopColor: 'black',
        //flex: 1,
    },
    buttonEdit: {
        height: 50,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        marginLeft: 8,
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1, paddingTop: 5
    },
    buttonOrder: {
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
    },
    buttonEdit: {
        // marginTop: 5,
        height: 50,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        marginLeft: 8
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
    getBillbyIdBusiState: state.getBillbyIdBusi,
    confirmBillState: state.confirmBill
})
const mapDispatchToProps = {
    fetchBillbyIdBusiness,
    IsConfirmBill
}
export default connect(mapStateToProps, { ...mapDispatchToProps })(OrderScreen);
