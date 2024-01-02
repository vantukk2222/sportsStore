import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput } from "react-native";
import HeaderComp from "../../components/Header";
import { useEffect, useState } from "react";
import { launchImageLibrary } from 'react-native-image-picker';
import { toastError, toastsuccess } from "../../components/toastCustom";
import moment from "moment";
import LoadingModal from "../../components/loading";
import { createImages } from "../../redux/reducers/Images/ImageReducer";
import { createImageComment } from "../../redux/reducers/Images/ImageCommentReducer";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/reducers/Comment/commentReducer";
import { useNavigation } from "@react-navigation/native";
import { isValidComment } from "../../utilies/validation";


const RatingOrder = ({ route }) => {
    const { item } = route.params

    const [data, setData] = useState(item)
    const [likeSelected, setLikeSelected] = useState({});

    const [dislikeSelected, setDislikeSelected] = useState({});
    const [inputComment, setInputComment] = useState({});

    const [errorComment, setErrorComment] = useState({})
    const [errorLike, setErrorLike] = useState({})


    const [listImages, setListImages] = useState([]);
    const [listUrl, setListUrl] = useState([]);

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { dataImageComment, loadingImageComment, errorImageComment } = useSelector((state) => state.createImageComment)
    // const { businessInfor, isLoading, error } = useSelector((state) => state.getBusinessByIDReducer)

    const { data: dataUser, loading: loadingUser, error: errorUser } = useSelector((state) => state.userData)

    let tempListUrl = [...listUrl];
    const [loading, setLoading] = useState(false);
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlo5qxnxw/image/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'jldl1aca';
    // console.log(item);

    useEffect(() => {
        const initialErrors = {};
        const numberOfInputs = item?.bill_detailSet.length; // Số lượng TextInput bạn muốn có

        for (let i = 0; i < numberOfInputs; i++) {
            initialErrors[i] = 'Đánh giá ít nhất 25 ký tự nhé.';
        }
        console.log("một");

        setErrorComment(initialErrors);
    }, []);
    useEffect(() => {

        let productInformationDict = {};
        let sizesRemoved = [];
        let newBillDetailSet = [];

        data.bill_detailSet.forEach((detail) => {
            let productInfoId = detail.product.id_product_information;
            if (!productInformationDict[productInfoId]) {
                productInformationDict[productInfoId] = true;
                newBillDetailSet.push(detail);
            } else {
                sizesRemoved.push(detail.product.size);
                // Thêm kích thước của sản phẩm bị loại bỏ vào sản phẩm đầu tiên được giữ lại
                let index = newBillDetailSet.findIndex(
                    (item) => item.product.id_product_information === productInfoId
                );
                if (index !== -1) {
                    if (!Array.isArray(newBillDetailSet[index].product.size)) {
                        newBillDetailSet[index].product.size = [newBillDetailSet[index].product.size];
                    }
                    newBillDetailSet[index].product.size.push(detail.product.size);
                }
            }
        });
        setData({ ...data, bill_detailSet: newBillDetailSet });


        console.log(data);
        console.log("Sizes Removed:", sizesRemoved);
    }, [])
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


    const addStringToListUrlAtIndex = (index, newString) => {
        console.log("length ", tempListUrl.length);
        console.log("tempListUrl: ", index, tempListUrl[index]);

        if (index >= 0) {
            if (!tempListUrl[index]) {
                console.log("Index: ", index);

                tempListUrl[index] = [];
            }
            tempListUrl[index].push(newString);
        } else {
            console.error("Invalid index", index);
            return;
        }
    };
    // {LoadingModal}

    const ChooseImage = async (listimageUri, index) => {
        try {
            console.log("listimageUri: ", listimageUri);
            const promises = listimageUri?.map(async (imageUri) => {
                addStringToListUrlAtIndex(index, "123")
                // const formData = new FormData();
                // console.log(imageUri.substring(imageUri.lastIndexOf('/') + 1));
                // formData.append('file', {
                //     uri: imageUri,
                //     type: 'image/jpeg', // Thay thế 'image/jpeg' bằng response.assets[0].type nếu có thông tin về loại file
                //     name: imageUri.substring(imageUri.lastIndexOf('/') + 1)
                // });
                // formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
                // setLoading(true);
                // await fetch(CLOUDINARY_URL, {
                //     method: 'POST',
                //     body: formData,
                // })
                //     .then((response) => response.json())
                //     .then((data) => {
                //         setLoading(false);
                //         if (data.secure_url !== '') {
                //             const uploadedFileUrl = data.secure_url;
                //             addStringToListUrlAtIndex(index, uploadedFileUrl)
                //         }
                //         toastsuccess("Xong", "Thêm đánh giá thành công")
                //     })
                //     .catch((error) => {
                //         setLoading(false);
                //         console.error(error);
                //         toastError('Thêm ảnh', 'Thất bại');
                //         return false
                //     });

            })
            const results = await Promise.all(promises);
            const success = results.every(result => result === true);
            return success;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const handleImagePress = (idx, index) => {
        const newListImagesByIndex = [...listImages];
        if (newListImagesByIndex[index]) {
            newListImagesByIndex[index] = newListImagesByIndex[index].filter((image, i) => i !== idx);
            setListImages(newListImagesByIndex);
        }
    };


    const createImageObject = (name, url, is_main) => {

        const now = new Date()
        const newName = name + " " + moment(now).format('DD/MM/YYYY-HH:mm:ss')
        return {
            name: newName || '',
            is_main: is_main,
            url: url || '',
        };
    };
    const handleImageComments = async (urlList, id_product_information) => {
        try {

            await Promise.all(
                (urlList? urlList :[])?.map(async (eachURL, index) => {
                    const isMain = index === 0;
                    await dispatch(createImageComment(createImageObject(`Image Product ${index}`, eachURL, isMain), id_product_information));
                })
            );

        } catch (error) {
            console.error('Lỗi khi xử lý imagecomment:', error);
        }
    };


    const commentObject = (id_product_information, content, reply, id_user, is_like, id_imageSet) => {

        id_product_information = id_product_information || '';
        content = content || '';
        reply = reply || null;
        id_user = id_user || '';
        is_like = is_like || false;
        id_imageSet = id_imageSet === undefined ? [] : id_imageSet;

        console.log("data comment ", data);
        const data = {
            id_product_information: id_product_information,
            content: content,
            reply: reply,
            id_user: id_user,
            is_like: is_like,
            id_imageSet: id_imageSet
        };
        return data
    };

    const handleTextChange = (text, index) => {
        const newInputComment = { ...inputComment }
        newInputComment[index] = text
        setInputComment(newInputComment);
        setErrorComment((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            if (isValidComment(text)) {
                updatedErrors[index] = null;
            } else {
                updatedErrors[index] = 'Đánh giá ít nhất 25 ký tự nhé.';
            }
            return updatedErrors;
        });

        console.log("Comment:", inputComment[index]);
    };
    const handleLikePress = (index) => {
        const likeSelected_arr = { ...likeSelected }
        likeSelected_arr[index] = true

        const dislikeSelected_arr = { ...dislikeSelected }
        dislikeSelected_arr[index] = false
        setLikeSelected(likeSelected_arr);
        setDislikeSelected(dislikeSelected_arr);
        const isLike_arr = { ...errorLike }
        isLike_arr[index] = true
        setErrorLike(isLike_arr)
    };

    const handleDislikePress = (index) => {
        const likeSelected_arr = { ...likeSelected }
        likeSelected_arr[index] = false
        const dislikeSelected_arr = { ...dislikeSelected }
        dislikeSelected_arr[index] = true
        setLikeSelected(likeSelected_arr);
        setDislikeSelected(dislikeSelected_arr);
        const isLike_arr = { ...errorLike }
        isLike_arr[index] = true
        setErrorLike(isLike_arr)
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
            {data?.bill_detailSet?.map((eachProduct, index) => (
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
                                <Text numberOfLines={1} style={{ color: 'gray', fontSize: 13 }}>Size: {data.bill_detailSet.flatMap((detail) => detail.product.size).join(", ")}</Text>
                            </View>
                        </View>
                    </View>
                    <View>

                        <View style={styles.modalView}>
                            <View style={{ flexDirection: 'column', backgroundColor: 'white', alignItems: 'flex-start', width: '100%' }}>
                                <Text style={{ color: 'red' }}>{errorLike[index] ? null : "Vui lòng chọn."}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
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


                    </View>

                    <View style={{ backgroundColor: 'white', marginTop: 4, flexDirection: 'column' }}>
                        <Text style={{
                            fontSize: 16,
                            color: 'black',
                            textAlign: 'center',
                            fontWeight: 600
                        }}>Để lại đánh giá ( Tối đa 200 chữ )</Text>
                        < Text style={{ color: 'red' }}>{errorComment[index]}</Text>

                        <TextInput
                            maxLength={200}
                            multiline={true}
                            numberOfLines={3}
                            value={inputComment[index] || ''} // Để hiển thị giá trị từ state
                            onChangeText={(text) => {

                                handleTextChange(text, index)
                            }
                            }
                            style={{ borderRadius: 1, borderWidth: 1, minHeight: 30, maxHeight: 150 }}
                        />

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
                                padding: 3,
                            }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>Thêm ảnh</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.imagesContainer}>
                        {listImages[index] && listImages[index]?.map((imageUri, idx) => (
                            <TouchableOpacity key={idx} style={{ position: 'relative' }}
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
                                    <Text style={{ color: 'red', fontWeight: 600, fontSize: 16 }}>X</Text>
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
                    // onPress={() => {
                    //     item?.bill_detailSet?.map((eachBill) => {
                    //         console.log("Product", eachBill?.product);
                    //     })
                    // }}

                    onPress={async () => {
                        let stateComment = false;
                        let stateImage =false;
                        if (!data?.bill_detailSet) {
                            toastError("Lỗi", "Không có chi tiết hóa đơn.");
                            return;
                        }

                        try {
                            const results = await Promise.all(data.bill_detailSet.map(async (eachProduct, idx) => {
                                const imageUri = listImages[idx] === undefined ? null : listImages[idx];
                                if (errorComment[idx] === null && errorLike[idx] === true) {


                                    const id_product_information = eachProduct?.product?.id_product_information;
                                    console.log("Item: ", id_product_information);
                                    console.log("listUrl ", idx, listUrl[idx] === null);

                                    const result = imageUri ? await ChooseImage(imageUri, idx) : false;

                                    // listUrl[idx]?.forEach((eachURL, index) => {
                                    //     const isMain = index === 0;

                                    //     dispatch(createImageComment(createImageObject(`Image Product ${index}`, eachURL, isMain), id_product_information));
                                    // });

                                    // handleImageComments(listUrl[idx], id_product_information)

                                    console.log("Tới đây rồi. Trước dispatch comment");
                                    console.log("data before dispatch", id_product_information);
                                    stateComment = await dispatch(
                                        createComment(
                                            commentObject(
                                                id_product_information,
                                                inputComment[idx],
                                                null,
                                                dataUser.id,
                                                likeSelected[idx],
                                                dataImageComment ? dataImageComment[id_product_information] : []
                                            )
                                        )
                                    );
                                    console.log("Đã gửi bài", stateComment);
                                    return result;
                                }
                                else {
                                    console.log("Vào else rồi nha em");
                                }
                            }));

                            if (!stateComment) {
                                toastError("Xin lỗi", "Đã xảy ra sự cố.");
                            } else {
                                toastsuccess("Cảm ơn", "Xin cảm ơn vì đánh giá của bạn.");
                                navigation.goBack();
                            }
                            console.log(results);
                        } catch (error) {
                            console.error("Lỗi xử lý:", error);
                            toastError("Lỗi", "Đã xảy ra lỗi khi xử lý.");
                        }
                    }}

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
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: 10,
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