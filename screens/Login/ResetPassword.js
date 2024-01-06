import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Alert,
    StyleSheet,
} from 'react-native';
import fontSizes from '../../constants_Tu/fontSizes';
import { TextInput } from 'react-native-paper';
import {  isValidEmail } from '../../utilies/validation'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {  useDispatch } from 'react-redux';
import { toastError, toastsuccess } from '../../components/toastCustom';
import Font from '../../constants_Tu/Font';
import HeaderComp from '../../components/Header';
import LoadingModal from '../../components/loading';
import { resetPasswordUser } from '../../redux/reducers/User/resetPassword';
import { useNavigation } from '@react-navigation/native';


function ResetPassword() {

    const Spacing = 10;

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [errorValueEmail, setErrorValueEmail] = useState('');
    const [valueEmail, setValueEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [isButtonDisabled, setButtonDisabled] = React.useState(false);

    const handlePressOrError = () => {
        handlePress()
    };
    const handlePress = async () => {
        try {
            setButtonDisabled(true);
            setIsLoading(true);
    
            const data = await dispatch(resetPasswordUser(valueEmail));
            console.log("Data reset: ",data);
            if (data === 202) {
                setValueEmail('');

                toastsuccess('Cảm ơn', 'Kiểm tra trong hộp thư đến của mail bạn!');
                navigation.navigate('Login');
            } else {
                toastError('Xin lỗi', 'Email không hợp lệ.');
            }
    
        } catch (error) {
            toastError('Xin lỗi', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setButtonDisabled(false);
            setIsLoading(false);
        }
    };
    

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: "white",
                position: 'relative',
            }}>
            <TouchableOpacity
                style={{
                    marginTop: 10,
                    marginLeft: 15,


                }}
                onPress={() => {
                    navigation.goBack()
                }}>
                <Icon name="angle-left" size={30} style={{
                    color: 'blue',
                    alignItems: 'flex-end',
                }}></Icon>

            </TouchableOpacity>
            {isLoading && <LoadingModal isLoading={true}></LoadingModal>}

            <View
                keyboardShouldPersistTaps='always'
                style={{
                    backgroundColor: 'white',
                    flex: 1,
                }}>

                <View
                    style={{
                        alignItems: "center",
                    }}
                >

                    <Text
                        style={{
                            fontSize: 30,
                            color: "blue",
                            fontFamily: Font["poppins-bold"],
                            marginVertical: Spacing * 3,
                        }}
                    >
                        Khôi phục mật khẩu
                    </Text>
                    <Text
                        style={{
                            fontFamily: Font["poppins-regular"],
                            fontSize: 16,
                            maxWidth: "80%",
                            textAlign: "center",
                        }}
                    >
                        Vui lòng nhập email để tìm kiếm tài khoản của bạn.
                    </Text>
                </View>


                <View
                    style={{
                        marginHorizontal: 15,
                        marginTop: 10
                    }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: fontSizes.h3,
                            marginBottom: 5,
                        }}>
                        Email
                    </Text>

                    <TextInput
                        value={valueEmail}
                        onChangeText={text => {
                            setErrorValueEmail(isValidEmail(text) ? '' : 'Email không hợp lệ.')
                            setValueEmail(text)
                        }}

                        style={{
                            marginTop: 10,
                            backgroundColor: '#f1f4ff',
                            borderRadius: 20,
                            color: "#616161",
                            fontSize: 16,
                        }}
                        placeholderTextColor="gray"
                        underlineColor="transparent"
                        placeholder="example@gmail.com"></TextInput>
                    {valueEmail !== '' && errorValueEmail !=='' && < Text style={{ color: 'red' }}>{errorValueEmail}</Text>}
                </View>

                <View
                    style={{ padding: 20 }}>
                    <TouchableOpacity
                        onPress={handlePressOrError}
                        disabled={
                            false
                        }
                        style={{
                            paddingVertical: Spacing * 2,
                            backgroundColor: 'blue',
                            borderRadius: Spacing,
                            shadowColor: 'blue',
                            shadowOffset: {
                                width: 0,
                                height: Spacing,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: Spacing,
                        }}>
                        <Text
                            style={{
                                fontFamily: Font['poppins-bold'],
                                textAlign: 'center',
                                fontSize: 20,
                                color: 'white',
                            }}>
                            {isButtonDisabled ? 'Loading...' : 'Tìm kiếm'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}







const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontWeight: 600,
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});




export default ResetPassword
