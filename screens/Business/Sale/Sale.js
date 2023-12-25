import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { fetchSalesByBusiness, resetSaleByBusiness } from '../../../redux/reducers/Sale/getSalesbyIdBusiness';
import { colors } from '../../../constants';
import { connect, useSelector } from 'react-redux';
import Loading from '../../../components/loading';
import ListSale from './ListSale';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Sale = (props) => {

    const {
        initialState,
        fetchSalesByBusiness
    } = props
    const navigation = useNavigation();
    const { data, loading, error } = useSelector((state) => state.userData)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [sort, setSort] = useState('name')
    const [desc, setDesc] = useState(true)
    const [state, setState] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [sales, setSales] = useState([])
    const [reload, setReload] = useState(false)


    useEffect(() => {
        console.log(reload);
        fetchSalesByBusiness(data?.id, page, pageSize, sort, desc)
        return () => {
            resetSaleByBusiness();
        }
    }, [data, page, pageSize, sort, desc, state, reload])
    useEffect(() => {
        // console.log('total page ', initialState?.dataSalebyBusi?.totalPages);
        setSales(initialState?.dataSalebyBusi?.content)
        setTotalPage(initialState?.dataSalebyBusi?.totalPages)
    }, [initialState?.dataSalebyBusi])
    const handleNextPage = () => {
        if (page > 0 && page + 1 <= totalPage) {

            setPage(page + 1)
            console.log('Go to the next page');
        }

    };
    //console.log(sales);
    const handlePrevPage = () => {
        // Xử lý sự kiện chuyển trang lui
        if (page > 0) {
            setPage(page - 1)
            console.log('Go to the previous page');
        }

    };
    const handleGetProductofSale = (saleId) => {
        navigation.navigate('setProductinSale', { saleId: saleId, businessId: data?.id })
    }
    const handleEditproduct = (id) => {
        navigation.navigate('EditSale', { saleId: id })
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Các sự kiện</Text>
                <TouchableOpacity
                    onPress={() => {
                        console.log(reload);
                        setReload(reload == true ? false : true)
                    }}>
                    <Icon
                        name='retweet'
                        size={26}
                        color={'gray'}
                        style={{ alignSelf: 'flex-end', padding: 4 }}

                    />
                </TouchableOpacity>

                {/* <View style={{ borderRadius: 4, marginLeft: 10, borderWidth: 0.8, borderColor: 'black' }}>
                    {removeState === false ?
                        <Icon name='trash' size={26} color={'gray'} style={{ alignContent: 'flex-end', padding: 4 }} onPress={() => {
                            setState(2)
                            setRemoveState(true)
                        }} /> :
                        <Icon name='list' size={26} color={'gray'} style={{ alignContent: 'flex-end', padding: 4 }} onPress={() => {
                            setState(0)
                            setRemoveState(false)
                        }} />

                    }
                </View> */}

            </View>

            <View style={{ height: 1, backgroundColor: 'black' }}>

            </View>
            {initialState?.loadingSalebyBusi === true ? <Loading /> :
                <ListSale
                    sales={sales}
                    onDetail={handleGetProductofSale}
                    onEdit={handleEditproduct}
                />
            }
            <View style={styles.navigation}>
                <TouchableOpacity
                    style={page === 0 ? styles.disableButton : styles.button}
                    disabled={page === 0 ? true : false}
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
    initialState: state.saleByBusiness
})
const mapDispatchToProps = {
    fetchSalesByBusiness
}
export default connect(mapStateToProps, { ...mapDispatchToProps })(Sale);

