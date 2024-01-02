import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import fontSizes from '../../constants_Tu/fontSizes';
import { images } from '../../constants_Tu';
import { TextInput } from 'react-native-paper';
import { isValidEmail, onValidUsername } from '../../utilies/validation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';

// import { loginUser } from '../../redux/reducers/Login/authActions';
import { asyncStorage } from '../../utilies/asyncStorage';
import { loginUser } from '../../redux/reducers/Login/signinReducer';
import Loading from '../../components/loading';
import { toastError, toastsuccess } from '../../components/toastCustom';
import { decodeToken } from '../../utilies/decodeToken';
import { fetchUserByUserName } from '../../redux/reducers/User/userInfor';
import { setRole } from '../../redux/reducers/Role/roleReducer';
import LoadingModal from '../../components/loading';
import Font from '../../constants_Tu/Font';

// {loginUser}
function Login(props) {
  const { navigation, loginState, loginUser } = props;
  const Spacing = 10;
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [errorValueEmail, setErrorValueEmail] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const errorLoad = loginState.error;

  //get user by username
  const { data, loading, error } = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const [token, setToken] = useState();

  const handleCheckArray = (array, text) => {
    if (array?.includes(text)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    dispatch(fetchUserByUserName(valueEmail));
    // return () => {

    //   setValueEmail('')
    //   setValuePassword('')
    // }
  }, [token]);

  useEffect(() => {
    console.log('efff', data);
    if (data && handleCheckArray(data?.roles, 'ROLE_CUSTOMER')) {
      console.log('hereeeeee');
      dispatch(setRole('ROLE_CUSTOMER'));

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginBottomNavigator' }],
        }),
      );
    } else if (data) {
      dispatch(setRole('ROLE_BUSINESS'));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'BusinessBottomNavigator' }],

          // Thay 'Home' bằng màn hình bạn muốn quay về
        }),
      );
    }
  }, [data]);
  const handlePress = async () => {
    setIsLoading(true);
    setButtonDisabled(true);
    if (valueEmail !== '' && valuePassword !== '') {
      loginUser(valueEmail, valuePassword).then(async dataToken => {
        if (dataToken) {
          console.log('user ', data);
          await asyncStorage.setUsername(valueEmail);
          toastsuccess(
            'Đăng nhập thành công',
            'Chào mừng bạn đến với SportStore',
          );
          console.log('token in login:', dataToken);
          setIsLoading(false);
          setToken(token);
        } else {
          setIsLoading(false);

          toastError('Lỗi đăng nhập', 'Không thể đăng nhập');
        }
      });
    } else {
      setIsLoading(false);
      toastError('Xin lỗi', 'Vui lòng nhập đủ thông tin.');
    }
    setButtonDisabled(false);
  };
  //  if(!getToken()) return <Loading/>
  // if ((loginState?.isLoading)) return <LoadingModal isLoading={true}></LoadingModal>
  // if (errorLoad) { return <Text style={{ color: 'red' }}>Error: {error}</Text>; }
  return (
    <SafeAreaView>
      {isLoading && <LoadingModal isLoading={true}></LoadingModal>}
      
        <TouchableOpacity
        style={{
          marginTop:10,
          marginLeft:15,


        }}
        onPress={()=>{
          navigation.goBack()
        }}>
        <Icon name="angle-left" size={30} style={{
          color: 'blue',
          alignItems: 'flex-end',
        }}></Icon>
        
        </TouchableOpacity>
      <View
        style={{
          padding: Spacing * 2,
        }}>
       
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              color: 'blue',
              fontFamily: Font['poppins-bold'],
              marginVertical: Spacing * 3,
            }}>
            Đăng nhập
          </Text>
          <Text
            style={{
              fontFamily: Font['poppins-semiBold'],
              fontSize: 20,
              maxWidth: '60%',
              textAlign: 'center',
            }}>
            Chào mừng bạn trở lại với SportStore
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}>
          <TextInput
            value={valueEmail}
            onChangeText={text => {
              setErrorValueEmail(onValidUsername(text) ? '' : 'Sai định dạng');
              setValueEmail(text);
            }}
            style={{
              borderWidth: 1,

              marginTop: 10,
              backgroundColor: '#f1f4ff',
              borderRadius: 20,
              color: '#616161',
              fontSize: 16,
            }}
            placeholderTextColor="gray"
            underlineColor="transparent" // Cho React Native Paper
            placeholder="Tên tài khoản"></TextInput>
          <TextInput
            value={valuePassword}
            onChangeText={text => setValuePassword(text)}
            style={{
              borderWidth: 1,
              marginTop: 10,
              backgroundColor: '#f1f4ff',
              borderRadius: 20,
              color: '#616161',
              fontSize: 16,
              textAlignVertical: 'center', // Đặt dấu nháy ở giữa khi focus
            }}
            secureTextEntry={true}
            placeholder="Mật khẩu"
            placeholderTextColor="gray"
            underlineColor="transparent"></TextInput>
        </View>

        <View>
          <Text
            style={{
              fontFamily: Font['poppins-semiBold'],
              fontSize: 14,
              color: 'blue',
              alignSelf: 'flex-end',
            }}>
            Quên mật khẩu?
          </Text>
        </View>

        <TouchableOpacity
          onPress={handlePress}
          disabled={isButtonDisabled}
          style={{
            padding: Spacing *2,
            backgroundColor: 'blue',
            marginVertical: Spacing * 3,
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
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
            }}>
            {isButtonDisabled ? 'Loading...' : 'Đăng nhập'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{
            padding: Spacing,
          }}>
          <Text
            style={{
              fontFamily: Font['poppins-semiBold'],
              color: 'black',
              textAlign: 'center',
              fontWeight: 400,
              fontSize: 16,
            }}>
            Tạo tài khoản mới
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
  // return (

  //   <ScrollView
  //     keyboardShouldPersistTaps='always'
  //     style={{
  //       backgroundColor: 'white',
  //       flex: 1,
  //     }}>
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         paddingTop: 30
  //       }}>
  //       <Text
  //         style={{
  //           color: 'black',
  //           fontSize: fontSizes.h1,
  //           flex: 1,
  //           marginStart: 30,
  //           marginVertical: 50,
  //         }}>
  //         Đã có tài khoản? Đăng Nhập
  //       </Text>
  //       <Image
  //         source={images.fire}

  //         resizeMode="cover"
  //         style={{
  //           width: 100,
  //           height: 200,
  //           flex: 1,
  //         }}></Image>
  //     </View>

  //     <View
  //       style={{
  //         marginHorizontal: 15,
  //         marginTop: 45
  //       }}>
  //       <Text
  //         style={{
  //           color: 'black',
  //           fontSize: fontSizes.h3,
  //           marginBottom: 5,
  //         }}>
  //         Tên tài khoản
  //       </Text>
  // <TextInput
  //   value={valueEmail}
  //   onChangeText={text => {
  //     setErrorValueEmail(onValidUsername(text) ? '' : 'Sai định dạng')
  //     setValueEmail(text)
  //   }}
  //   style={{
  //     marginTop: 10,
  //     backgroundColor: '#f1f4ff',
  //     borderRadius: 20,
  //     color: "#616161",
  //     fontSize: 16,
  //     textAlign: 'center',
  //     textAlignVertical: 'center', // Đặt dấu nháy ở giữa khi focus
  //     underlineColorAndroid: 'transparent', // Cho Android
  //     borderBottomWidth: 0, // Cho iOS
  //   }}
  //   placeholderTextColor="gray"
  //   underlineColor="transparent" // Cho React Native Paper
  //   placeholder="Tên tài khoản"
  // ></TextInput>

  //       < Text style={{ color: 'red' }}>{errorValueEmail}</Text>
  //     </View>
  //     <View
  //       style={{
  //         marginHorizontal: 15,
  //         marginBottom: 15,
  //       }}>
  //       <Text
  //         style={{
  //           color: 'black',
  //           fontSize: fontSizes.h3,
  //           marginBottom: 5,
  //         }}>
  //         Mật khẩu
  //       </Text>
  //       <TextInput
  //         value={valuePassword}
  //         onChangeText={text => setValuePassword(text)}
  //         style={{
  //           marginTop: 10,
  //           backgroundColor: '#f1f4ff',
  //           borderRadius: 20,
  //           color: "#616161",
  //           fontSize: 16,
  //           textAlign: 'center',
  //           textAlignVertical: 'center', // Đặt dấu nháy ở giữa khi focus
  //           underlineColorAndroid: 'transparent', // Cho Android
  //           borderBottomWidth: 0, // Cho iOS
  //         }}
  //         secureTextEntry={true}
  //         placeholder="Nhập mật khẩu của bạn"
  //         placeholderTextColor="gray"
  //         underlineColor="transparent"></TextInput>
  //     </View>
  //     <TouchableOpacity
  //       onPress={handlePress} disabled={
  //         isButtonDisabled
  //         // || errorValueEmail !== ''
  //       }
  //       // onPress={() => {

  //       // alert('Email : ' + valueEmail + '\nPassword : ' + valuePassword);
  //       // }}
  //       style={{
  //         backgroundColor: 'orange',
  //         width: 135,
  //         height: 45,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         alignSelf: 'center',
  //         borderRadius: 12,
  //       }}>
  //       <Text
  //         style={{
  //           fontSize: fontSizes.h2,
  //           color: 'white',
  //         }}>
  //         {isButtonDisabled ? 'Loading...' : 'Đăng nhập'}
  //       </Text>
  //     </TouchableOpacity>
  //     <View
  //       style={{
  //         paddingBottom: 40,
  //         paddingTop: 10
  //       }}>
  //       <TouchableOpacity
  //         onPress={() => navigation.navigate('Register')}>

  //         <Text
  //           style={{
  //             textAlign: 'center',
  //             color: 'orange',
  //           }}>
  //           Chưa có tài khoản? Đăng ký ở đây.
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //     <View
  //       style={{
  //       }}>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           flex: 1,
  //           marginHorizontal: 15
  //         }}>

  //         <View
  //           style={{
  //             backgroundColor: 'black',
  //             height: 1,
  //             flex: 1
  //           }}></View>
  //         <Text
  //           style={{
  //             textAlign: 'center',
  //             color: 'black',
  //             marginHorizontal: 8
  //           }}>
  //            ụng phương thức khác
  //         </Text>

  //         <View
  //           style={{
  //             backgroundColor: 'black',
  //             height: 1,
  //             flex: 1
  //           }}></View>
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           alignSelf: 'center',
  //           marginVertical: 10
  //         }}>
  //         <Icon name='logo-facebook' size={45} color='blue'
  //           // onPress={async ()=>{console.log("API: " + await asyncStorage.getAuthToken())}}
  //           style={{
  //             paddingHorizontal: 8
  //           }}></Icon>
  //         <Icon name='logo-google' size={45} color='red'
  //           style={{
  //             paddingHorizontal: 8
  //           }}></Icon>
  //       </View>

  //     </View>

  //   </ScrollView>

  // );
}

const mapStateToProps = state => ({
  loginState: state.login,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
