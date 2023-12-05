import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { startMapper } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByBusiness } from '../../redux/reducers/Business/getProductByBusiness';
import ProductItem from '../Product/ProductItem';
import { colors, fontSize, images } from '../../constants/index';
import Loading from '../../components/loading';

const Business = ({ navigation, route }) => {
    const { business } = route.params;


    const [product, setProduct] = useState();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState('id');
    const [desc, setDesc] = useState(true);
    const [state, setState] = useState(0);
    const [selected, setSelected] = useState(1);

    const [totalPages, setTotalPages] = useState(1);


    const { dataProductbyBusi, loadingProductbyBusi, errorProductbyBusi } = useSelector((state) => state.productByBusiness);
    const dispatch = useDispatch();
    useEffect(() => {
        //console.log('Call api by view')
        dispatch(fetchProductsByBusiness(business.id, page, pageSize, sort, desc, state))
    }, [business, page, pageSize, sort, desc, state])
    useEffect(() => {
        setProduct(dataProductbyBusi.content)
        //console.log('product by business', dataProductbyBusi.content);
        setTotalPages(dataProductbyBusi.totalPages)
        //console.log('data product by business', dataProductbyBusi)

    }, [dataProductbyBusi])

    const findMainImage = (Listimg) => {
        for (let i = 0; i < Listimg.length; i++) {
            if (Listimg[i].is_main === true) {
                //console.log(images[i].url)
                var img = Listimg[i].url
                //  setImages(im)
                return Listimg[i].url;
            }
        }
        return Listimg.length > 0 ? Listimg[0].url : null;
    }
    const renderButton = (iconName, text, index) => {
        const isSelected = selected === index;
        return (
            <TouchableOpacity style={[styles.statusPenjualan, { backgroundColor: isSelected ? colors.alert : colors.trangXam }]}
                onPress={() => { setSelected(index) }}>
                <Icon name={iconName} style={{ flex: 1, marginLeft: '2%', marginTop: '5%' }} size={25} color={isSelected ? "white" : '#EE4D2D'} />
                <Text style={[styles.textStatus, { color: isSelected ? '#FFFFFF' : '#000000' }]}>{text}</Text>
            </TouchableOpacity>
        )
    }

    const handleGoDetail = (item) => {
        // asyncStorage.removeAuthToken()
        navigation.navigate('DetailProduct', {
            item: item,
            //id_user: dataUser.id,
        });
    };
    if (loadingProductbyBusi) {
        return <Loading />
    }

    return (
        <ScrollView style={{ flex: 100, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity style={styles.back} onPress={() => { navigation.goBack() }}>
                        <Icon name="arrow-left" size={24} color={'#EE4D2D'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chat} onPress={() => alert('Soon!')}>
                        <Icon name="comments" size={24} color={'#EE4D2D'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{ paddingBottom: 10, flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
                        <View style={{ height: 60, paddingLeft: 20, justifyContent: 'center' }}>
                            <Image style={{ width: 80, height: 80, borderRadius: 50 }} source={require('../../assets/images/avarta.jpg')} />
                        </View>
                        <View style={{ flexDirection: 'column', margin: 5, marginLeft: 10 }}>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#000' }}>{business?.name}</Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ fontSize: 12, color: 'black' }}>
                                        {business?.count_product} Sản phẩm
                                    </Text>
                                    <View style={{ marginLeft: '6%', height: '100%', borderWidth: 0.4, backgroundColor: 'black' }}></View>
                                    <Text style={{ marginLeft: '6%', fontSize: 12, color: 'black' }}>{business?.count_comment_like} Lượt thích</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.body]}>
                    <View style={styles.itemPenjualan}>
                        {renderButton('shopping-cart', 'Shop', 1)}
                        {renderButton('bars', 'Sản phẩm', 2)}
                        {renderButton('tag', 'Danh mục', 3)}
                    </View>
                </View>
                {selected === 1 ?
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
                        }}>{product?.attribute}</Text>
                    </View>

                    : selected === 2 ?
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop: 3 }}>

                            <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: colors.facebook, marginTop: 1 }}>

                                {product?.map((item) => (

                                    < TouchableOpacity
                                        key={item.id}
                                        onPress={() => handleGoDetail(item)}
                                        style={{ width: '50%', paddingHorizontal: 5, marginBottom: 10, }}>
                                        <ProductItem
                                            imageSource={findMainImage(item?.imageSet)}
                                            productName={item.name}
                                            productPrice={item.price_min}
                                        />
                                    </TouchableOpacity>
                                ))}
                                <View style={styles.containerPages}>
                                    <View style={styles.iconBackPage}>
                                        <Icon
                                            onPress={() => {
                                                if (page > 0) {
                                                    setPage(page - 1);
                                                }
                                            }}
                                            name="chevron-left"
                                            size={25}
                                            color={colors.accent}
                                            style={{ marginTop: 5 }}
                                        />
                                    </View>

                                    <Text style={styles.buttonText}>{page < totalPages - 1 ? page : 'Hết'}</Text>

                                    <View style={styles.iconNextPage}>
                                        <Icon
                                            onPress={() => {
                                                console.log(page)
                                                if (page < totalPages - 1) {
                                                    setPage(page + 1);
                                                }
                                            }}
                                            name="chevron-right"
                                            size={25}
                                            color={colors.accent}
                                            style={{ marginTop: 5 }}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>


                        : <View style={styles.moreContainer}>
                            <Text style={{ color: 'black', fontSize: 18, fontWeight: 500, marginHorizontal: 10 }}>
                                Danh mục:
                            </Text>
                            <Text style={{
                                color: 'black',
                                fontSize: 18,
                                marginHorizontal: 10,
                                marginVertical: 2,
                                alignItems: 'flex-start'
                            }}>{product?.attribute}</Text>
                        </View>}

            </View >

        </ScrollView >

    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        height: 40,
        width: '100%',
        backgroundColor: '#FFFFFF',
        flex: 20
    },
    headerTop: {
        flexDirection: 'row',
        top: 15,
        alignItems: 'center'
    },
    detailsContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        elevation: 19,
        marginTop: 20,
        width: '90%',
        height: 800
    },
    moreContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        elevation: 19,
        marginTop: 20,
        width: '90%',
        height: 600
    }, productContainer: {
        marginTop: 1,
        backgroundColor: 'white',
        padding: 16,
        elevation: 19,
        width: '100%',
        height: 60,
        alignItems: 'flex-start',
    },
    back: {
        flex: 1,
        paddingLeft: 20,
    },
    chat: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 30,
    },
    container: {
        alignItems: 'center',
        height: '80%',
        marginTop: 80,
        backgroundColor: 'white',
    },
    body: {
        backgroundColor: 'white',
        flexDirection: 'column',
        width: '100%',
    },
    items: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        height: 45,
        alignItems: 'center',
    },
    itemPenjualan: {
        marginTop: 10,
        flexDirection: 'row',
        height: 55,
        borderColor: '#f2f2f2',
        borderTopWidth: 0.4,
        borderBottomWidth: 0.4,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black'

    },
    textPenjualan: {
        flex: 6,
        color: '#000000'
    },
    statusPenjualan: {
        flex: 1,
        alignItems: 'center',
    },
    textStatus: {
        flex: 1,
        fontSize: 11,
        color: 'black'
    },
    text: {
        flex: 8,
        color: '#000000'
    },
    containerPages: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 15,
        marginRight: 30,
        marginLeft: 30,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    iconBackPage: {
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 10,
        borderColor: colors.accent,
        borderWidth: 1, // Độ dày đường viền
        borderRadius: 5,
    },
    iconNextPage: {
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 10,
        borderColor: colors.accent,
        borderWidth: 1, // Độ dày đường viền
        borderRadius: 5,
    },
    buttonText: {
        color: colors.primary,
        fontSize: fontSize.h3,
    },
});

export default Business;
