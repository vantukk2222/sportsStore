import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { asyncStorage } from '../utilies/asyncStorage';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/Login/signinReducer';
import { colors } from '../constants';
import { store } from '../redux/store';
import { useNavigation } from '@react-navigation/native';

const HeaderComp = ({init = "Start", id_user}) => {
    // const init = "Start";
    // const dispatch = useDispatch();
    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
      };

    return (
        <View style={styles.headerContainer}>
            {init == "Start"? "":(<Icon name="angle-left" size={30} style={styles.iconBuffer} onPress={() => { goBack}} />)}
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                {/* <View style={styles.location}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 25 }}>
                        HOME
                    </Text>
                </View> */}
            </View>
            <Icon name="shopping-cart" size={30} style={styles.iconShopping} onPress={()=>{navigation.navigate("Cart", {id_user:id_user})}}/>
        </View>
    );
};
const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
    },
    iconBuffer:
    {
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
