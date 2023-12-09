import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { asyncStorage } from '../utilies/asyncStorage';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/reducers/Login/signinReducer';
import { colors } from '../constants';
import { store } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { fetchUserByUserName } from '../redux/reducers/User/userInfor';
import { toastError } from './toastCustom';

const HeaderComp = ({init = "Start"}) => {

    // const init = "Start";
    // const dispatch = useDispatch();
    const { authToken, userName, isLoading, error: errorLogin } = useSelector((state) => state.login)
    const { data: dataUser, loading: loadingUser, error: errorUser } = useSelector((state) => state.userData)

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const goBack = () => {
        navigation.goBack();
        // console.log("Log number id: ", 111);
      };
    useEffect(()=>{
        console.log("Username in Header: ", userName);
        try {
            dispatch(fetchUserByUserName(userName))
        }
        catch(error){}
    },[userName])
    return (
        <View style={styles.headerContainer}>
            {init === "Start"? "":(<TouchableOpacity onPress={()=>{goBack()}}>
                <Icon name="angle-left" size={30} style={styles.iconBuffer}></Icon>
            </TouchableOpacity>)}
            {/* {init == "Start"? "":(<Icon name="angle-left" size={30} style={styles.iconBuffer} onPress={() => { goBack}} />)} */}
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                {/* <View style={styles.location}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 25 }}>
                        HOME
                    </Text>
                </View> */}
            </View>
            <Icon name="shopping-cart" size={30} style={styles.iconShopping} onPress={()=>{userName? navigation.navigate("Cart", {id_user:dataUser?.id}) : toastError("Bạn chưa đăng nhập", "Xin vui lòng đăng nhập")}}/>
        </View>
    );
};
const styles = StyleSheet.create({
    
    headerContainer: {
        backgroundColor:"#EEEEEE",
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        // marginTop: 5,
        justifyContent: 'space-between',
        height:30
    },
    iconBuffer:
    {
        // backgroundColor:"green",
        // witd:30,
        color:'#4873E0',
        alignItems: 'flex-end',
        marginLeft: 15,

    },
    iconShopping:
    {
        color: '#4873E0',
        alignItems: 'flex-start',
        marginRight: 15
    },
    // location: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems:'center',
    //     marginLeft: 10,
    // }
});

export default HeaderComp;
