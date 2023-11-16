import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
const HeaderComp = () => {
    return (
        <View style={styles.headerContainer}>
            <Icon name="buffer" size={25} style={{ color: 'black' }} />
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Icon name="align-left" size={25} style={{ marginTop: 10, color: 'black' }} />
                <View style={styles.location}>
                    <Text style={{ fontWeight: 'bold', marginLeft: 20, color: 'black' }}>
                        Delivery To :
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ color: 'black' }}>Mohali, Punjab</Text>
                        <MaterialCommunity name="menu-down" size={25} style={{ color: 'black' }} />
                    </View>
                </View>
            </View>
            <Icon name="shopping-cart" size={25} style={{
                color: 'black'
            }} />
        </View>
    );
};
const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 20,
    },
    location: {
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: 10,
    },
});

export default HeaderComp;
