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
import { toastError, toastsuccess } from '../../components/toastCustom';
import { decodeToken } from '../../utilies/decodeToken';
import { fetchUserByUserName } from '../../redux/reducers/User/userInfor';
import { setRole } from '../../redux/reducers/Role/roleReducer';
// import LoadingModal from '../../components/loading';

import LoadingModal from '../../components/loading';
import Font from '../../constants_Tu/Font';
import { store } from '../../redux/store';
import { listCartByIdUser } from '../../redux/reducers/Cart/listCartReducer';
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [productInfor, setProductInfor] = useState('')
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
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
    const fetchUserData = async () => {
      try {
        // Lấy dữ liệu từ AsyncStorage
        const productData = await asyncStorage.getProductInfor();

        // console.log("ProductData 1", productData);
        if (productData) {
          setProductInfor(JSON.parse(productData))
        }
      } catch (error) {
        // Xử lý lỗi khi không thể lấy dữ liệu từ AsyncStorage
        console.log('Error fetching user data: ', error);
      }
    };

    fetchUserData(); // Gọi hàm fetchUserData trong useEffect

  }, [])

  useEffect(() => {

    // console.log('efff', data);
    // if (data && handleCheckArray(data?.roles, 'ROLE_CUSTOMER')) {

    //   const routeIndex = productInfor ? 1 : 0
    //   console.log('route in login', routeIndex);
    //   // const routeIndex = productInfor ? 1:0
    //   // console.log('hereeeeee',routeIndex);
    //   dispatch(listCartByIdUser(data?.id))
    //   dispatch(setRole('ROLE_CUSTOMER'));

    //   if (routeIndex === 1) {
    //     navigation.dispatch(
    //       CommonActions.reset({
    //         index: 0,
    //         routes: [
    //           { name: 'LoginBottomNavigator' },
    //           {
    //             name: 'DetailProduct',
    //             params: { item: productInfor },
    //           }],
    //       }),
    //     );
    //   }
    //   if (routeIndex === 0) {
    //     navigation.dispatch(
    //       CommonActions.reset({
    //         index: 0,
    //         routes: [
    //           { name: 'LoginBottomNavigator' },
    //         ],
    //       }),
    //     );
    //   }
    // } else
     if (data && handleCheckArray(data?.roles, 'ROLE_BUSINESS')) {
      dispatch(setRole('ROLE_BUSINESS'));

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'BusinessBottomNavigator' }],
        }),
      );
    }

  }, [data]);
  const handlePress = async () => {
    try {
      setIsLoading(true);
      setButtonDisabled(true);
      if (valueEmail !== '' && valuePassword !== '') {
        loginUser(valueEmail, valuePassword).then(async dataToken => {
          if (dataToken !== 404) {
            console.log('token in login:', dataToken);

            await dispatch(fetchUserByUserName(valueEmail)).then(async (data) => {
              if (data) {
                // console.log(Data);
                await asyncStorage.setUsername(valueEmail);
                console.log("user name: ", valueEmail);

                console.log('efff', data);
                if (data && handleCheckArray(data?.roles, 'ROLE_CUSTOMER')) {

                  const routeIndex = productInfor ? 1 : 0
                  console.log('route in login', routeIndex);
                  // const routeIndex = productInfor ? 1:0
                  // console.log('hereeeeee',routeIndex);
                  dispatch(listCartByIdUser(data?.id))
                  dispatch(setRole('ROLE_CUSTOMER'));

                  if (routeIndex === 1) {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          { name: 'LoginBottomNavigator' },
                          {
                            name: 'DetailProduct',
                            params: { item: productInfor },
                          }],
                      }),
                    );
                  }
                  if (routeIndex === 0) {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          { name: 'LoginBottomNavigator' },
                        ],
                      }),
                    );
                  }
                } else if (data && handleCheckArray(data?.roles, 'ROLE_BUSINESS')) {
                  dispatch(setRole('ROLE_BUSINESS'));

                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'BusinessBottomNavigator' }],
                    }),
                  );
                }
                toastsuccess(
                  'Đăng nhập thành công',
                  'Chào mừng bạn đến với SportStore',
                );
                setIsLoading(false);
                setToken(token);
              }
            })

          } else if (dataToken === 404) {
            setIsLoading(false);
            setToken('');
            console.log('token in login else:', dataToken);

            toastError('Lỗi đăng nhập', 'Không thể đăng nhập');
          }
        });
      } else {
        setIsLoading(false);
        toastError('Xin lỗi', 'Vui lòng nhập đủ thông tin.');
      }
      setButtonDisabled(false);
    } catch (error) {

      toastError('Lỗi đăng nhập', error);

    }
  };
  //  if(!getToken()) return <Loading/>
  // if ((loginState?.isLoading)) return <LoadingModal isLoading={true}></LoadingModal>
  // if (errorLoad) { return <Text style={{ color: 'red' }}>Error: {error}</Text>; }
  return (
    <ScrollView>
      {isLoading && <LoadingModal isLoading={true}></LoadingModal>}

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
          <View style={{
            flexDirection: "row"
            , width: '100%',
            borderWidth: 1,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,

            marginTop: 10,
            backgroundColor: '#f1f4ff',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#616161'
          }}>
            <TextInput
              value={valueEmail}
              onChangeText={text => {
                setErrorValueEmail(onValidUsername(text) ? '' : 'Sai định dạng');
                setValueEmail(text);
              }}
              style={{
                width: '90%',
                backgroundColor: '#f1f4ff',
                borderRadius: 20,
                color: '#616161',
                fontSize: 16,
              }}
              placeholderTextColor="gray"
              underlineColor="transparent"
              placeholder="Tên tài khoản"></TextInput>
            <Text style={{ paddingRight: 24 }}></Text>
          </View>

          <View style={{
            flexDirection: "row"
            , width: '100%',
            borderWidth: 1,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,

            marginTop: 10,
            backgroundColor: '#f1f4ff',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#616161'
          }}>
            <TextInput
              value={valuePassword}
              onChangeText={text => setValuePassword(text)}
              style={{
                width: '90%',
                backgroundColor: '#f1f4ff',
                borderRadius: 20,
                color: '#616161',
                fontSize: 16,
              }}
              secureTextEntry={!isPasswordVisible}
              placeholder="Mật khẩu"
              placeholderTextColor="gray"
              underlineColor="transparent">
            </TextInput>
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={!isPasswordVisible ? 'eye-slash' : 'eye'}
                size={isPasswordVisible ? 20 : 18}
                color="gray"
                style={{ alignItems: 'center' }} // Điều chỉnh vị trí của icon
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={()=>{
          navigation.navigate("ResetPassword")
        }}>
          <Text
            style={{
              fontFamily: Font['poppins-semiBold'],
              fontSize: 14,
              color: 'blue',
              alignSelf: 'flex-end',
            }}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async()=> await handlePress()}
          disabled={isButtonDisabled}
          style={{
            padding: Spacing * 2,
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
    </ScrollView>
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
