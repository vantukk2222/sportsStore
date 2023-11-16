import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import fontSizes from '../../constants/fontSizes';
import { images } from '../../constants';
import { TextInput } from 'react-native-paper';
import { isValidEmail } from '../../utilies/validation'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect} from 'react-redux';
// import { useDispatch, useSelector } from  'react-redux';
import axios from 'axios';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from '../../redux/reducers/Login/authActions';
import { asyncStorage } from '../../utilies/asyncStorage';


function Login(props) {
  const {
    navigation,
    loginState,
    loginUser
  }= props;
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [errorValueEmail, setErrorValueEmail] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  // const dispatch = useDispatch();
  // const { isLoading, error } = useSelector((state) => state.auth);

  const clearAuthToken = async () => {
    await asyncStorage.removeAuthToken("authToken")
    console.log("auth token cleared");
    // navigation.replace("Login");
  };

  // useEffect(()=> {

  // },[])
  // useEffect(() => {
  //   clearAuthToken()
  //     try {
  //       const token = asyncStorage.getAuthToken("authToken");

  //       if (token) {
  //         // navigation.navigate('Register')
  //         Alert.alert("AuthToken is already exist", "Navigate to MAIN Screen")
  //         console.log("token ne em" + token);
  //         // clearAuthToken()
  //         navigation.navigate('Home')
  //       }
  //     } catch (err) {
  //       console.log("error message", err);
  //     }
  //   // checkLoginStatus();
  // }, [loginState]);
  const handlePress = async () => {
    // clearAuthToken()
    setButtonDisabled(true);
      setButtonDisabled(false);
        // navigation.replace("Main");
        await loginUser("test65","test").then((data)=> {
          if(data) {
            navigation.navigate('Home') 
          } else {
            
            Alert.alert("AuthToken is not exist", "Loading login")
          }
        })
        // dispatch()

        // handleLogin()
        // navigation.navigate("Register")
  };
  function validPassword(password) {
    password.length >= 6
  }

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
            setErrorValueEmail(isValidEmail(text) == true ? '' : 'Sai định dạng email')
            setValueEmail(text)
          }}

          style={{
            borderWidth: 1,
            borderColor: 'orange',
            color: 'black',
          }}

          placeholder="example@gmail.com"
          placeholderTextColor="gray"></TextInput>
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
            borderWidth: 1,
            borderColor: 'orange',
            color: 'black',
            marginBottom: 30,
          }}
          secureTextEntry={true}
          placeholder="Nhập mật khẩu của bạn"
          placeholderTextColor="gray"></TextInput>
      </View>
      <TouchableOpacity
        onPress={handlePress} disabled={isButtonDisabled}
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
        onPress={() => navigation.navigate('Đăng ký')}>
        
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
const mapStateToProps = (state) =>( {
  loginState : state.auth
})
const mapDispatchToProps = {
  loginUser 
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
