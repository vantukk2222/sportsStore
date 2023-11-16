// ProductDetail.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductbyId } from '../../redux/reducer/productReducer/getDetailProduct';
import Loading from "../../component/loading";
import { useNavigation } from '@react-navigation/native';
const ProductDetail = ({ route }) => {
    const { id } = route.params;
    console.log(id);


    const dispatch = useDispatch();
    const product = useSelector((state) => state.productDetail.data);
    const loading = useSelector((state) => state.productDetail.loading);
    const error = useSelector((state) => state.productDetail.error);

    useEffect(() => {
        dispatch(fetchProductbyId(id));
    }, []);

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <Text style={{ color: 'red' }}>Error: {error}</Text>;
    }
    //console.log(product.imageSet[0].url)
    return (
        <View style={styles.container}>
            <Image source={{ uri: product.imageSet[0].url }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <Text style={styles.productDescription}>{ }</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    productImage: {
        width: 300,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 16,
    },
    productDetails: {
        alignItems: 'center',
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black',
    },
    productPrice: {
        fontSize: 18,
        color: '#555',
        marginBottom: 8,
    },
    productDescription: {
        fontSize: 16,
        color: '#333',
    },
});

export default ProductDetail;
