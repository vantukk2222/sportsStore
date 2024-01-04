import CheckBox from '@react-native-community/checkbox';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { fetchProductbySale, resetProductbySale } from '../../../redux/reducers/productReducer/getProductBySale';
import { connect } from 'react-redux';
import { colors } from '../../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { fetchProductsByBusiness, resetProductByBusiness } from '../../../redux/reducers/Business/getProductByBusiness';
import { toastsuccess } from '../../../components/toastCustom';
import { findMainImage } from '../../Category/ListProductByCategory';
import { addProductSale, resetProductInSale } from '../../../redux/reducers/Sale/addProductInSale';
import Loading from '../../../components/loading';
import { ActivityIndicator } from 'react-native-paper';
import { removeProInSale, resetRemoveProductinforSale } from '../../../redux/reducers/Sale/removeProduct';

{ }
const setProductinSale = (props) => {
    const route = useRoute();
    const navigation = useNavigation();
    const saleId = route.params?.saleId || null;
    const businessId = route.params?.businessId || null;
    const {
        productSaleState,
        fetchProductbySale,
        initialState,
        fetchProductsByBusiness,
        productOfSaleState,
        addProductSale,
        removeProductState,
        removeProInSale
    } = props

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [sort, setSort] = useState('name')
    const [desc, setDesc] = useState(true)
    const [state, setState] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [isAdd, setIsAdd] = useState(false)

    useEffect(() => {
        console.log(saleId);
        fetchProductbySale(saleId, page, pageSize, sort, desc, state)
        fetchProductsByBusiness(businessId, page, pageSize, sort, desc, state)
        return () => {
            resetProductbySale()
            resetProductByBusiness()
            resetProductInSale()
            resetRemoveProductinforSale()
        }
    }, [saleId, businessId, page, pageSize, sort, desc, state])
    // useEffect(() => {
    //     if (removeProductState?.dataRemoveProduct === 202) {
    //         console.log("status remove product", removeProductState?.dataRemoveProduct);
    //     }
    // }, [removeProductState?.dataRemoveProduct])

    // useEffect(() => {
    //     console.log("status add product", productOfSaleState?.dataProductOfSale);
    // }, [productOfSaleState?.dataProductOfSale])
    useEffect(() => {
        if (isAdd === false) {
            setProducts([])
            //console.log('san pham cua sale', productSaleState?.dataProductbySale?.content)
            if (productSaleState?.dataProductbySale?.content && productSaleState.dataProductbySale.content.length > 0) {
                //console.log('product of sale', productSaleState.dataProductbySale.content);
                setProducts(productSaleState.dataProductbySale.content);
                setTotalPage(productSaleState.dataProductbySale.totalPages);

            }
        }

    }, [productSaleState?.dataProductbySale, isAdd])
    useEffect(() => {
        if (isAdd === true) {
            setProducts([]);
            if (initialState?.dataProductbyBusi?.content && initialState?.dataProductbyBusi?.content.length > 0) {
                const filteredProducts = initialState?.dataProductbyBusi?.content.filter(product => product.sale?.id !== saleId);

                setProducts(filteredProducts);
                console.log(initialState?.dataProductbyBusi?.totalPages);
                setTotalPage(initialState?.dataProductbyBusi?.totalPages || 0);
            }
        }

    }, [initialState?.dataProductbyBusi, isAdd])
    const toggleProductSelection = (productId) => {
        if (selectedProducts.includes(productId)) {
            // Product is already selected, remove it
            setSelectedProducts((prevSelected) =>
                prevSelected.filter((id) => id !== productId)
            );
        } else {
            // Product is not selected, add it
            setSelectedProducts((prevSelected) => [...prevSelected, productId]);
        }
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            // Deselect all products
            setSelectedProducts([]);
        } else {
            // Select all products
            setSelectedProducts(products.map((product) => product.id));
        }
        // Toggle the selectAll state
        setSelectAll(!selectAll);
    };
    const handleNextPage = () => {
        console.log(totalPage);
        if (page < totalPage - 1) {
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
    const handleSubmit = () => {
        console.log(selectedProducts);
        if (selectedProducts.length <= 0) {
            toastsuccess('Cảnh báo', 'Không có sản phẩm nào được chọn')
            return
        }
        if (productOfSaleState?.loadingProductbySale) {
            return
        }
        addProductSale(saleId, selectedProducts)
        setSelectedProducts([])
        navigation.goBack('Sale')
        //setIsAdd(false)

    }
    const handleRemove = () => {
        console.log("select delete", selectedProducts)
        if (selectedProducts.length <= 0) {
            toastsuccess('Cảnh báo', 'Không có sản phẩm nào được chọn')
            return
        }
        if (initialState?.loadingProductbyBusi) {
            return
        }
        removeProInSale(selectedProducts)
        setSelectedProducts([])
        navigation.goBack('Sale')
    }
    const renderItem = ({ item }) => (

        <View style={styles.container}>

            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={selectedProducts.includes(item.id)}
                    onValueChange={() => toggleProductSelection(item.id)}
                    style={styles.checkbox}
                    tintColors={{ true: 'green', false: 'gray' }}
                />
                <View style={styles.contentContainer}>
                    <Image source={{ uri: findMainImage(item?.imageSet) }} style={styles.image} />
                    <Text style={styles.label}>{item.name}</Text>
                </View>

            </View>
        </View>

    );

    return (
        <View style={styles.container}>
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
                }}>Chỉnh sửa Sale </Text>
                <View></View>

            </View>
            <View style={styles.headerContainer}>
                {isAdd === true ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Text style={styles.headerText}>Thêm sản phẩm</Text>
                        <Icon
                            name='list'
                            size={26}
                            color={'gray'}
                            style={{ alignSelf: 'flex-end', padding: 4 }}
                            onPress={() => {
                                setIsAdd(false)
                                setSelectAll(false)
                                setSelectedProducts([])
                            }}
                        />
                    </View>
                    :
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Text style={styles.headerText}>Xem sản phẩm</Text>
                        <Icon
                            name='edit'
                            size={26}
                            color={'gray'}
                            style={{ alignSelf: 'flex-end', padding: 4 }}
                            onPress={() => {
                                setIsAdd(true)
                                setSelectAll(false)
                                setSelectedProducts([])
                            }}
                        />
                    </View>
                }
            </View>
            <View style={{ flex: 1 }}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={selectAll}
                        onValueChange={toggleSelectAll}
                        style={styles.checkbox}
                        tintColors={{ true: 'green', false: 'black' }}
                    />
                    <Text style={styles.label}>Select All</Text>
                </View>

                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <Text style={styles.label} >Đã chọn: {selectedProducts.length} </Text>
            <View style={styles.navigation}>
                <TouchableOpacity
                    style={page === 0 ? styles.disableButton : styles.button}
                    disabled={page === 0 ? true : false}
                    onPress={handlePrevPage}
                >
                    <Text style={{ color: 'white', fontWeight: '500' }}>Trang trước</Text>
                </TouchableOpacity>
                {isAdd === true ?
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}>
                        {productSaleState?.loadingProductbySale === true ? <ActivityIndicator size="large" color={colors.primary} /> :

                            <Text style={{ color: 'white', fontWeight: '500' }}>Thêm</Text>
                        }

                    </TouchableOpacity> :
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRemove}>
                        {initialState?.loadingProductbyBusi === true ? <ActivityIndicator size="large" color={colors.primary} /> :
                            <Text style={{ color: 'white', fontWeight: '500' }}>Xóa</Text>
                        }
                    </TouchableOpacity>
                }
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
//}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        // alignItems: 'flex-start',
        justifyContent: 'center',
        // padding: 16,
        backgroundColor: colors.trangXam
    },
    headerContainer: {
        marginBottom: 10,
        alignItems: 'flex-start',
        borderBottomWidth: 0.8,
        borderBottomColor: 'black',
        width: '100%',
        padding: 10
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'flex-end'
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        width: '100%',
        alignItems: 'center', // Center items vertically
    },
    checkbox: {
        alignSelf: 'flex-start', // Align the checkbox to the start (left)
    },
    labelContainer: {
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 4, // Add some margin to separate the label from the checkbox
    },
    label: {
        color: 'black',
        padding: 5,
        marginRight: 10,
        fontWeight: '500'
        //width: 'auto'
        //backgroundColor: 'red'
    },
    image: {
        width: 80,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 16,
        elevation: 15,
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center', // Canh giữa theo chiều dọc
        marginTop: 20,
        marginBottom: 10,
        width: '100%'
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '30%', // Đặt chiều rộng của nút
    },
    disableButton: {
        backgroundColor: colors.xam,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '30%', // Đặt chiều rộng của nút
    },
});
const mapStateToProps = (state) => ({
    productSaleState: state.getProductBySale,
    initialState: state.productByBusiness,
    productOfSaleState: state.addProductInSale,
    removeProductState: state.removeProductinforSale
})
const mapDispatchToProps = {
    fetchProductbySale,
    fetchProductsByBusiness,
    addProductSale,
    removeProInSale
}
export default connect(mapStateToProps, { ...mapDispatchToProps })(setProductinSale);
