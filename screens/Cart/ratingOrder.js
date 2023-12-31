import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput } from "react-native";
import HeaderComp from "../../components/Header";
import { useEffect, useState } from "react";
import { launchImageLibrary } from 'react-native-image-picker';
import { toastError, toastsuccess } from "../../components/toastCustom";


const RatingOrder = ({ route }) => {
    const { item } = route.params
    const [likeSelected, setLikeSelected] = useState({});
    const [dislikeSelected, setDislikeSelected] = useState({});
    const [listImages, setListImages] = useState([]);
    const [listUrl, setListUrl] = useState([]);
    const [loading, setLoading] = useState(false);
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlo5qxnxw/image/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'jldl1aca';
    console.log(item);
    const ImagePicker = (index) => {
        let options = {
            mediaType: 'photo',
            selectionLimit: 5,
            storageOptions: {
                path: "image",
            },
        };

        launchImageLibrary(options, (response) => {
            if (!response.didCancel && !response.error && response.assets.length > 0) {
                const selectedImages = response.assets.map((image) => image.uri);
                const newListImagesByIndex = [...listImages];

                if (!newListImagesByIndex[index]) {
                    newListImagesByIndex[index] = [];
                }

                const remainingSlots = 5 - (newListImagesByIndex[index].length || 0);
                const newImagesToAdd = selectedImages.slice(0, remainingSlots);
                newListImagesByIndex[index] = [...newListImagesByIndex[index], ...newImagesToAdd];

                setListImages(newListImagesByIndex);
            }
        });
    };


    const ChooseImage = (imageUri) => {
        console.log(imageUri.substring(imageUri.lastIndexOf('/') + 1));
        const formData = new FormData();
        formData.append('file', {
            uri: imageUri,
            type: 'image/jpeg', // Thay thế 'image/jpeg' bằng response.assets[0].type nếu có thông tin về loại file
            name: imageUri.substring(imageUri.lastIndexOf('/') + 1)
        });
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        setLoading(true);

        fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                if (data.secure_url !== '') {
                    const uploadedFileUrl = data.secure_url;
                    setListUrl((prevUrls) => [...prevUrls, uploadedFileUrl]);
                }
                toastsuccess("Xong", "Thêm đánh giá thành công")
                console.log(listUrl);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
                toastError('Thêm ảnh', 'Thất bại');
            });
    };
    const handleImagePress = (idx, index) => {
        const newListImagesByIndex = [...listImages];
        if (newListImagesByIndex[index]) {
            newListImagesByIndex[index] = newListImagesByIndex[index].filter((image, i) => i !== idx);
            setListImages(newListImagesByIndex);
        }
    };
    

    const createImageObject = (name, url, is_main) => {
        return {
            name: name || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_main: is_main,
            url: url || '',
        };
    };
    const handleLikePress = (index) => {
        const likeSelected_arr = { ...likeSelected }
        likeSelected_arr[index] = true
        const dislikeSelected_arr = { ...dislikeSelected }
        dislikeSelected_arr[index] = false
        setLikeSelected(likeSelected_arr);
        setDislikeSelected(dislikeSelected_arr);
    };

    const handleDislikePress = (index) => {
        const likeSelected_arr = { ...likeSelected }
        likeSelected_arr[index] = false
        const dislikeSelected_arr = { ...dislikeSelected }
        dislikeSelected_arr[index] = true
        setLikeSelected(likeSelected_arr);
        setDislikeSelected(dislikeSelected_arr);
    };

    return (<View style={{
        // backgroundColor: 'red',
        flex: 100,
        padding: 5
    }}>
        <HeaderComp init="Rating"></HeaderComp>
        <View style={{
            backgroundColor: 'white',
            padding: 5
        }}>
            <Text style={{ fontSize: 14, color: 'black' }}>Xin hãy đánh giá cẩn thận, để đem lại trải nghiệm tốt nhất về sản phẩm!</Text>
        </View>
        <ScrollView  >
            {item?.bill_detailSet?.map((eachProduct, index) => (
                <View key={index} style={{ backgroundColor: "#EDEDED", flex: 100 }}>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}>
                        <View
                            style={{
                                marginTop: 4,
                                paddingTop: 10,
                                width: '100%',
                                height: 90,
                                flexDirection: 'row',
                                backgroundColor: 'white'
                            }}>
                            <View
                                style={{ paddingLeft: 10 }}>
                                <Image source={{ uri: eachProduct?.product?.image_product_information }}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        resizeMode: 'stretch'
                                    }}></Image>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    paddingLeft: 10
                                }}>
                                <Text numberOfLines={1} style={{ color: 'black', fontSize: 15 }}>{eachProduct?.product?.name_product_information}</Text>
                                <Text numberOfLines={1} style={{ color: 'gray', fontSize: 13 }}>{eachProduct?.product?.size}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                style={[styles.button, likeSelected[index] ? styles.selectedButton : null]}
                                onPress={() => handleLikePress(index)}
                            >
                                <Text style={likeSelected[index] ? styles.selectedText : null}>Like</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, dislikeSelected[index] ? styles.selectedButton : null]}
                                onPress={() => handleDislikePress(index)}
                            >
                                <Text style={dislikeSelected[index] ? styles.selectedText : null}>Dislike</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', marginTop: 4, flexDirection: 'column' }}>
                        <Text style={{
                            fontSize: 16,
                            color: 'black',
                            textAlign: 'center',
                            fontWeight: 600
                        }}>Để lại đánh giá ( Tối đa 200 chữ )</Text>
                        <TextInput maxLength={200}
                            multiline={true}
                            numberOfLines={3} style={{ borderRadius: 1, borderWidth: 1, minHeight: 30, maxHeight: 150 }}>
                        </TextInput>
                    </View>
                    <View style={{ backgroundColor: 'white', marginTop: 2, flexDirection: 'column', alignItems: "center" }}>

                        <Text style={{
                            fontSize: 16,
                            color: 'black',
                            fontWeight: 600
                        }}>Thêm hình ảnh (Tối đa 5 ảnh)</Text>
                        <TouchableOpacity
                            onPress={() => {
                                listImages[index]?.length === 5 ? toastError("Xin lỗi", "Tối đa chỉ được thêm 5 ảnh") : ImagePicker(index)
                            }}
                            style={{

                                backgroundColor: '#8EBAEB',
                                // width:30,height:40,
                                alignItems: 'center',
                                borderWidth: 1,
                                padding:3,
                            }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>Thêm ảnh</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.imagesContainer}>
    {listImages[index] && listImages[index]?.map((imageUri, idx) => (
        <TouchableOpacity  key={idx} style={{ position: 'relative' }} 
        onPress={() => handleImagePress(idx, index)}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <View
                style={{
                    position: 'absolute',
                    right: 5,
                    zIndex: 10,
                    padding: 5,
                }}
            >
                <Text style={{color:'red', fontWeight:600, fontSize:16}}>X</Text>
            </View>
        </TouchableOpacity>
    ))}
