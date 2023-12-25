import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSale, resetSale } from '../../redux/reducers/Sale/getAllSale';
import Loading from '../../components/loading';
import { useNavigation } from '@react-navigation/native';
import { fetchSaleByDiscount } from '../../redux/reducers/Sale/getSaleByDiscount';
import { colors } from '../../constants';
import { toastError } from '../../components/toastCustom';


const windowWidth = Dimensions.get('window').width;

const SalesofBusiness = () => {
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(1)
    const [sort, setSort] = useState('name')
    const [desc, setDesc] = useState(true)
    const [sales, setSales] = useState([]);

    const { dataSalebyDiscount, loadingSalebyDiscount, errorSalebyDiscount } = useSelector((state) => state.saleByDiscount);

    const [discount, setDiscount] = useState([0, 30])
    const [totalPages, setTotalPages] = useState(1);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        console.log(pageSize)
        dispatch(fetchSaleByDiscount(discount[0], discount[1], page, pageSize, sort, desc));

    }, [discount, page, pageSize, sort, desc])

    useEffect(() => {
        //console.log('getALlSale : ', dataSale)
        setSales(dataSalebyDiscount.content)
        setTotalPages(dataSalebyDiscount.totalPages)
    }, [dataSalebyDiscount, totalPages])


    if (errorSalebyDiscount) {
        
        toastError("Xin lỗi", "Đã có lỗi xảy ra với kết nối")
        return <Loading />;
    }
    if (loadingSalebyDiscount) {
        return <Loading />
    }

    const renderItem = ({ item }) => (
        < View style={styles.item} >
            <Image source={{ uri: item.url }} style={styles.image} />
            <View style={{ marginLeft: 10 }}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('ListProductofSale', { item }) }}>
                    <Text style={styles.business}>{item.businessResponse.name}</Text>
                    <Text style={styles.title}>{item.content}</Text>
                </TouchableOpacity>

            </View>
        </View >
    );
    const handleButtonPress = (x, y) => {
        // Xử lý sự kiện khi một TouchableOpacity được nhấn
        setDiscount([x, y])
        console.log(`Button ${x} đã được nhấn.`);
    };
    return (
        <View style={styles.container}>
            <View style={styles.viewsale}>
                <Text style={styles.textTitle}>Sale</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(0, 30)}>
                    <Text style={styles.buttonText}>Giảm 30%</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(31, 50)}>
                    <Text style={styles.buttonText}>Giảm 50%</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(51, 100)}>
                    <Text style={styles.buttonText}>Đại hạ giá</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                style={{ marginTop: 15, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderWidth: 0.1, borderColor: 'black' }}
                data={sales}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
            <View style={styles.containerPage}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    if (page > 0) {
                        setPage(page - 1)
                    }
                }}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => {
                    if (page < totalPages - 1) {
                        setPage(page + 1)
                    }
                }}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginVertical: 5,
        flex: 1

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,

    },
    containerPage: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 0.2,
        borderColor: colors.facebook
    },
    buttonText: {
        color: 'red',
        fontSize: 16,
        fontWeight: '500'
    },
    buttonPage: {
        color: 'black',
        fontSize: 16,
    },
    item: {
        width: windowWidth * 0.8,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#ececec',
        overflow: 'hidden',
        backgroundColor: 'red',
        borderColor: 'gray',
        borderWidth: 0.4
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },

    viewsale: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,

    },
    textTitle: {
        color: 'black',
        fontSize: 35,
        fontWeight: '700'
    },
    viewAll: {
        alignItems: 'flex-start',
        color: 'black',
        fontSize: 16,
        marginTop: 15
    },
    business: {
        color: 'white',
        fontSize: 16,
        paddingLeft: 10,
        marginTop: 5,
        fontWeight: '300',
        textAlign: 'left',
    }, title: {
        padding: 10,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'left',
        color: 'white'
    },
});

export default SalesofBusiness;
