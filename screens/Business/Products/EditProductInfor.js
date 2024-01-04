import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { fetchProductbyId, resetProductDetail } from "../../../redux/reducers/productReducer/getDetailProduct"
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect, useDispatch, useSelector } from 'react-redux';
import { toastConfig, toastError, toastsuccess } from '../../../components/toastCustom';
import ImagePickerComponent from '../Products/UploadImages';
import moment from 'moment'
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../../constants';
import { fetchCategories, resetCategory } from '../../../redux/reducers/Caregory/getAllCategories';
import { SelectList } from 'react-native-dropdown-select-list';
import { createImages, resetImage } from '../../../redux/reducers/Images/ImageReducer';
import { editProductinf, resetEditProduct } from '../../../redux/reducers/productReducer/editProduct';
import Loading from '../../../components/loading';
import LoadingModal from '../../../components/loading';
import Icon from 'react-native-vector-icons/FontAwesome5';

const EditProductInfor = (props) => {
    const route = useRoute()
    const navigation = useNavigation();
    const productId = route.params.productId;
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [urlImage, seturlImage] = useState([])
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
    const {
        productinforState,
        fetchProductbyId,
        initialState,
        fetchCategories,
        imageState,
        createImages,
        editProductState,
        editProductinf,
    } = props
    const [parentArray, setParentArray] = useState([])
    const [childArray, setChildArray] = useState([])
    const [selectedCParent, setSelectedCParent] = useState();
    const dispatch = useDispatch()
    useEffect(() => {
        fetchProductbyId(productId)
        fetchCategories()
        return () => {
            dispatch(resetCategory())
            dispatch(resetProductDetail())
            // dispatch(resetImage())
            dispatch(resetEditProduct())
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
            id_sale: p?.sale?.id,
            created_at: p?.created_at ? new Date(p?.created_at) : new Date(),
            updated_at: p?.updated_at ? new Date(p?.updated_at) : new Date(),
            id_categorySet: categorySet?.map(item => (item.id)),
            id_imageSet: imageSet?.map(item => (item.id))

        });
        setSelectedCategories(categorySet?.map(item => ({ key: item.id, value: item.name })))
    }, [productinforState?.data])
    useEffect(() => {
        // console.log(dataCate[0].categorySet);
        const ArrayP = initialState?.dataCate?.map(item => {
            return {
                key: item.id,
                value: item.name,
            };
        });
        setParentArray(ArrayP)
    }, [initialState?.dataCate])


    const handleInputChange = (field, value) => {
        // console.log(field, value);
        setProduct((preProduct) => ({ ...preProduct, [field]: value }));
    };
    const handlePress = (item) => {
        const isSelected = selectedCategories.some(selectedItem => selectedItem.key === item.key);

        if (isSelected) {
            const updatedCategories = selectedCategories.filter(selectedItem => selectedItem.key !== item.key);
            setSelectedCategories(updatedCategories);
        }
    };
    const getChildArrayById = (parentId) => {
        const parentItem = initialState?.dataCate?.find(item => item.id === parentId);
        if (parentItem && parentItem.categorySet) {
            // Chuyển đổi mảng con sang dạng { key, value }
            return parentItem.categorySet.map(item => ({
                key: item.id,
                value: item.name,
            }));
        }
        return [];
    }
    useEffect(() => {
        const ArrayC = getChildArrayById(selectedCParent)
        setChildArray(ArrayC)
    }, [selectedCParent])

    const addToArrIfKeyNotExists = (arr, object) => {
        const { key, value } = object;
        console.log(object);
        if (!arr.some(item => item.key == key || item.value == value)) {
            console.log(object, selectedCategories);
            setSelectedCategories(prevState => [...prevState, object]);
        }
    };
    const searchByKey = (arr, inputKey) => {
        const foundItem = arr.find(item => item.key === inputKey);
        return foundItem || null;
    };

    useEffect(() => {
        const id_categorySet = selectedCategories?.map(category => category.key);
        handleInputChange('id_categorySet', id_categorySet);
    }, [selectedCategories])

    const handleSubmit = () => {
        editProductinf(productId, product)
        navigation.goBack('Home')


    }
    if (productinforState?.loading) {
        return <LoadingModal />
    }
    return (
        <View style={{flex:100}}>
            <View style={{ flexDirection: 'row', backgroundColor: '#2196F5', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}>
                    <Icon name="angle-left" size={30} style={{
                        color: 'white',
                        alignItems: 'flex-end',
                        marginLeft: 15,
                    }}></Icon>
                </TouchableOpacity>

                <Text style={{
                    padding: 2,
                    paddingRight: 30,
                    color: 'white',
                    fontWeight: '600',
                    fontSize: 24,
                    textAlign: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>Chỉnh sửa sản phẩm </Text>
                <View></View>

            </View>
        <ScrollView style={styles.container}>
            <ScrollView style={{
                flexDirection: 'row',
                borderBottomColor: 'gray',
                borderBottomWidth: 0.8,
                borderTopWidth: 0.8,
                borderTopColor: 'black'
            }} horizontal>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditandDelete', { productId: productId })}
                    style={styles.buttonEdit}>
                    <Text style={{ fontSize: 20, color: 'black', fontSize: 20, fontWeight: '500' }}>Chỉnh ảnh</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProductSize', { productinforId: productId })}
                    style={styles.buttonEdit} >
                    <Text style={{ fontSize: 20, color: 'black', fontSize: 20, fontWeight: '500' }}>Kích thước</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CreateSize', { id_productinformation: productId, isEdit: true })}
                    style={styles.buttonEdit} >
                    <Text style={{ fontSize: 20, color: 'black', fontSize: 20, fontWeight: '500' }}>Thêm kích thước</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SetMain', { productId: productId })}
                    style={styles.buttonEdit} >
                    <Text style={{ fontSize: 20, color: 'black', fontSize: 20, fontWeight: '500' }}>Chọn ảnh chính</Text>
                </TouchableOpacity>

            </ScrollView>
            <View style={styles.inputView}>
                <Text style={styles.inputText}>Tên sản phẩm:</Text>
                <TextInput
                    backgroundColor={'white'}
                    style={styles.input}
                    color={colors.denNhe}
                    placeholderTextColor={'gray'}
                    value={product?.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                    placeholder="Nhập tên sản phẩm"
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.inputText}>Chi tiết:</Text>
                <TextInput
                    backgroundColor={'white'}
                    style={styles.input}
                    color={colors.denNhe}
                    placeholderTextColor={'gray'}
                    value={product?.detail}
                    onChangeText={(value) => handleInputChange('detail', value)}
                    placeholder="Nhập chi tiết sản phẩm"
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.inputText}>Thuộc tính:</Text>
                <TextInput
                    backgroundColor={'white'}
                    style={styles.input}
                    color={colors.denNhe}
                    placeholderTextColor={'gray'}
                    value={product?.attribute}
                    onChangeText={(value) => handleInputChange('attribute', value)}
                    placeholder="Thuộc tính sản phẩm"
                />
            </View>
            {/* <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Doanh nghiệp ID: {id_business}</Text> */}

            <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', marginTop: 10 }}>Danh mục:</Text>

            <View style={{ paddingHorizontal: 10, paddingTop: 20, marginBottom: 5 }}>
                <View style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 5
                }}>
                    {selectedCategories &&
                        selectedCategories.map(item => (
                            <TouchableOpacity
                                key={item.key}
                                onPress={() => handlePress(item)}>
                                <Text style={{ color: 'black', height: 25, marginLeft: 3, borderRadius: 4, borderWidth: 0.4, borderColor: 'blue', marginTop: 4 }}>
                                    {item.value}
                                </Text>
                            </TouchableOpacity>

                        ))
                    }
                </View>

                {
                    parentArray.length > 0 && <SelectList
                        setSelected={(val) => {
                            setSelectedCParent(val)
                            //addToArrIfNotExists(selectedCategories, val)

                        }}
                        data={parentArray}
                        placeholder={"Select Category"}
                        dropdownTextStyles={{ color: 'black' }}
                        inputStyles={{ color: 'black' }}
                        boxStyles={{ marginTop: 15 }}
                    />
                }
                {
                    childArray.length > 0 && < SelectList
                        setSelected={(val) => {
                            addToArrIfKeyNotExists(selectedCategories, searchByKey(parentArray, selectedCParent))
                            addToArrIfKeyNotExists(selectedCategories, searchByKey(childArray, val))
                        }}
                        data={childArray}
                        placeholder={"Select Detail Category"}
                        dropdownTextStyles={{ color: 'black' }}
                        inputStyles={{ color: 'black' }}
                        boxStyles={{ marginTop: 15 }}
                    />
                }
            </View>



            {/* <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Hình ảnh:</Text> */}
            {/* <Button title="Chọn ảnh" onPress={handleImageUpload} />

            <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>ID Hình ảnh: {id_imageSet}</Text> */}
            {/* <ImagePickerComponent onEditUrl={handleListUrlChange} listOldUrl={urlImage} /> */}

            {productinforState?.loading ? <Loading /> :
                <TouchableOpacity
                    onPress={() => handleSubmit()}
                    style={{
                        marginTop: 25,
                        height: 50,
                        width: 200,
                        backgroundColor: 'green',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginBottom: 20,
                    }} >
                    {productinforState?.loadingProductInfor ? <ActivityIndicator size="large" color={colors.success} /> :
                        <Text style={{ fontSize: 20, color: 'white', fontSize: 20, fontWeight: '500' }}>Lưu</Text>}
                </TouchableOpacity>
            }

        </ScrollView >
        </View>
    );



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
        marginTop: 5

    },
    buttonEdit: {
        // marginTop: 5,
        height: 50,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        marginLeft: 8
    },
    inputView: {
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginVertical: 10
    },
    inputText: {
        color: 'black'
        , fontSize: 20
        , fontWeight: '500'
    },
    input: {
        marginTop: 10,
        borderRadius: 8,
    }
})
const mapStateToProps = (state) => ({
    productinforState: state.productDetail,
    initialState: state.categories,
    imageState: state.createImage,
    editProductState: state.editProduct
})
const mapDispatchToProps = {
    fetchProductbyId,
    fetchCategories,
    createImages,
    editProductinf
}
export default connect(mapStateToProps, { ...mapDispatchToProps })(EditProductInfor)