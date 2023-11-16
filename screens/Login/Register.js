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
import { isValidEmail, isValidPassword } from '../../utilies/validation'
import Icon from 'react-native-vector-icons/Ionicons';
import { combineTransition } from 'react-native-reanimated';


function Register({ navigation }) {
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [retypevaluePassword, setRetypevaluePassword] = useState('');

  const [errorValueEmail, setErrorValueEmail] = useState('');
  const [errorValuePassword, setErrorValuePassword] = useState('');
  const [isButtonDisabled, setButtonDisabled] = React.useState(false);

  const handleRegister = () => {
    axios.post('https://project-pbl6-production.up.railway.app/api/v1/auth/signin', {
      username: valueEmail,
      password: valuePassword
    }, {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
      }
    })
      .then(response => {
        // Lưu token từ phản hồi vào state
        const { token } = response.data; // Giả sử token được trả về từ response
        console.log(token)
        AsyncStorage.setItem("authToken", token);
      })
      .catch(error => {
        Alert.alert(valueEmail, valuePassword);
        console.log(error);
      });
  };
  const handlePress = () => {
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
      navigation.navigate('Home')
    }, 1000);
  };
  // useEffect(() => {
  //   isValidEmail(valueEmail) ? (setErrorValueEmail('Email không hợp lệ'),setButtonDisabled(false) ): "",
  //   isValidPassword(valuePassword) ? (setErrorValuePassword('Password không hợp lệ')) :''
  // },[])

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
        }}>
        <Text
          numberOfLines={3}
          style={{
            color: 'black',
            fontSize: fontSizes.h1,
            flex: 1,
            marginStart: 30,
            marginVertical: 20,
          }}>
          {'Chào mừng bạn đến với'} {'SportStore'}
        </Text>
        <Icon
          name="logo-facebook"
          size={100}
          color="blue"
          style={{
            marginHorizontal: 10,
            alignSelf: 'center',

            flex: 1,
          }} />
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
        {valueEmail !== '' && < Text style={{ color: 'red' }}>{errorValueEmail}</Text>}
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
            marginTop: 10
          }}>
          Mật khẩu
        </Text>
        <TextInput
          value={valuePassword}
          onChangeText={text => {
            setErrorValuePassword(isValidPassword(text) == true ? '' : 'Mật khẩu bao gồm 1 chữ cái in đậm, số và 1 ký tự đặc biệt\n')
            setValuePassword(text)
          }}
          style={{
            borderWidth: 1,
            borderColor: 'orange',
            color: 'black',
            marginBottom: 5,
          }}
          secureTextEntry={true}
          placeholder="Nhập mật khẩu của bạn"
          placeholderTextColor="gray"></TextInput>
        {valuePassword !== '' && < Text style={{ color: 'red', paddingBottom: 10 }}>{errorValuePassword}</Text>}

        <Text
          style={{
            color: 'black',
            fontSize: fontSizes.h3,
            marginBottom: 5,
            marginTop: 10
          }}>
          Nhập lại mật khẩu
        </Text>
        <TextInput
          value={retypevaluePassword}
          onChangeText={text => setRetypevaluePassword(text)}
          style={{
            borderWidth: 1,
            borderColor: 'orange',
            color: 'black',
            marginBottom: 5,
          }}
          secureTextEntry={true}
          placeholder="Nhập lại mật khẩu của bạn"
          placeholderTextColor="gray"></TextInput>
        {valuePassword !== '' && retypevaluePassword !== '' && valuePassword !== retypevaluePassword && (
          <Text style={{ color: 'red' }}>Mật khẩu không trùng nhau</Text>
        )}

      </View>
      <TouchableOpacity
        onPress={handlePress} disabled={
          isButtonDisabled ||
          errorValueEmail !== '' ||
          errorValuePassword !== '' ||
          (retypevaluePassword !== '' && retypevaluePassword !== valuePassword)
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
          {isButtonDisabled ? 'Loading...' : 'Đăng ký'}
        </Text>
      </TouchableOpacity>
      <View
        style={{
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginHorizontal: 15,
            paddingTop: 15
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

export default Register;
