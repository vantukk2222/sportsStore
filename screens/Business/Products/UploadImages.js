import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, SafeAreaView, Alert, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaFrameContext } from 'react-native-safe-area-context';
import { toastError, toastsuccess } from '../../../components/toastCustom';
import { colors } from '../../../constants';
const ImagePickerComponent = ({ onListUrlChange }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [listImages, setListImages] = useState([]);
    const [listUrl, setListUrl] = useState([]);
    const [loading, setLoading] = useState(false);
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlo5qxnxw/image/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'jldl1aca';
    const ImagePicker = () => {
        let options = {
            storageOptions: {
                path: "image",
            },
        };
        launchImageLibrary(options, response => {
            if (!response.didCancel) {
                setSelectedImage(response)
            }

            //console.log(response);
        })
    }
    // useEffect(() => {
    //     console.log("list url", listUrl);
    //     console.log("list image", listImages);

    // }, [listUrl, listImages])
    const ChooseImage = (response) => {
        if (!response.didCancel && !response.error) {
            const formData = new FormData();
            formData.append('file', {
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName,
            });
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            setLoading(true);
            // Gửi hình ảnh lên Cloudinary
            fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    setLoading(false);
                    //console.log("response", response);
                    if (data.secure_url !== '') {
                        const uploadedFileUrl = data.secure_url;
                        // console.log("url cloud", uploadedFileUrl);
                        setListUrl((preUrl) => [...preUrl, uploadedFileUrl])
                        setListImages((preImages) => [...preImages, response.assets[0].uri])
                        setSelectedImage(null)
                        toastsuccess('Thêm ảnh', 'Thành công')
                        onListUrlChange([...listUrl, uploadedFileUrl]);

                        // Lưu URL vào trạng thái hoặc thực hiện các thao tác khác tại đây
                        // setSelectedImage(response.);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    console.error(error)
                    toastError('Thêm ảnh', 'Thất bại')
                });

        }
    }
    const renderImages = () => {
        return listImages.map((item, index) => (
            <Image key={index} style={{ height: 70, width: 70, marginRight: 10, borderRadius: 8 }} source={{ uri: item }} />
        ));
    };
    return (
        <SafeAreaView style={{ flex: 1, marginBottom: 5, borderRadius: 6, borderWidth: 0.2, borderColor: 'black' }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 100, marginBottom: 10, marginHorizontal: 5 }}>
                    {renderImages()}
                </View>
            </ScrollView>
            <View style={{ height: 400, width: '100', borderRadius: 6, borderWidth: 0.4, borderColor: 'black', margin: 4 }}>
                {selectedImage != null &&
                    <Image style={{ height: 400, width: '100%', borderRadius: 6 }} source={{ uri: selectedImage?.assets[0]?.uri }} />
                }
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 10
            }}>
                <TouchableOpacity
                    onPress={() => {
                        ImagePicker();
                    }}
                    style={{
                        marginTop: 20,
                        height: 50,
                        width: 120,
                        backgroundColor: 'skyblue',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }}>
                    <Text style={{ fontSize: 20, color: 'black', fontSize: 20, fontWeight: '500' }}>Chọn ảnh</Text>

                </TouchableOpacity>

                <TouchableOpacity

                    onPress={() => {
                        ChooseImage(selectedImage);
                    }}
                    disabled={selectedImage != null ? false : true}
                    style={selectedImage === null ? {

                        marginTop: 20,
                        height: 50,
                        width: 120,
                        backgroundColor: colors.disable,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    } : {
                        marginTop: 20,
                        height: 50,
                        width: 120,
                        backgroundColor: colors.facebook,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }}
                >
                    <Text style={{ fontSize: 20, color: 'white', fontSize: 20, fontWeight: '500' }}>
                        {loading ? <ActivityIndicator size="large" color={colors.success} /> : 'Thêm'}
                    </Text>

                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
};

export default ImagePickerComponent;
