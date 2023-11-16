import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, FlatList, TouchableOpacity } from 'react-native';
import ProductItem from './ProductItem'; // Đảm bảo đường dẫn đến file ProductItem là chính xác
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducer/productReducer/product';
import Loading from "../../component/loading";
import { useNavigation } from '@react-navigation/native';
const ProductList = (props) => {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.data);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sort, setSort] = useState('name');
    const [desc, setDesc] = useState(false);

    const navigation = useNavigation();
    const handleGoDetail = (id) => {
        navigation.navigate('ProductDetail', {
            id: id
        });
    };
    // const url = 'https://png.pngtree.com/png-clipart/20210227/ourmi…ning-shoes-everyday-clipart-png-image_2965548.jpg'
    useEffect(() => {
        dispatch(fetchProducts(page, pageSize, sort, desc));
    }, [page, pageSize, sort, desc]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Text style={{ color: 'red' }}>Error: {error}</Text>;
    }
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>

            <FlatList
                style={{ flexDirection: 'row', margin: 5 }}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleGoDetail(item.id)}>
                        < ProductItem
                            imageSource={item.imageSet[0].url}
                            productName={item.name}
                            productPrice={item.price}
                        />
                    </TouchableOpacity>

                )}
            />
        </ScrollView>
    );
};

export default ProductList;
