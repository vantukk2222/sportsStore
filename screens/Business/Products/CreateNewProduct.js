import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import { colors } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../redux/reducers/Caregory/getAllCategories';
import { SelectList } from 'react-native-dropdown-select-list';
import ImagePickerComponent from './UploadImages';
import { createImages, resetImage } from '../../../redux/reducers/Images/ImageReducer';
import { toastError } from '../../../components/toastCustom';
import { createProductInfor, resetProductInformation } from '../../../redux/reducers/productReducer/createProductInformation';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../../components/loading';
import Icon from 'react-native-vector-icons/FontAwesome5'

const CreateNewProduct = () => {
    const { data, loading, error } = useSelector((state) => state.userData)
    const { dataCate, loadingCate, errorCate } = useSelector((state) => state.categories)
    const { dataProductInfor, loadingProductInfor, errorProductInfor } = useSelector((state) => state.createProductInformation)
    const { dataImage, loadingImage, errorImage } = useSelector((state) => state.createImage);

    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const [attribute, setAttribute] = useState('');
    const [id_business, setIdBusiness] = useState(0);
    const [state, setState] = useState(2);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCParent, setSelectedCParent] = useState();
    const [selectedImage, setSelectedImage] = useState(null);
    const [parentArray, setParentArray] = useState([])
    const [childArray, setChildArray] = useState([])
    const dispatch = useDispatch();
    const [uploadedImages, setUploadedImages] = useState([]);
    const [listIdImage, setListIdImage] = useState([]);



    const navigation = useNavigation();
    const getChildArrayById = (parentId) => {
        const parentItem = dataCate?.find(item => item.id === parentId);
        // Kiểm tra xem có tồn tại parentItem và có thuộc tính categorySet không
        if (parentItem && parentItem.categorySet) {
            // Chuyển đổi mảng con sang dạng { key, value }
            return parentItem.categorySet.map(item => ({
                key: item.id,
                value: item.name,
            }));
        }

        // Nếu không tìm thấy hoặc không có categorySet, trả về mảng trống
        return [];
    }
    const handlePress = (item) => {
        const isSelected = selectedCategories.some(selectedItem => selectedItem.key === item.key);

        if (isSelected) {
            const updatedCategories = selectedCategories.filter(selectedItem => selectedItem.key !== item.key);
            setSelectedCategories(updatedCategories);
        }
    };

    const addToArrIfKeyNotExists = (arr, object) => {
        const { key, value } = object;
        if (!arr.some(item => item.key === key || item.value === value)) {
            setSelectedCategories(prevState => [...prevState, object]);
        }
    };

    const searchByKey = (arr, inputKey) => {
        const foundItem = arr.find(item => item.key === inputKey);
        return foundItem || null;
    };


    //Tao product
    const handleCreateProduct = (name, detail, attribute, id_business, id_categorySet, id_imageSet) => {
        console.log(id_categorySet, id_imageSet);
        return {
            name: name || '',
            detail: detail || '',
            attribute: attribute || '',
            id_business: id_business,
            id_sale: null,
            // created_at: new Date().toISOString(),
            // updated_at: new Date().toISOString(),
            id_categorySet: id_categorySet || [], // Extracting keys from selectedCategories
            id_imageSet: id_imageSet || [], // You may set this value accordingly
        };
    };
    //tao Image
    const createImageObject = (name, url, is_main) => {
        return {
            name: name || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_main: is_main,
            url: url || '',
        };
    };
    useEffect(() => {
        // console.log(name, detail);
        dispatch(fetchCategories());
        setIdBusiness(data.id)
        return () => {
            dispatch(resetImage())
            dispatch(resetProductInformation());
        }
    }, [data])
    //data id image
    useEffect(() => {
        console.log("data image id", dataImage);
        console.log(listIdImage);
        if (dataImage) {

            setListIdImage((preId) => [...preId, dataImage])
        }

    }, [dataImage])
    useEffect(() => {
        if (listIdImage.length > 0 && listIdImage.length === uploadedImages.length && !listIdImage.some(element => element === null)) {
            //console.log('imageSet', listIdImage);
            const id_categorySet = selectedCategories.map(category => category.key);
            dispatch(createProductInfor(handleCreateProduct(name, detail, attribute, id_business, id_categorySet, listIdImage)))

            setListIdImage([])
        }
    }, [listIdImage])

    useEffect(() => {
        // console.log(dataCate[0].categorySet);
        const ArrayP = dataCate?.map(item => {
            return {
                key: item.id,
                value: item.name,
            };
        });
        setParentArray(ArrayP)
    }, [dataCate])

    useEffect(() => {
        const ArrayC = getChildArrayById(selectedCParent)
        //console.log(ArrayC);
        setChildArray(ArrayC)
        //console.log("parent", selectedCParent);
    }, [selectedCParent])
    useEffect(() => {
        console.log('id product information', dataProductInfor);
        if (dataProductInfor) {
            navigation.navigate('CreateSize', { id_productinformation: dataProductInfor })
        }

    }, [dataProductInfor, navigation])

    const handleListUrlChange = (newListUrl) => {
        setUploadedImages(newListUrl);
    };

    if (errorProductInfor) {
        console.log("error", errorProductInfor);
        dispatch(resetProductInformation())
        toastError('Tạo sản phẩm', 'không thành công')
    }

    if (loading || loadingCate || loadingImage || loadingProductInfor) {
        <Loading />
    }
    if (errorCate || errorImage || errorProductInfor || error) {
        toastError("Xin lỗi", "Đã có lỗi xảy ra với kết nối")
        navigation.goBack();
        // return <Loading />;
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
                }}>Thêm sản phẩm </Text>
                <View></View>

            </View>
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Thêm sản phẩm</Text>
            <View style={{ height: 1, backgroundColor: 'gray' }}></View>
            <View style={styles.inputView}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Tên sản phẩm:</Text>

                <TextInput
                    backgroundColor={'white'}
                    style={styles.input}
                    color={colors.denNhe}
                    placeholderTextColor={'gray'}
                    value={name}
                    onChangeText={setName}
                    placeholder="Nhập tên sản phẩm"
                />
            </View>
            <View style={styles.inputView}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Chi tiết:</Text>
                <TextInput
                    color={colors.denNhe}
                    placeholderTextColor={'gray'}
                    value={detail}
                    onChangeText={setDetail}
                    placeholder="Nhập chi tiết sản phẩm"
                    backgroundColor={'white'}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputView}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Thuộc tính:</Text>
                <TextInput
                    backgroundColor={'white'}
                    style={styles.input}
                    color={colors.denNhe}
                    placeholderTextColor={'gray'}
                    value={attribute}
                    onChangeText={setAttribute}
                    placeholder="Thuộc tính sản phẩm"
                //  style={{ height: 90 }}
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
                            //setSelectedCParent(val)
                            // { console.log(searchByKey(parentArray, selectedCParent), searchByKey(childArray, val)); }
                            // addToArrIfKeyNotExists(selectedCategories, searchByKey(parentArray, selectedCParent))
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



            <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Hình ảnh:</Text>
            {/* <Button title="Chọn ảnh" onPress={handleImageUpload} />

            <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>ID Hình ảnh: {id_imageSet}</Text> */}
            <ImagePickerComponent onListUrlChange={handleListUrlChange} />
            <TouchableOpacity title="Tạo sản phẩm"
                onPress={() => {

                    uploadedImages.forEach((item, index) => {

                        const isMain = index === 0
                        dispatch(createImages(createImageObject(`Image${id_business}${index}`, item, isMain)))
                    });


                }}
                style={{
                    marginTop: 5,
                    height: 50,
                    width: 200,
                    backgroundColor: '#3144BA',
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 20,
                }} >
                {loadingProductInfor ? <ActivityIndicator size="large" color={colors.success} /> :
                    <Text style={{ fontSize: 20, color: 'white', fontSize: 20, fontWeight: '500' }}>Tạo sản phẩm</Text>}
            </TouchableOpacity>
        </ScrollView >
        </View>
    );
};
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
        marginBottom: 15,
        color: 'black',

    },
    input: {
        marginTop: 10,
        borderRadius: 8,
    },
    inputView: {
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginVertical: 10
    },
})

export default CreateNewProduct;
