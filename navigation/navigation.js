import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../redux/reducers/Login/authActions';
import {Login, Register, Home, Cart} from '../screens';
const Stack = createStackNavigator();

const Navigation = ({ loggedIn, loginUser }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={loggedIn ? 'Home' : 'Đăng nhập'}>
        <Stack.Screen name="Đăng nhập" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Đăng ký" component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.auth.authToken !== null, // Assuming authToken indicates user logged in
});

const mapDispatchToProps = dispatch => bindActionCreators({ loginUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
