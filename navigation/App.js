import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ProductItem from '../screens/Product/ProductItem';
import ProductList from '../screens/Product/ProductList';
import ProductDetail from '../screens/Product/ProductDetail';
import Start from '../screens/Home/Start';
import Information from '../screens/User/Information';
import UITab from './UITab';
import { Cart, Login, Register } from '../screens';
import { connect } from 'react-redux';
import { loginUser } from '../redux/reducers/Login/signinReducer';
import { bindActionCreators } from 'redux';
// {loginUser}
const Stack = createStackNavigator();

const App = ({ loggedIn, loginUser }) => {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName= {loggedIn ? 'Start': 'Login'} screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
            {/* <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/> */}
            <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }}/>
            <Stack.Screen name='Start' component={Start} />
            <Stack.Screen name='ProductList' component={ProductList} />
            <Stack.Screen name='ProductDetail' component={ProductDetail} />
            <Stack.Screen name='ProductItem' component={ProductItem} />
            <Stack.Screen name='Information' component={Information} />

            <Stack.Screen name='UITab' component={UITab} />
        </Stack.Navigator>
    </NavigationContainer>
}

const mapStateToProps = state => ({
    loggedIn: state.login.authToken !== null, // Assuming authToken indicates user logged in
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({ loginUser }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);
  