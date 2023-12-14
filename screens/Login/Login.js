import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import fontSizes from '../../constants_Tu/fontSizes';
import { images } from '../../constants_Tu';
import { TextInput } from 'react-native-paper';
import { isValidEmail } from '../../utilies/validation'
import Icon from 'react-native-vector-icons/Ionicons';
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

// {loginUser}
function Login(props) {
  const {
    navigation,
    loginState,
    loginUser
  } = props;
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [errorValueEmail, setErrorValueEmail] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const errorLoad = loginState.error;

  // useEffect(() => {
  //   const timeLogin = setInterval(async() => { 
  //      await getToken() ? navigation.replace("Start") : navigation.replace("Login")
  //   },1000);
  //   timeLogin
  //   return clearInterval(timeLogin)
  // });

  //  const getToken = useCallback(async()=> {
  //     return await asyncStorage.getAuthToken();
  // },[])

  //get user by username
  const { data, loading, error } = useSelector((state) => state.userData)
  const dispatch = useDispatch();
  const [token, setToken] = useState()


  const handleCheckArray = (array, text) => {
    if (array.includes(text)) {
      return true;
    }
    return false
  }
  useEffect(() => {
    dispatch(fetchUserByUserName(valueEmail))
    // return () => {

    //   setValueEmail('')
    //   setValuePassword('')
    // }
  }, [token])

  useEffect(() => {
    console.log("efff", data);
    if (data && handleCheckArray(data?.roles, "ROLE_CUSTOMER")) {
      console.log("hereeeeee");
      dispatch(setRole('ROLE_CUSTOMER'))
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginBottomNavigator' }],

          // Thay 'Home' bằng màn hình bạn muốn quay về
        })
      );
    }
    else if (data) {
      dispatch(setRole('ROLE_BUSINESS'))
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'BusinessBottomNavigator' }],

          // Thay 'Home' bằng màn hình bạn muốn quay về
        })
      );
    }

  }, [data])
  const handlePress = async () => {
    setButtonDisabled(true);
    // navigation.replace("Main");
    // await asyncStorage.setUsername(valueEmail)
    // const tempUName = await asyncStorage.getUserNameStorage()
    // Alert.alert("user name:",tempUName);
    setTimeout(() => {
      (
        setButtonDisabled(false),
        loginUser(valueEmail, valuePassword)
          .then(async (dataToken) => {
            if (dataToken) {
              // await asyncStorage.setAuthToken(data)
              // console.log("state: " + loginState)
              console.log("user ", data);
              //  decodeToken(data)
              await asyncStorage.setUsername(valueEmail)
              toastsuccess("Đăng nhập thành công", "Chào mừng bạn đến với SportStore")
              // console.log("login: "+ await asyncStorage.getAuthToken())
              setToken(dataToken)

              // setValueEmail('')
              // setValuePassword('')



              // navigation.navigate('LoginBottomNavigator')
            } else {

              toastError("Lỗi đăng nhập", "Không thể đăng nhập")
            }
          })
      )
    }, 500)
  };
  //  if(!getToken()) return <Loading/>
  if (errorLoad) { return <Text style={{ color: 'red' }}>Error: {error}</Text>; }
  return (

    <ScrollView
      keyboardShouldPersistTaps='always'
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 30
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: fontSizes.h1,
            flex: 1,
            marginStart: 30,
            marginVertical: 50,
          }}>
          Đã có tài khoản? Đăng Nhập
        </Text>
        <Image
          source={images.fire}

          resizeMode="cover"
          style={{
            width: 100,
            height: 200,
            flex: 1,
          }}></Image>
      </View>

      <View
        style={{
          marginHorizontal: 15,
          marginTop: 45
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
            setErrorValueEmail(isValidEmail(text) ? '' : 'Sai định dạng email')
            setValueEmail(text)
          }}
          style={{
            marginTop: 10,
            backgroundColor: '#f1f4ff',
            borderRadius: 20,
            color: "#616161",
            fontSize: 16,
            textAlign: 'center',
            textAlignVertical: 'center', // Đặt dấu nháy ở giữa khi focus
            underlineColorAndroid: 'transparent', // Cho Android
            borderBottomWidth: 0, // Cho iOS
          }}
          placeholderTextColor="gray"
          underlineColor="transparent" // Cho React Native Paper
          placeholder="example@gmail.com"
        ></TextInput>

        < Text style={{ color: 'red' }}>{errorValueEmail}</Text>
      </View>
      <View
        style={{
          marginHorizontal: 15,
          marginBottom: 15,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: fontSizes.h3,
            marginBottom: 5,
          }}>
          Password
        </Text>
        <TextInput
          value={valuePassword}
          onChangeText={text => setValuePassword(text)}
          style={{
            marginTop: 10,
            backgroundColor: '#f1f4ff',
            borderRadius: 20,
            color: "#616161",
            fontSize: 16,
            textAlign: 'center',
            textAlignVertical: 'center', // Đặt dấu nháy ở giữa khi focus
            underlineColorAndroid: 'transparent', // Cho Android
            borderBottomWidth: 0, // Cho iOS
          }}
          secureTextEntry={true}
          placeholder="Nhập mật khẩu của bạn"
          placeholderTextColor="gray"
          underlineColor="transparent"></TextInput>
      </View>
      <TouchableOpacity
        onPress={handlePress} disabled={
          isButtonDisabled
          // || errorValueEmail !== ''
        }
        // onPress={() => {

        // alert('Email : ' + valueEmail + '\nPassword : ' + valuePassword);
        // }}
        style={{
          backgroundColor: 'orange',
          width: 135,
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: 12,
        }}>
        <Text
          style={{
            fontSize: fontSizes.h2,
            color: 'white',
          }}>
          {isButtonDisabled ? 'Loading...' : 'Đăng nhập'}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          paddingBottom: 40,
          paddingTop: 10
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}>

          <Text
            style={{
              textAlign: 'center',
              color: 'orange',
            }}>
            Chưa có tài khoản? Đăng ký ở đây.
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginHorizontal: 15
          }}>

          <View
            style={{
              backgroundColor: 'black',
              height: 1,
              flex: 1
            }}></View>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              marginHorizontal: 8
            }}>
            Sử dụng phương thức khác
          </Text>

          <View
            style={{
              backgroundColor: 'black',
              height: 1,
              flex: 1
            }}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginVertical: 10
          }}>
          <Icon name='logo-facebook' size={45} color='blue'
            // onPress={async ()=>{console.log("API: " + await asyncStorage.getAuthToken())}}
            style={{
              paddingHorizontal: 8
            }}></Icon>
          <Icon name='logo-google' size={45} color='red'
            style={{
              paddingHorizontal: 8
            }}></Icon>
        </View>

      </View>


    </ScrollView>

  );
}
const mapStateToProps = (state) => ({
  loginState: state.login
})
const mapDispatchToProps = {
  loginUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
