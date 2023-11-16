import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ProductItem from '../screens/Product/ProductItem';
import ProductList from '../screens/Product/ProductList';
import ProductDetail from '../screens/Product/ProductDetail';
import Start from '../screens/Home/Start';
import Information from '../screens/User/Information';
import UITab from './UITab';
const Stack = createNativeStackNavigator();
function App(props) {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName='Start' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Start' component={Start} />
            <Stack.Screen name='ProductList' component={ProductList} />
            <Stack.Screen name='ProductDetail' component={ProductDetail} />
            <Stack.Screen name='ProductItem' component={ProductItem} />
            <Stack.Screen name='Information' component={Information} />
            <Stack.Screen name='UITab' component={UITab} />
        </Stack.Navigator>
    </NavigationContainer>
}
export default App