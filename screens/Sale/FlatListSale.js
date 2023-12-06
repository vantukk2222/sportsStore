import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSale, resetSale } from '../../redux/reducers/Sale/getAllSale';
import Loading from '../../components/loading';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;

const FlatListSale = () => {
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const { dataSale, loadingSale, errorSale } = useSelector((state) => state.sales);
    const [sale, setSale] = useState([]);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(fetchAllSale(page, pageSize));
        return () => {
            dispatch(resetSale());
        }
    }, [page, pageSize])

    useEffect(() => {
        //console.log('getALlSale : ', dataSale)
        setSale(dataSale.content)
    }, [dataSale])

    if (errorSale) {
        return <View style={{ flex: 1, backgroundColor: 'gray' }}>
            <Text style={{ color: 'white' }}>Not found sales</Text>
        </View>
    }
    if (loadingSale) {
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

    return (
        <View style={styles.container}>
            <View style={styles.viewsale}>
                <Text style={styles.textTitle}>Sale</Text>
                <TouchableOpacity
                >
                    <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={sale}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 15
    },
    item: {
        width: windowWidth * 0.8,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#ececec',
        overflow: 'hidden',
        backgroundColor: 'red',
        borderColor: 'gray',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },

    viewsale: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 5,

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

export default FlatListSale;
