import { Cart, Login, Register, UITab } from "../screens"
import Start from "../screens/Home/Start"
import ProductDetail from "../screens/Product/ProductDetail"
import ProductItem from "../screens/Product/ProductItem"
import ProductList from "../screens/Product/ProductList"
import Information from "../screens/User/Information"

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

export const LoginScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name='Start' component={Start} options={{ headerShown: false }} />
            <Stack.Screen name="Cart" component={Cart}Cart options={{ headerShown: false }} />
            <Stack.Screen name='ProductList' component={ProductList} options={{ headerShown: false }} />
            <Stack.Screen name='ProductDetail' component={ProductDetail} options={{ headerShown: false }} />
            <Stack.Screen name='ProductItem' component={ProductItem} options={{ headerShown: false }} />
            <Stack.Screen name='Information' component={Information} options={{ headerShown: false }} />
            <Stack.Screen name='UITab' component={UITab} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}
export const MainScreenNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Start' component={Start} options={{ headerShown: false }} />
            <Stack.Screen name="Cart" component={Cart}Cart options={{ headerShown: false }} />
            <Stack.Screen name='ProductList' component={ProductList} options={{ headerShown: false }} />
            <Stack.Screen name='ProductDetail' component={ProductDetail} options={{ headerShown: false }} />
            <Stack.Screen name='ProductItem' component={ProductItem} options={{ headerShown: false }} />
            <Stack.Screen name='Information' component={Information} options={{ headerShown: false }} />
            <Stack.Screen name ='Login' component= {LoginScreenNavigator}/>
            <Stack.Screen name='UITab' component={UITab} options={{ headerShown: false }} />
        </Stack.Navigator> 
    )
};
// export default mainScreenNavigator;
