import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, Image, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize, images } from '../../constants/index';
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../components/loading";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchProductbyId, resetProductDetail } from '../../redux/reducers/productReducer/getDetailProduct';
const SPACING = 8;
export const findMainImage = (Listimg) => {
    for (let i = 0; i < Listimg.length; i++) {
        if (Listimg[i].is_main === true) {
            //console.log(images[i].url)
            return Listimg[i].url;
        }
    }
    return Listimg.length > 0 ? Listimg[0].url : null;
}
const CELL_WIDTH = 400 * 0.64;
const CELL_HEIGHT = CELL_WIDTH * 1.4;

const DetailProduct = ({ navigation, route }) => {


    const dispatch = useDispatch()
    const { item } = route.params;
    const [product, setProduct] = useState()
    const { data, loading, error } = useSelector((state) => state.productDetail);
    const { images, setImages } = useState([])

    console.log(item)
    useEffect(() => {
        dispatch(fetchProductbyId(item.id))
        console.log('item.id\n', item.id)
        return () => {
            // item = null;

            dispatch(resetProductDetail());
        }
    }, [item])
    useEffect(() => {
        setProduct(data)
        console.log('productDetail\n', data)
        return () => {
            setProduct('')
        }
    }, [data])
    // console.log("product", item);

    if (loading) {
        <Loading />
    }
    return (
        < SafeAreaView style={{ flex: 1, }
        }>
            <ScrollView contentContainerStyle={styles.container}>
                {product?.imageSet?.length > 0 ? <Image
                    source={{ uri: findMainImage(product?.imageSet) }}
                    style={styles.image} /> : <Text style={{ color: 'black' }}>No images</Text>}

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
                <View style={styles.productContainer}>
                    <Text style={styles.name}>{product?.name}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 8 }}>
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 500 }}></Text>
                        {product?.categorySet?.length > 0 ?
                            product?.categorySet.map(eachSize => {
                                return <View key={eachSize.name}>
                                    {/* {console.log("Image", image.url)} */}
                                    <Text style={styles.textCategory}>{eachSize.name}</Text>
                                </View>
                            }) : <Text style={{
                                color: 'black'
                            }}>Not found</Text>
                        }
                    </View>
                    {/* <Text style={styles.price}>$99.99</Text> */}
                    <Text style={{
                        color: 'black',
                        fontSize: 24,
                        fontWeight: 500,
                        marginHorizontal: 10,
                        //marginVertical: 2,
                        alignItems: 'flex-start'
                    }}>{product?.price} VND</Text>

                </View>
                <View style={styles.detailsContainer}>
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 500, marginHorizontal: 10 }}>
                        Mô tả:
                    </Text>
                    <Text style={{
                        color: 'black',
                        fontSize: 18,
                        marginHorizontal: 10,
                        marginVertical: 2,
                        alignItems: 'flex-start'
                    }}>{product?.detail}</Text>
                </View>
            </ScrollView>


            {/* <View style={{
                marginTop: 80, padding: 8, borderRadius: 4,
                borderWidth: 0.2,
                borderColor: 'gray', backgroundColor: 'white'

            }}>
                <View style={{
                    flexDirection: 'row'
                    , justifyContent: 'flex-start'
                    , top: 50 * 0.3
                    , padding: 8
                    , flexWrap: 'wrap'
                }}>

                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 500 }}>Size: </Text>
                    {product?.sizeProductSet?.length > 0 ?
                        product?.sizeProductSet.map(eachSize => {
                            return <View key={eachSize.size}>
                                <Text style={{
                                    color: 'black',
                                    borderRadius: 8,
                                    margin: 5,
                                    fontSize: 19,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    alignItems: 'flex-start'
                                }}>{eachSize.size}</Text>
                            </View>
                        }) : <Text style={{
                            color: 'black'
                        }}>FreeSize</Text>
                    }
                </View>
            </View> */}

            <Icon
                name="angle-left"
                size={35}
                color='black'
                style={{
                    padding: SPACING,
                    position: 'absolute',
                    top: 1,
                    left: 4,
                    zIndex: 2
                }}
                onPress={() => {
                    navigation.goBack();
                }}
            />

            {/* Kiem tra login hay chua ??? */}

            <View
                style={
                    {
                        padding: SPACING,
                        position: 'absolute',
                        //top: 220,
                        bottom: 0,
                        height: 80,
                        //  marginHorizontal: 15,
                        borderRadius: 4,
                        borderWidth: 1,
                        backgroundColor: 'white',
                        borderColor: 'black',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',

                    }
                }>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ModalBuyProduct', { product })}
                    style={{
                        borderRadius: 1,
                        borderWidth: 1,
                        borderColor: 'black',
                        backgroundColor: 'green',
                        height: '100%',
                        width: '50%',
                        justifyContent: 'center', // Center vertically
                        alignItems: 'center',
                    }}>
                    <Icon name="cart-plus" size={25} />
                    <Text style={{}}>Add to cart </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    // onPress={() => navigation.navigate('ModalBuyProduct', product)}
                    style={{
                        borderRadius: 1,
                        borderWidth: 1,
                        borderColor: 'black',
                        backgroundColor: colors.google,
                        height: '100%',
                        width: '50%',
                        justifyContent: 'center', // Center vertically
                        alignItems: 'center',
                    }}>
                    <Text style={{ alignItems: 'center', color: 'white', fontWeight: 500, fontSize: 18 }}>Buy Now </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView >


    )
}
export default DetailProduct;
const styles = StyleSheet.create({

    price: {
        fontSize: 14,
        opacity: 0.8,
        color: colors.vangNhat,


    },
    container: {
        padding: 20,
        marginTop: 30
    }, textCategory: {
        color: 'black',
        borderRadius: 8,
        backgroundColor: colors.accent,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 3,
        alignItems: 'flex-start'
    },
    imageListContainer: {
        marginTop: 10,
        marginBottom: 20,

    },
    thumbnailImage: {
        width: 60,
        height: 60,
        // marginRight: 10,
        borderRadius: 8,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 16,
    },
    productContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        elevation: 3,
    },
    detailsContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        elevation: 3,
        marginTop: 20
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: colors.facebook
    },
    price: {
        fontSize: 18,
        color: 'green',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
    },

})