/** 
yarn add react-navigation
yarn add react-native-safe-area-context 
yarn add @react-navigation/bottom-tabs
yarn add @react-navigation/native
yarn add @react-navigation/native-stack
yarn add react-native-vector-icons

**/
import * as React from 'react'

import ProductList from '../screens/Product/ProductList';
import Start from '../screens/Home/Start';
import Information from '../screens/User/Information';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { fontSize, colors } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator()
const screenOptions = (route) => ({
    //route chua thong tin navigation
    headerShown: false,
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: colors.disable,
    tabBarActiveBackgroundColor: colors.alert,
    tabBarInctiveBackgroundColor: 'black',
    tabBarIcon: ({ focused, color, size }) => {
        let screenName = route.name // ten mang hinh
        return <Icon
            name={screenName == "ProductList" ? 'list-alt' :
                'address-card'}
            size={30}
            color={focused ? 'white' : colors.disable}
        />
    },
})
function UITab(props) {

    return <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name='ProductList' component={ProductList}
            options={{ tabBarLabel: 'Products' }} />
        <Tab.Screen name='Information' component={Information}
            options={{ headerShown: false }} />
    </Tab.Navigator>
}
export default UITab