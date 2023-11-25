import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, Image, TouchableOpacity, View, } from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize, images } from '../../constants/index';
import { fetchProductsByCategories } from '../../redux/reducers/Caregory/getProductByCategory';
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../components/loading";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const SPACING = 28;
const CELL_WIDTH = 400 * 0.64;
const CELL_HEIGHT = CELL_WIDTH * 1.4;
const FULLSIZE = CELL_WIDTH + SPACING * 2;
export const findMainImage = (images) => {
    for (let i = 0; i < images.length; i++) {
        if (images[i].is_main === true) {
            // console.log(images[i].url)
            return images[i].url;
        }
    }
    return images.length > 0 ? images[0].url : null;
}


const ListProductByCategory = ({ route, navigation }) => {
    const { item } = route.params;
    const [tabs, setTabs] = useState();
    const [products, setProducts] = useState();
    const [idCate, setIdCate] = useState();
    const [selectedTab, setSelectedTab] = useState();

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState('id');
    const [desc, setDesc] = useState(true);


    const { dataProductbyCate, loadingProductbyCateCate, errorProductbyCateCate } = useSelector((state) => state.productsByCategory);
    const dispatch = useDispatch();


    useEffect(() => {
        setTabs(item.categorySet)
        setIdCate(item.categorySet[0].id)
        // setSelectedTab()
        //console.log(item.categorySet[0].id)
    }, [item])

    useEffect(() => {
        dispatch(fetchProductsByCategories(idCate, page, pageSize, sort, desc))
    }, [idCate, page, pageSize, sort, desc])
    useEffect(() => {
        setProducts(dataProductbyCate.content)
        console.log("datacategoryapi: \n ", dataProductbyCate.content)
    }, [dataProductbyCate])


    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.accent }}>
                <FlatList
                    data={tabs}
                    keyExtractor={(item, index) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ backgroundColor: 'white', flexGrow: 0 }}
                    contentContainerStyle={{ padding: SPACING / 2 }}
                    renderItem={({ item }) => {
                        return <TouchableOpacity onPress={() => {
                            setIdCate(item.id)
                        }}>
                            <View style={[styles.pill,
                            {
                                backgroundColor:
                                    item.id === idCate ? colors.accent : colors.trangXam,
                            }
                            ]} >
                                <Text style={[styles.pillText,
                                { color: idCate === item.id ? 'white' : 'black' },
                                ]}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    }}
                />
                {loadingProductbyCateCate === true ? <Loading /> : products && products.length > 0 ?
                    <View>
                        <FlatList
                            style={{
                                backgroundColor: colors.accent, marginBottom: 2,
                                borderRadius: 1,
                                borderColor: 'gray',
                                borderWidth: 1
                            }}
                            data={products}
                            keyExtractor={item => item.id}
                            snapToInterval={FULLSIZE}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            decelerationRate={'fast'}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => { navigation.navigate('DetailProduct', { item }) }}
                                        style={{
                                            width: CELL_WIDTH - 2, height: CELL_HEIGHT - 2,
                                            margin: SPACING,
                                            padding: 1,
                                            borderRadius: 8,
                                            borderColor: 'black',
                                            borderWidth: 3

                                        }}>
                                        <View style={{ flex: 1, padding: SPACING, justifyContent: 'center' }}>
                                            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: colors.trangXam }]} />
                                            <View style={{
                                                position: 'absolute', top: SPACING,
                                                left: SPACING
                                            }}>
                                                <Text style={styles.name}>{item.name}</Text>
                                                <Text style={styles.price}>{item.price}</Text>
                                            </View>
                                            <Image
                                                source={{ uri: findMainImage(item.imageSet) }}
                                                style={styles.images} />
                                        </View>
                                    </TouchableOpacity>

                                )
                            }}>

                        </FlatList >
                        <FlatList
                            style={{ backgroundColor: colors.accent }}
                            data={products}
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (<View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center', backgroundColor: colors.trangXam,
                                    padding: SPACING,
                                    marginBottom: 2,
                                    borderRadius: 8,
                                    borderColor: 'black',
                                    borderWidth: 2,
                                    marginTop: 2
                                }}>

                                    <Image
                                        source={{ uri: findMainImage(item.imageSet) }}
                                        style={styles.popularImage} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.popularName}>{item.name}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: 'blue', fontWeight: '700' }}>{item.brand}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.popularPrice}>{item.price}</Text>
                                </View>)
                            }}
                        />
                    </View>

                    : <Text style={{ color: 'black' }}>No products available</Text>}
            </SafeAreaView >

        </ScrollView>
    )


}
export default ListProductByCategory
const styles = StyleSheet.create({
    pill: {
        paddingHorizontal: SPACING,
        paddingVertical: SPACING / 2,
        borderRadius: 12,
    },
    pillText: {
        fontWeight: '700'
    },
    popularImage: {
        width: 64,
        height: 64,
        resizeMode: 'contain',
        marginRight: SPACING,
    },
    popularName: {
        fontWeight: '800',
        fontSize: 16,
        color: colors.denNhe
    },
    popularPrice: {
        fontWeight: '800',
        color: 'yellow'
    },
    name: {
        fontWeight: '800',
        fontSize: 12,
        color: 'black'
    },
    price: {
        fontSize: 14,
        opacity: 0.8,
        color: colors.vangNhat
    },
    images: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginRight: SPACING,
        alignSelf: 'center',
        position: 'absolute'
    },

})

