import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Button, StyleSheet, SafeAreaView, Image, BackHandler } from 'react-native';
import { fetchProductbyId, resetProductDetail } from '../../../../redux/reducers/productReducer/getDetailProduct';
import { connect, useDispatch } from 'react-redux';
import { reset } from '../../../../redux/reducers/User/setInforUser';
import { colors } from '../../../../constants';
import { resetChangeIsmain, setChangeIsmain } from '../../../../redux/reducers/Images/ChangeIsmain';
import LoadingModal from '../../../../components/loading';
import { toastError, toastsuccess } from '../../../../components/toastCustom';

const SetMain = (props) => {
    const route = useRoute()
    const productId = route.params.productId
    const [imageList, setImageList] = useState([])
    const [unmounted, setUnmounted] = useState(false); // Add the unmounted state
    const {
        fetchProductbyId,
        productinforState,
        setChangeIsmain,
        changeIsmainState
    } = props
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [chooseImg, setChooseImg] = useState({
        url: '',
        id: null
    })

    useEffect(() => {
        fetchProductbyId(productId)
        return () => {
            dispatch(resetProductDetail());
            setImageList([]);
            setUnmounted(true);
            dispatch(resetChangeIsmain()) // Set unmounted to true when component is unmounted
        }
    }, [productId])

    useEffect(() => {
        if (productinforState?.data[productId]) {
            const p = productinforState?.data[productId]
            const listI = p?.imageSet?.map(item => ({ id: item.id, url: item.url, is_main: item.is_main }))
            setImageList(listI)
            listI.map((item) => {
                item.is_main === true && setChooseImg({ url: item.url, id: item.id })
            })

        }
    }, [productinforState?.data])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);

        return () => {
            backHandler.remove();
            if (!unmounted) {
                dispatch(resetProductDetail());
                dispatch(resetChangeIsmain());
                setImageList([]);
            }
        };
    }, [productId]);
    useEffect(() => {
        console.log(changeIsmainState?.dataChangeIsmain);
        if (changeIsmainState?.dataChangeIsmain == 202) {
            toastsuccess('Chọn ảnh', 'Thành công');
            let tempList = imageList;
            tempList.map((item) => {
                if (item.id == chooseImg.id) {
                    item.is_main = true;
                } else {
                    item.is_main = false;
                }
            })
            setImageList(tempList)
        }
    }, [changeIsmainState?.dataChangeIsmain])

    const handleSubmit = () => {
        if (chooseImg.id) {
            console.log(chooseImg);

            setChangeIsmain(chooseImg.id);
        }
    }


    const handleHardwareBackPress = () => {
        navigation.navigate('Product');
        return true;
    };
    if (changeIsmainState?.loadingChangeIsmain) {
        return <LoadingModal />
    }
    if (changeIsmainState?.errorChangeIsmain) {
        toastError('Đổi ảnh', 'Không thành công');
    }
    const renderImages = () => {
        if (imageList.length > 0) {
            return imageList?.map((item) => (
                <View key={item.id} style={{ marginRight: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            item.is_main === false && setChooseImg({ url: item.url, id: item.id })
                        }}>
                        {
                            item.is_main === true ?
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
                </View>
            ));
        }
    };

    const getIsMainImage = () => {
        return (
            <View >
                <Image
                    style={{ height: 200, width: 200, borderRadius: 8, borderWidth: 0.1, borderColor: 'blue' }}
                    source={{ uri: chooseImg.url }}
                />

            </View>
        )


    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1, }}>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 0.4, marginBottom: 15 }}>
                    <Text style={{ color: 'black', fontSize: 25, fontWeight: '500', padding: 10 }}>Danh sách ảnh</Text>

                </View>
                <ScrollView style={{ marginBottom: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 100, marginBottom: 10, marginHorizontal: 5 }}>
                        {renderImages()}
                    </View>
                </ScrollView>

                <View style={{ marginVertical: 30, flex: 1, borderRadius: 8, borderWidth: 0.5, padding: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#B4CFE3', fontSize: 25, fontWeight: '500', paddingBottom: 10 }}>Ảnh chính </Text>
                    {getIsMainImage()}
                </View>
                <View style={{ flex: 1, height: 100, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <TouchableOpacity style={{ position: 'relative', height: 45, width: 100, backgroundColor: '#B4CFE3', alignItems: 'center', justifyContent: 'center', borderRadius: 8, borderWidth: 0.5 }}
                        onPress={() =>
                            handleSubmit()
                        }>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Chọn</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 2,
        backgroundColor: colors.trangXam,
        borderRadius: 2,
        borderColor: 'gray',
        borderWidth: 0.4,
        backgroundColor: '#6A99B8'
    },
})

const mapStateToProps = (state) => ({
    productinforState: state.productDetail,
    changeIsmainState: state.changeIsmain

})

const mapDispatchToProps = {
    fetchProductbyId,
    setChangeIsmain
}
export default connect(mapStateToProps, { ...mapDispatchToProps })(SetMain)
