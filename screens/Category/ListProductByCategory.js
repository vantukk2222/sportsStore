import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize, images } from '../../constants/index';
import { fetchProductsByCategories } from '../../redux/reducers/Caregory/getProductByCategory';
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../components/loading";
import { SafeAreaView } from 'react-native-safe-area-context';

const ListProductByCategory = ({ route, navigation }) => {
    const { item } = route.params;
    const [tabs, setTabs] = useState();
    const [products, setProducts] = useState();
    const [idCate, setIdCate] = useState();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState('name');
    const [desc, setDesc] = useState(true);

    const { dataProductbyCate, loadingProductbyCateCate, errorProductbyCateCate } = useSelector((state) => state.productsByCategory);
    const dispatch = useDispatch();

    useEffect(() => {
        setTabs(item.categorySet)
        setIdCate(item.categorySet[0].id)
        console.log(item.categorySet[0].id)
    }, [item])

    useEffect(() => {
        dispatch(fetchProductsByCategories(idCate, page, pageSize, sort, desc))
    }, [idCate, page, pageSize, sort, desc])
    useEffect(() => {
        setProducts(dataProductbyCate)
        console.log("datacategoryapi", dataProductbyCate)
    }, [dataProductbyCate])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={tabs}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => {
                    // return <View style={}>
                    //     <Text style={}>{item.name}</Text>
                    // </View>
                }}
            />
        </SafeAreaView>
    )


}
export default ListProductByCategory

