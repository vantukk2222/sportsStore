import React, { useState, useEffect, useCallback } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ProductItem from '../screens/Product/ProductItem';
import ProductList from '../screens/Product/ProductList';
import Start from '../screens/Home/Start';
import Information from '../screens/User/Information';
import UITab from './UserTab';
import { Login, MyCart, Register } from '../screens';
import { connect, useDispatch, useSelector } from 'react-redux';
import { loginUser, setToken } from '../redux/reducers/Login/signinReducer';
// import { bindActionCreators } from 'redux';
import { asyncStorage } from '../utilies/asyncStorage';
import Loading from '../components/loading';
import * as Navigation from './stackNavigation';
import * as BottomNavigation from './bottomNavigation';
import ListProductByCategory from '../screens/Category/ListProductByCategory';
// {loginScreenNavigator}
// {loginUser}
// {useEffect}
// {useCallBack}

const Stack = createStackNavigator();



const App = ({ loggedIn, loginUser, auth }) => {

    const role = useSelector((state) => state.role.role);
    const handNavigator = () => {
        if (role === "ROLE_BUSINESS") {
            return (
                <Navigation.BusinessScreenNavigator />
            )
        }
        else {
            return (
                <Navigation.LoginScreenNavigator />
            )
        }

    }
    return (

        <>
            <NavigationContainer>
                {handNavigator()}

            </NavigationContainer>
        </>
    )
}


const mapStateToProps = state => ({
    auth: state.login,
    loggedIn: state.login.authToken !== null, // Assuming authToken indicates user logged in
});


const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(App);

