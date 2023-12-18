import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { colors } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../redux/reducers/Caregory/getAllCategories';
import { SelectList } from 'react-native-dropdown-select-list';
import ImagePickerComponent from './UploadImages';

const CreateNewProduct = () => {
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const [id_business, setIdBusiness] = useState(0);
    const [state, setState] = useState(2);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCParent, setSelectedCParent] = useState();
    const [selectedImage, setSelectedImage] = useState(null);
    const [id_imageSet, setIdImageSet] = useState(0);
    const { data, loading, error } = useSelector((state) => state.userData)
    const [nameCategory, setNameCategory] = useState()
 
    const { dataCate, loadingCate, errorCate } = useSelector((state) => state.categories)
    const [parentArray, setParentArray] = useState([])
    const [childArray, setChildArray] = useState([])
    const dispatch = useDispatch();

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
    const addToArrIfNotExists = (arr, number) => {
        if (!arr.includes(number)) {
            setSelectedCategories((precate) => [...precate, number])
        }
    }
    const addToArrIfKeyNotExists = (arr, object) => {
        const { key, value } = object;

        // Kiểm tra xem key (số) đã tồn tại trong mảng chưa
        if (!arr.some(item => item.key === key || item.value === value)) {
            // Nếu chưa tồn tại, thêm đối tượng vào mảng
            setSelectedCategories(prevState => [...prevState, object]);
        }
    };

    const searchByKey = (arr, inputKey) => {
        const foundItem = arr.find(item => item.key === inputKey);
        return foundItem || null; // Trả về phần tử nếu tìm thấy, hoặc null nếu không tìm thấy
    };
    useEffect(() => {
        console.log("id bussiness", data);
        dispatch(fetchCategories());
    }, [data])
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
        console.log("mang cate", selectedCategories)
    }, [selectedCategories])
    useEffect(() => {
        const ArrayC = getChildArrayById(selectedCParent)
        //console.log(ArrayC);
        setChildArray(ArrayC)
        console.log("parent", selectedCParent);
    }, [selectedCParent])
    // useEffect(() => {

    // }, [childArray])

    const handleImageUpload = async () => {
        // Implement image upload logic using Cloudinary
        // Get the image URL and set it to selectedImage state
        // Use the uploaded image URL to create the imageSet on your server
        // Update the id_imageSet state with the response from the server
    };

    const handleSubmit = async () => {
        // Implement your logic to send product data to the server
        // Use id_imageSet state for the imageSet ID
        // ...
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Thêm sản phẩm</Text>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Tên sản phẩm:</Text>
            <TextInput
                color={colors.denNhe}
                placeholderTextColor={'gray'}
                value={name}
                onChangeText={setName}
                placeholder="Nhập tên sản phẩm"
            />

            <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Chi tiết:</Text>
            <TextInput
                color={colors.denNhe}
                placeholderTextColor={'gray'}
                value={detail}
                onChangeText={setDetail}
                placeholder="Nhập chi tiết sản phẩm"
                style={{ height: 90 }}
            />

            <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Doanh nghiệp ID: {id_business}</Text>

            <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', marginTop: 10 }}>Trạng thái: {state}</Text>


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
                            { console.log(searchByKey(parentArray, selectedCParent), searchByKey(childArray, val)); }
                            addToArrIfKeyNotExists(selectedCategories, searchByKey(parentArray, selectedCParent))
                            addToArrIfKeyNotExists(selectedCategories, searchByKey(childArray, val))
                        }}
                        data={childArray}
                        placeholder={"Select Category"}
                        dropdownTextStyles={{ color: 'black' }}
                        inputStyles={{ color: 'black' }}
                        boxStyles={{ marginTop: 15 }}
                    />
                }
            </View>



            <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Hình ảnh:</Text>
            <Button title="Chọn ảnh" onPress={handleImageUpload} />

            <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>ID Hình ảnh: {id_imageSet}</Text>
            <ImagePickerComponent />
            <Button title="Tạo sản phẩm" onPress={handleSubmit} />
        </ScrollView >
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
        marginBottom: 25,
        color: 'black',

    },
})

export default CreateNewProduct;
