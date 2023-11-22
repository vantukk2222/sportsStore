import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/Login/signinReducer';
import { colors } from '../constants';
// {asyncStorage}
const HeaderComp = () => {
    const dispatch = useDispatch();
    return (
        <View style={styles.headerContainer}>
            <Icon name="buffer" size={30} style={styles.iconBuffer} onPress={() => { dispatch(logout()) }} />
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                {/* <View style={styles.location}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 25 }}>
                        HOME
                    </Text>
                </View> */}
            </View>
            <Icon name="shopping-cart" size={30} style={styles.iconShopping} />
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
        color: colors.denNhe,
        alignItems: 'flex-end',
        marginLeft: 15,

    },
    iconShopping:
    {
        color: '#333333',
        alignItems: 'flex-start',
        marginRight: 15
    },
    location: {
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: 10,
    },
});

export default HeaderComp;
