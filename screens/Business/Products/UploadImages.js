import React, { useState } from 'react';
import { View, Text, Button, Image, SafeAreaView, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaFrameContext } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
const ImagePickerComponent = () => {
    const [selectedImage, setSelectedImage] = useState('');
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlo5qxnxw/image/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'jldl1aca';
    const ImagePicker = () => {
        let options = {
            storageOptions: {
                path: "image",
            },
        };
        launchImageLibrary(options, response => {
            if (!response.didCancel && !response.error) {
                const formData = new FormData();
                formData.append('file', {
                    uri: response.assets[0].uri,
                    type: response.assets[0].type,
                    name: response.assets[0].fileName,
                });
                formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

                // Gửi hình ảnh lên Cloudinary
                fetch(CLOUDINARY_URL, {
                    method: 'POST',
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        if (data.secure_url !== '') {
                            const uploadedFileUrl = data.secure_url;
                            console.log("url cloud", uploadedFileUrl);
                            // Lưu URL vào trạng thái hoặc thực hiện các thao tác khác tại đây
                            // setSelectedImage(response.);
                        }
                    })
                    .catch((error) => console.error(error));

            }
            setSelectedImage(response.assets[0].uri)
            //console.log(response);
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, marginBottom: 5, borderRadius: 6, borderWidth: 0.5, borderColor: 'black' }}>
            <View style={{ height: 400, width: '100' }}>
                <Image style={{ height: 400, width: '100%' }} source={{ uri: selectedImage }} />
            </View>
            <TouchableOpacity
                onPress={() => {
                    ImagePicker();
                }}
                style={{
                    marginTop: 20,
                    height: 50,
                    width: '60%',
                    backgroundColor: 'skyblue',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                }}>
                <Text style={{ fontSize: 20, color: 'black', fontSize: 20, fontWeight: '500' }}>Click</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

export default ImagePickerComponent;
