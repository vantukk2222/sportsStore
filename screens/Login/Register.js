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
import { images } from '../../constants_Tu';
import { TextInput } from 'react-native-paper';
import { isValidEmail, isValidName, isValidPassword, isValidPhone, onValidUsername } from '../../utilies/validation'
import Icon from 'react-native-vector-icons/Ionicons';
import { combineTransition } from 'react-native-reanimated';
import { signupUser } from '../../redux/reducers/Register/signupReducer';
import { connect } from 'react-redux';
import { toastError, toastsuccess } from '../../components/toastCustom';
import { Dropdown } from 'react-native-element-dropdown';


function Register(props) {
  const {
    navigation,
    signupState,
    signupUser
  } = props;
  const [valueUserName, setValueUserName] = useState('')
  const [valueName, setValueName] = useState('')
  const [valuePhone, setValuePhone] = useState('')
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [retypevaluePassword, setRetypevaluePassword] = useState('');

  const [errorValueEmail, setErrorValueEmail] = useState('');
  const [errorValuePassword, setErrorValuePassword] = useState('');
  const [errorUserName, setErrorUserName] = useState('')
  const [errorPhone, setErrorPhone] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorValue, seterrorValue] = useState(null);

  const [isButtonDisabled, setButtonDisabled] = React.useState(false);
  const userData = {
    username: valueEmail,
    password: valuePassword,
    name: valueName,
    phone: valuePhone,
    email: valueEmail,
  };
  const [value, setValue] = useState(null);
  

  const data = [
    { label: 'Khách hàng', value: 'customer' },
    { label: 'Người bán hàng', value: 'business' },
  ];
  const handlePressOrError = () => {
    if (value === null || errorName !== '' || errorPhone!== '' || errorUserName!== '' || errorValueEmail!== '' || errorValuePassword!== '') {
      seterrorValue("Vui lòng lựa chọn kiểu tài khoản")
      toastError("Xin lỗi", "Vui lòng nhập đầy đủ thông tin");
    } else {
      handlePress();
    }
  };
  const handlePress = () => {
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
      signupUser(userData,value).then(data => {
        if (data.includes("Error") || data.includes("failed")) {
          toastError("Xin lôi",JSON.stringify(data))
        }
        else {
          setValueEmail('')
          setValueName('')
          setValuePassword('')
          setValuePhone('')
          setValueUserName('')
          retypevaluePassword('')
          toastsuccess("Cảm ơn","Bạn đã đăng ký tài khoản thành công!")
        }
      })

    }, 1000);
  };
  useEffect(() => {
    console.log(userData)
  }, [valueEmail, valuePassword])
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
            marginHorizontal:15,
            marginTop: 45
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: fontSizes.h3,
              marginBottom: 5,
            }}>
            Loại tài khoản
          </Text>
        </View>
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Lựa chọn kiểu tài khoản"
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        
      />
      {value !== '' && < Text style={{ color: 'red',marginHorizontal: 15, }}>{errorValue}</Text>}
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
          Họ tên
        </Text>

        <TextInput
          value={valueName}
          onChangeText={text => {
            setErrorName(isValidName(text) ? '' : 'Tên không hợp lệ')
            setValueName(text)
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
          underlineColor="transparent"
          placeholder="example@gmail.com"></TextInput>
        {valueName !== '' && < Text style={{ color: 'red' }}>{errorName}</Text>}
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
          Tên tài khoản
        </Text>
        <TextInput
          value={valueUserName}
          onChangeText={text => {
            setErrorUserName(onValidUsername(text) ? '' : `Tên tài khoản phải ít nhất 6 ký tự không quá 24 ký tự${"\n"}Phải bắt đầu bằng chữ cái thường${"\n"}Không chưa ký tự đặc biệt`)
            setValueUserName(text)
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
          underlineColor="transparent"
          placeholder="example@gmail.com"></TextInput>
        {valueUserName !== '' && < Text style={{ color: 'red' }}>{errorUserName}</Text>}
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
          underlineColor="transparent"
          secureTextEntry={true}
          placeholder="Nhập mật khẩu của bạn"></TextInput>
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
          underlineColor="transparent"
          secureTextEntry={true}
          placeholder="Nhập lại mật khẩu của bạn"></TextInput>
        {valuePassword !== '' && retypevaluePassword !== '' && valuePassword !== retypevaluePassword && (
          <Text style={{ color: 'red' }}>Mật khẩu không trùng nhau</Text>
        )}

        <View
          style={{
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
              setErrorValueEmail(isValidEmail(text) == true ? '' : 'Sai định dạng email')
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
            underlineColor="transparent"
            placeholder="example@gmail.com"></TextInput>
          {valueEmail !== '' && < Text style={{ color: 'red' }}>{errorValueEmail}</Text>}
        </View>
        <View
          style={{
            marginTop: 10
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: fontSizes.h3,
              marginBottom: 5,
            }}>
            Số điện thoại
          </Text>
          <TextInput
            value={valuePhone}
            onChangeText={text => {
              setErrorPhone(isValidPhone(text) == true ? '' : 'Sai định dạng số điện thoại')
              setValuePhone(text)
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
            underlineColor="transparent"
            placeholder="example@gmail.com"></TextInput>
          {valuePhone !== '' && < Text style={{ color: 'red' }}>{errorPhone}</Text>}
        </View>
        
      </View>
      <TouchableOpacity
        onPress={handlePressOrError}
        disabled={
          isButtonDisabled
        }

        style={{
          backgroundColor: 'orange',
          width: 135,
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: 12,
          marginTop: 10
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
    fontWeight:600,
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






const mapStateToProps = (state) => ({
  signupState: state.signup
})
const mapDispatchToProps = {
  signupUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
