import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, Image, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize, images } from '../../constants/index';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSizeProduct } from '../../redux/reducers/Size/getProduct';
import Loading from '../../components/loading';
import { formatMoneyVND } from '../../utilies/validation';
import addToCart from '../../API/Cart/addToCart';
import { addToCartUser } from '../../redux/reducers/Cart/cartReducer';
import { toastsuccess } from '../../components/toastCustom';
import Toast from 'react-native-toast-message';
const ModalBuyProduct = ({ route }) => {

    const { product, id_user } = route.params;
    const [selectedSizeId, setselectedSizeId] = useState(null);
    const [selectedID_Product, setSelectedID_Product] = useState(product?.productSet[0]?.id)
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(1);

    // product theo size cu the 
    const { dataSizeProduct, loadingSizeProduct, errorSizeProduct } = useSelector((state) => state.sizeProduct);
    const navigation = useNavigation();
    const dispatch = useDispatch()
    // console.log('buy:\n', id_user)
    useEffect(() => {
        dispatch(fetchSizeProduct(selectedSizeId))
    }, [selectedSizeId])
    useEffect(() => {
        setTotal(dataSizeProduct.quantity)
        return () => {
            setQuantity(1)
            setTotal(0)
        }
    }, [dataSizeProduct])

    const handleSizeSelect = (size, id) => {
    console.log("data product in modalBuy:", product);

        setQuantity(1);
        setselectedSizeId(size);
        setSelectedID_Product(id)
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };
    const handleBuyPress = () => {
        // console.log("ID_User: ",id_user + "\t" + "ID_Product: ", selectedID_Product + "\t" +"Quantity: ", quantity);
        dispatch(addToCartUser(id_user,selectedID_Product,quantity))
        navigation.goBack()
        toastsuccess("Thành công", "Bạn đã thêm sản phẩm vào giỏ hàng", 1000)
        
    };
    const handleTotalBefore = (sl, gia) => {
        return formatMoneyVND(product?.sale ? (sl * gia*(100-product?.sale)) : (sl * gia));
    }
    return (


        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={25} color={colors.disable} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Lựa chọn sản phẩm</Text>
            </View>
            <View style={styles.imageListContainer}>
                <FlatList
                    style={{ backgroundColor: "#E3E3E3" }}
                    data={product?.imageSet}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{ borderRadius: 8, borderColor: 'black', borderWidth: 1, marginEnd: 10 }}>
                            <Image
                                source={{ uri: item.url }}
                                style={styles.thumbnailImage}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.selectionContainer}>
                <Text style={styles.label}>Chọn cỡ:</Text>

                <View style={styles.buttonContainer}>
                    {product?.productSet?.length > 0 ? product?.productSet?.map((eachSize) => (
                        <TouchableOpacity
                            key={eachSize.id}
                            style={[
                                styles.selectionButton,
                                selectedSizeId === eachSize.id && styles.selectedButton,
                            ]}
                            onPress={() => {handleSizeSelect(eachSize.id,eachSize.id)}}>
                            <Text style={styles.buttonText}>{eachSize.size}</Text>
                        </TouchableOpacity>
                    )) : <Text style={styles.buttonText}>FreeSize</Text>}
                </View>

                {/*<Text style={styles.label}>Select Color:</Text>
                <View style={styles.buttonContainer}>
                    {colors.map((color) => (
                        <TouchableOpacity
                            key={color}
                            style={[
                                styles.selectionButton,
                                selectedColor === color && styles.selectedButton,
                            ]}
                            onPress={() => handleColorSelect(color)}>
                            <View style={[styles.colorCircle, { backgroundColor: color.toLowerCase() }]} />
                        </TouchableOpacity>
                    ))}
                </View> */}

                {selectedSizeId === null ? <Text /> :
                    loadingSizeProduct === true ? <Text /> :
                        <View>
                            <Text style={styles.label}>Số lượng :</Text>
                            <View style={styles.quantityContainer}>

                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => setQuantity(quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    <Text style={styles.quantityButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{quantity}</Text>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => {
                                        if (quantity < total)
                                            setQuantity(quantity + 1)
                                    }}
                                >
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.labelPrice}>Giá:</Text>
                                <View style={styles.quantityContainer}>
                                    <Text style={styles.price}>{handleTotalBefore(quantity, dataSizeProduct?.price)}</Text>
                                </View>
                            </View>
                        </View>

                }




            </View>
            <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
                <Text style={styles.buyButtonText}>Mua</Text>
            </TouchableOpacity>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
        color: 'black'
    },
    imageListContainer: {
        marginTop: 10,
        marginBottom: 20,

    },
    thumbnailImage: {
        width: 90,
        height: 90,
        // marginRight: 10,
        borderRadius: 8,
    },
    selectionContainer: {
        flex: 1,
        paddingTop: 10
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black'
    },
    labelPrice: {
        paddingTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        flexWrap: 'wrap',
        marginTop: 5
    },
    selectionButton: {
        marginTop: 10,
        backgroundColor: colors.lightGray,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray,
        color: 'black',
        width: 100
    },
    selectedButton: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,

    },
    buttonText: {
        fontSize: 16,
        color: 'black'
    },
    colorCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    quantityButton: {
        backgroundColor: colors.trangXam,

        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray,
    },
    quantityButtonText: {
        fontSize: 18,
        color: colors.black,
        color: colors.denNhe,
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 16,
        fontWeight: 'bold',
        color: colors.denNhe,
    },
    price: {
        fontSize: 18,
        marginHorizontal: 26,
        fontWeight: 'bold',
        color: colors.denNhe,
    },
    buyButton: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 8,
    },
    buyButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
export default ModalBuyProduct;