</View>


                    {(index < item.bill_detailSet.length - 1) ? (<View style={{
                        margin: 10
                    }}>
                        {/* <Text style={{backgroundColor:'#EDEDED', width:'100%'}}></Text> */}

                    </View>) : null
                    }
                </View>
            ))}



            <View style={{
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: "center",
            }}>
                <TouchableOpacity
                    onPress={() => {
                        item?.bill_detailSet?.map((eachBill) => {
                            console.log("Product", eachBill?.product);
                        })
                    }}
                    // onPress={() => {
                    //     if (listImages.length > 0) {
                    //         listImages.forEach((imageUri) => {
                    //             ChooseImage(imageUri).then(() => {
                    //                 listUrl?.map((eachURL, index) => {
                    //                     const isMain = index === 0
                    //                     dispatch(createImages(createImageObject(`Image Product${1}${index}`, eachURL, isMain)))

                    //                 })
                    //             })
                    //         });
                    //     }
                    // }}
                    style={{

                        backgroundColor: '#8EBAEB',
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        alignItems: 'center',
                        borderWidth: 1,
                    }}>
                    <Text style={{ color: 'white', fontSize: 15 }}>Xác nhận</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    </View>)

}

const styles = StyleSheet.create({
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        margin: 5,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'gray',
    },
    selectedButton: {
        backgroundColor: 'lightblue',
        borderColor: 'blue',
    },
    selectedText: {
        color: 'blue',
        fontWeight: 'bold',
    },
    openButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default RatingOrder;