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
import { isValidCIC, isValidEmail, isValidName, isValidPassword, isValidPhone, onValidUsername } from '../../utilies/validation'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { combineTransition } from 'react-native-reanimated';
import { signupUser } from '../../redux/reducers/Register/signupReducer';
import { connect } from 'react-redux';
import { toastError, toastsuccess } from '../../components/toastCustom';
import { Dropdown } from 'react-native-element-dropdown';
import Font from '../../constants_Tu/Font';
import HeaderComp from '../../components/Header';
import LoadingModal from '../../components/loading';


function Register(props) {
  const {
    navigation,
    signupState,
    signupUser
  } = props;
  const Spacing = 10;
  const [valueUserName, setValueUserName] = useState('')
  const [valueName, setValueName] = useState('')
  const [valueCIC, setValueCIC] = useState('')
  const [valueAddress, setValueAddress] = useState('')
  const [valuePhone, setValuePhone] = useState('')
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [retypevaluePassword, setRetypevaluePassword] = useState('');

  const [errorValueEmail, setErrorValueEmail] = useState('');
  const [errorValuePassword, setErrorValuePassword] = useState('');
  const [errorUserName, setErrorUserName] = useState('')
  const [errorPhone, setErrorPhone] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorValueCIC, setErrorValueCIC] = useState('')
  const [errorValueAddress, setErrorValueAddress] = useState('')
  const [value, setValue] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  const [errorValue, seterrorValue] = useState("Vui lòng lựa chọn kiểu tài khoản");

  const [isButtonDisabled, setButtonDisabled] = React.useState(false);
  const userData = value === "customer" ? {
    username: valueUserName,
    password: valuePassword,
    name: valueName,
    phone: valuePhone,
    email: valueEmail,
  } : {
    username: valueUserName,
    password: valuePassword,
    name: valueName,
    phone: valuePhone,
    email: valueEmail,
    cic: valueCIC,
    address: valueAddress
  }


  const data = [
    { label: 'Khách hàng', value: 'customer' },
    { label: 'Người bán hàng', value: 'business' },
  ];
  const handlePressOrError = async () => {
    if (!value) {
      toastError("Xin lỗi", "Vui lòng nhập đầy đủ thông tin");

    }
    if (value === "business") {
      if (errorValueAddress !== '' || errorValueCIC !== '' || value === null || errorName !== '' || errorPhone !== '' || errorUserName !== '' || errorValueEmail !== '' || errorValuePassword !== '') {

        toastError("Xin lỗi", "Vui lòng nhập đầy đủ thông tin");
      }
      else if (valueAddress !== '' || valueCIC !== '' || valueName === '' || valueUserName === '' || valuePassword === '' || retypevaluePassword === '' || valueEmail === '' || valuePhone === '') {
        toastError("Xin lỗi", "Vui lòng nhập đầy đủ thông tin");

      }
      else {
        await handlePress();
      }
    }
    else if (value === "customer") {
      if (value === null || errorName !== '' || errorPhone !== '' || errorUserName !== '' || errorValueEmail !== '' || errorValuePassword !== '') {

        toastError("Xin lỗi", "Vui lòng nhập đầy đủ thông tin");
      }
      else if (valueName === '' || valueUserName === '' || valuePassword === '' || retypevaluePassword === '' || valueEmail === '' || valuePhone === '') {
        toastError("Xin lỗi", "Vui lòng nhập đầy đủ thông tin");

      }
      else {
        await handlePress();
      }
    }
  };
  const handlePress = async () => {
    setButtonDisabled(true);
    setIsLoading(true);

    await signupUser(userData, value).then(data => {
      console.log("data in reg: ", data.token);
      if (data?.token) {
        setValueName('')
        setValueUserName('')
        setValuePassword('')
        setRetypevaluePassword('')
        setValueEmail('')
        setValuePhone('')
        setButtonDisabled(false);
        setIsLoading(false);

        console.log(("Vào OK "));
        toastsuccess("Cảm ơn", "Bạn đã đăng ký tài khoản thành công!")
        navigation.navigate("Login")
      }
      if (data.includes("Error") || data.includes("failed")) {
        setIsLoading(false);

        toastError("Xin lôi", JSON.stringify(data))
        console.log(("Vào lỗi"));
        setButtonDisabled(false);
      }
      setButtonDisabled(false)
      setIsLoading(false);
    })


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
      {isLoading && <LoadingModal isLoading={true}></LoadingModal>}

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
            setValue(item.value),
              seterrorValue("")

          }}

        />
        {value !== '' && errorValue !== '' ? < Text style={{ color: 'red', marginHorizontal: 15, }}>{errorValue}</Text> : null}







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
        {value === 'business' && (<View>
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
              CIC
            </Text>

            <TextInput
              value={valueCIC}
              keyboardType='phone-pad'
              onChangeText={text => {
                setErrorValueCIC(isValidCIC(text) ? '' : 'CIC không hợp lệ.')
                setValueCIC(text)
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
              placeholder="1234567890"></TextInput>
            {valueCIC !== '' && < Text style={{ color: 'red' }}>{errorValueCIC}</Text>}
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
              Địa chỉ
            </Text>

            <TextInput
              value={valueAddress}
              onChangeText={text => {
                setErrorValueAddress(isValidCIC(text) ? '' : '')
                setValueAddress(text)
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
              placeholder="Địa chỉ của bạn"></TextInput>
          </View>
        </View>)}
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
              marginTop: 10,
            }}>
            Mật khẩu
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              value={valuePassword}
              onChangeText={(text) => {
                setErrorValuePassword(
                  isValidPassword(text) ? '' : 'Mật khẩu bao gồm 1 chữ cái in đậm, số và 1 ký tự đặc biệt\n'
                );
                setValuePassword(text);
              }}
              style={{
                flex: 1,
                marginTop: 10,
                backgroundColor: '#f1f4ff',
                borderRadius: 20,
                color: '#616161',
                fontSize: 16,
                paddingRight: 40, // Để tạo không gian cho icon
              }}
              placeholderTextColor="gray"
              underlineColor="transparent"
              secureTextEntry={!isPasswordVisible} // Hiển thị hoặc ẩn mật khẩu tùy thuộc vào trạng thái của biến isPasswordVisible
              placeholder="Nhập mật khẩu của bạn"
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={!isPasswordVisible ? 'eye-slash' : 'eye'}
                size={20}
                color="gray"
                style={{ position: 'absolute', right: 10 }} // Điều chỉnh vị trí của icon
              />
            </TouchableOpacity>
          </View>
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              value={retypevaluePassword}
              onChangeText={text => setRetypevaluePassword(text)}
              style={{
                flex: 1,
                marginTop: 10,
                backgroundColor: '#f1f4ff',
                borderRadius: 20,
                color: '#616161',
                fontSize: 16,
                paddingRight: 40, // Để tạo không gian cho icon
              }}
              placeholderTextColor="gray"
              underlineColor="transparent"
              secureTextEntry={!isPasswordVisible} // Hiển thị hoặc ẩn mật khẩu tùy thuộc vào trạng thái của biến isPasswordVisible
              placeholder="Nhập lại mật khẩu của bạn"
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={!isPasswordVisible ? 'eye-slash' : 'eye'}
                size={20}
                color="gray"
                style={{ position: 'absolute', right: 10 }} // Điều chỉnh vị trí của icon
              />
            </TouchableOpacity>
          </View>
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
              keyboardType="phone-pad"
              onChangeText={text => {
                setButtonDisabled(false)
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
          style={{ padding: 20 }}>
          <TouchableOpacity
            onPress={async () => {
              handlePressOrError()
            }}
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
