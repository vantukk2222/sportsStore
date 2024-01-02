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
import Icon from 'react-native-vector-icons/FontAwesome5';
import { combineTransition } from 'react-native-reanimated';
import { signupUser } from '../../redux/reducers/Register/signupReducer';
import { connect } from 'react-redux';
import { toastError, toastsuccess } from '../../components/toastCustom';
import { Dropdown } from 'react-native-element-dropdown';
import Font from '../../constants_Tu/Font';
import HeaderComp from '../../components/Header';


function Register(props) {
  const {
    navigation,
    signupState,
    signupUser
  } = props;
  const Spacing = 10;
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
    if (value === null || errorName !== '' || errorPhone !== '' || errorUserName !== '' || errorValueEmail !== '' || errorValuePassword !== '') {
      seterrorValue("Vui lòng lựa chọn kiểu tài khoản")

      toastError("Xin lỗi", "Vui lòng nhập đầy đủ thông tin");
    }
    else if (valueName === '' || valueUserName === '' || valuePassword === '' || retypevaluePassword === '' || valueEmail === '' || valuePhone === '') {
      toastError("Xin lỗi", "Vui lòng nhập đầy đủ thông tin");

    }
    else {
      handlePress();
    }
  };
  const handlePress = () => {
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
      signupUser(userData, value).then(data => {
        if (data.includes("Error") || data.includes("failed")) {
          toastError("Xin lôi", JSON.stringify(data))
        }
        else {
          setValueEmail('')
          setValueName('')
          setValuePassword('')
          setValuePhone('')
          setValueUserName('')
          retypevaluePassword('')
          toastsuccess("Cảm ơn", "Bạn đã đăng ký tài khoản thành công!")
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
      <ScrollView
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
            Đăng ký tài khoản
          </Text>
          <Text
            style={{
              fontFamily: Font["poppins-regular"],
              fontSize: 16,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            Tạo một tài khoản mới và trải nghiệm cùng chúng tôi nhé. Cảm ơn quý khách!
          </Text>
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
        {value !== '' && < Text style={{ color: 'red', marginHorizontal: 15, }}>{errorValue}</Text>}
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
            }}
            placeholderTextColor="gray"
            underlineColor="transparent"
            placeholder="Họ và tên"></TextInput>
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
            }}
            placeholderTextColor="gray"
            underlineColor="transparent"
            placeholder="Tên tài khoản"></TextInput>
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
              }}
              placeholderTextColor="gray"
              underlineColor="transparent"
              placeholder="Số điện thoại"></TextInput>
            {valuePhone !== '' && < Text style={{ color: 'red' }}>{errorPhone}</Text>}
          </View>

        </View>
        <View
        style={{padding:20}}>
          <TouchableOpacity
            onPress={handlePressOrError}
            disabled={
              isButtonDisabled
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
              {isButtonDisabled ? 'Loading...' : 'Đăng ký'}
            </Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
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






const mapStateToProps = (state) => ({
  signupState: state.signup
})
const mapDispatchToProps = {
  signupUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
