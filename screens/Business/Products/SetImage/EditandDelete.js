import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert, ActivityIndicator, SafeAreaView, Image, BackHandler } from 'react-native';
import { createImages, resetImage } from '../../../../redux/reducers/Images/ImageReducer';
import { editProductinf, resetEditProduct } from '../../../../redux/reducers/productReducer/editProduct';
import { fetchProductbyId, resetProductDetail } from '../../../../redux/reducers/productReducer/getDetailProduct';
import { connect, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../../../constants';
import { toastError, toastsuccess } from '../../../../components/toastCustom';
import ImagePickerComponent from '../UploadImages';
import Loading from '../../../../components/loading';

const EditandDelete = (props) => {
    const route = useRoute()
    const navigation = useNavigation();
    const productId = route.params.productId;
    const {
        productinforState,
        fetchProductbyId,
        imageState,
        createImages,
        editProductState,
        editProductinf
    } = props
    const [listImage, setListImage] = useState([])
    const [newUrl, setNewUrl] = useState([])
    const [product, setProduct] = useState({
        name: '',
        detail: '',
        attribute: '',
        id_business: 0,
        id_sale: null,
        created_at: null,
        updated_at: null,
        id_categorySet: [],
        id_imageSet: [],
    })
    const dispatch = useDispatch()
    useEffect(() => {
        fetchProductbyId(productId)
        return () => {
            dispatch(resetProductDetail())
            dispatch(resetImage())
            dispatch(resetEditProduct())
            setListImage([])
        }
    }, [productId])
    useEffect(() => {
        const p = productinforState?.data[productId]
        //console.log('data ', p.state);
        categorySet = p?.categorySet
        imageSet = p?.imageSet
        setProduct({
            name: p?.name,
            detail: p?.detail,
            attribute: p?.attribute,
            id_business: p?.business?.id,
            id_sale: null,
            created_at: p?.created_at ? new Date(p?.created_at) : new Date(),
            updated_at: p?.updated_at ? new Date(p?.updated_at) : new Date(),
            id_categorySet: categorySet?.map(item => (item.id)),
            id_imageSet: imageSet?.map(item => (item.id))

        });
        const listI = imageSet?.map(item => ({ id: item.id, url: item.url, is_main: item.is_main }))
        setListImage(listI)

    }, [productinforState?.data])
    useEffect(() => {
        if (listImage?.length > 0) {
            const oldL = listImage?.map(item => (item.id))
            setProduct((prePro) => ({
                ...prePro, id_imageSet: oldL
            }))
        }
    }, [listImage])
    useEffect(() => {

        if (imageState?.dataImage && imageState?.dataImage !== null) {
            const oldL = listImage?.map(item => (item.id))
            oldL.push(imageState?.dataImage)
            console.log('oldL', oldL);
            setProduct((prePro) => ({
                ...prePro, id_imageSet: oldL
            }))

            toastsuccess('Thêm ảnh', 'Thành công')
            dispatch(resetImage())
        }


    }, [imageState?.dataImage])
    if (productinforState?.error) {
        toastError('Lổi', 'Kết nối lại');
        navigation.goBack();
    }
    console.log(product);
    //useEffect(()=>Ơ)
    const createImageObject = (name, url, is_main) => {
        return {
            name: name || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_main: is_main,
            url: url || '',
        };
    };
    //console.log(listImage);
    const handleImagePress = (index, main) => {
        if (main) {
            toastError('Xoá ảnh', 'Không thể xóa ảnh chính')
        }
        else {
            Alert.alert(
                'Xác nhận',
                'Bạn có muốn xóa ảnh này, ảnh sẽ không thể khôi phục',
                [
                    {
                        text: 'Hủy',
                        style: 'cancel'
                    },
                    {
                        text: 'Xóa',
                        onPress: () => {
                            setListImage((prevImage) =>
                                prevImage.filter((image, i) => i !== index)
                            );
                            toastsuccess('Xóa ảnh', 'Thành công')
                        }
                    },
                ],
                { cancelable: false }
            );

        }


    };
    const renderImages = () => {
        return listImage?.map((item, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(index, item.is_main)}
            >
                {item.is_main === true ?
                    <Image
                        style={{ height: 70, width: 70, marginRight: 10, borderRadius: 8, borderWidth: 0.6, borderColor: 'red' }}
                        source={{ uri: item.url }}
                    /> :
                    <Image
                        style={{ height: 70, width: 70, marginRight: 10, borderRadius: 8, borderWidth: 0.6, borderColor: 'black' }}
                        source={{ uri: item.url }}
                    />
                }
            </TouchableOpacity>

        ));
    };
    const renderNewImages = () => {
        if (newUrl?.length > 0) {
            return newUrl?.map((item, index) => (
                <Image
                    key={index}
                    style={{ height: 70, width: 70, marginRight: 10, borderRadius: 8, borderWidth: 0.6, borderColor: 'black' }}
                    source={{ uri: item }}
                />))
        }


    };
    const handleListUrlChange = (field, newUrl) => {
        console.log('newUrl', newUrl);
        Alert.alert(
            'Xác nhận thêm ảnh này vào sản phẩm? ',
            'Nếu không hãy nhấn vào ảnh để bỏ lựa chọn này!',
            [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text: 'Thêm',
                    onPress: () => {
                        const currentDate = new Date();
                        const currentDateTime = currentDate.toISOString();
                        createImages(createImageObject(`Image${productId},${currentDateTime}`, newUrl, false))
                        setNewUrl([newUrl])
                        // toastsuccess('Thêm', 'Thành công')
                    }
                },
            ],
            { cancelable: false }
        );
    }
    useEffect(() => {
        console.log(imageState.errorImage);
        if (imageState.errorImage) {
            setNewUrl((prevImage) => {
                const updatedUrls = [...prevImage];
                updatedUrls.pop(); // Loại bỏ phần tử cuối cùng
                return updatedUrls;
            });
        }
    }, [imageState.errorImage]);

    const handleSubmit = () => {
        editProductinf(productId, product)
        navigation.navigate('Product');
        // navigation.navigate('Product')
    }
    useEffect(() => {
        // Lắng nghe sự kiện khi component được mount
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);

        // Lắng nghe sự kiện khi component sắp bị unmount
        return () => {
            backHandler.remove(); // Loại bỏ lắng nghe sự kiện khi component unmount
            // Kiểm tra nếu component chưa unmount thì mới thực hiện các công việc reset
            if (!unmounted) {
                dispatch(resetProductDetail());
                dispatch(resetImage());
                dispatch(resetEditProduct());
                setListImage([]);
            }
        };
    }, [productId]);

    const handleHardwareBackPress = () => {
        navigation.navigate('Product');
        return true; // Ngăn chặn xử lý mặc định của nút "Back"
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Danh sách ảnh hiện có:</Text>
                <ScrollView style={{ marginBottom: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 100, marginBottom: 10, marginHorizontal: 5 }}>
                        {renderImages()}
                    </View>
                </ScrollView>
                {newUrl?.length > 0 ?
                    <ScrollView>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Danh sách ảnh vừa thêm:</Text>
                        <ScrollView style={{ marginBottom: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: 100, marginBottom: 10, marginHorizontal: 5 }}>
                                {renderNewImages()}
                            </View>
                        </ScrollView>

                    </ScrollView>
                    :
                    <View></View>
                }
                <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Thêm ảnh mới:</Text>
                <ImagePickerComponent onUrlChange={handleListUrlChange} isSale={true} />

            </ScrollView>

            {productinforState?.loading ? <Loading /> :
                <TouchableOpacity
                    onPress={() => handleSubmit()}
                    style={{
                        marginTop: 5,
                        height: 50,
                        width: 200,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        borderWidth: 0.5,
                        borderColor: 'black',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginBottom: 5,
                    }} >
                    {productinforState?.loading ? <ActivityIndicator size="large" color={colors.success} /> :
                        <Text style={{ fontSize: 20, color: 'black', fontSize: 20, fontWeight: '500' }}>Chỉnh ảnh</Text>}
                </TouchableOpacity>
            }



        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginHorizontal: 2,
        backgroundColor: colors.trangXam,
        borderRadius: 8,
        borderColor: 'gray',
        borderWidth: 0.4
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
        color: 'black',

    },
})
const mapStateToProps = (state) => ({
    productinforState: state.productDetail,
    imageState: state.createImage,
    editProductState: state.editProduct
})
const mapDispatchToProps = {
    fetchProductbyId,
    createImages,
    editProductinf
}
export default connect(mapStateToProps, { ...mapDispatchToProps })(EditandDelete)
