import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, Image, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize, images } from '../../constants/index';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuantitybyId } from '../../redux/reducers/Size/getQuantityReducer';
import Loading from '../../components/loading';
const ModalBuyProduct = ({ route }) => {

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(1);

    const { dataQuality, loadingQuality, errorQuality } = useSelector((state) => state.quantity);
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { product } = route.params;
    //console.log('buy:\n', product)

    useEffect(() => {

        dispatch(fetchQuantitybyId(selectedSize))
    }, [selectedSize])
    useEffect(() => {
        setTotal(dataQuality)
        return () => {
            setQuantity(1)
            setTotal(0)
        }
    }, [dataQuality])

    const handleSizeSelect = (size) => {
        setQuantity(1);
        setSelectedSize(size);
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };
    const handleBuyPress = () => {
        // Handle Buy button press
    };
    return (


        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={25} color={colors.disable} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Product Selection</Text>
            </View>
            <View style={styles.imageListContainer}>
                <FlatList
                    data={product?.imageSet}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{ borderRadius: 8, borderColor: 'black', borderWidth: 1 }}>
                            <Image
                                source={{ uri: item.url }}
                                style={styles.thumbnailImage}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.selectionContainer}>
                <Text style={styles.label}>Chọn Size:</Text>

                <View style={styles.buttonContainer}>
                    {product?.sizeProductSet?.length > 0 ? product?.sizeProductSet?.map((eachSize) => (
                        <TouchableOpacity
                            key={eachSize.id}
                            style={[
                                styles.selectionButton,
                                selectedSize === eachSize.id && styles.selectedButton,
                            ]}
                            onPress={() => handleSizeSelect(eachSize.id)}>
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
                <Text style={styles.label}>Số lượng :</Text>
                {loadingQuality === true ? <View /> :
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
                    </View>}


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
        marginBottom: 80,
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
        flexWrap: 'wrap'

    },
    thumbnailImage: {
        width: 90,
        height: 90,
        // marginRight: 10,
        borderRadius: 8,
    },
    selectionContainer: {
        flex: 1,
    },
    label: {
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