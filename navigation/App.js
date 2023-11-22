import React, { useState, useEffect, useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { connect, useDispatch } from 'react-redux';
import { loginUser, setToken } from '../redux/reducers/Login/signinReducer';
import Loading from '../assets/components/loading';
import * as Navigation from './stackNavigation';
import  { setHeaderToken } from '../API/axiosConfig';



const App = ({ loggedIn, loginUser,auth }) => {

    
useEffect(()=>{
    setHeaderToken(loggedIn??'')
},[loggedIn])
    return (
        <>
            <NavigationContainer>
                {loggedIn ? (<Navigation.MainScreenNavigator />) : (<Navigation.LoginScreenNavigator />)}
            </NavigationContainer>
        </>)
}

const mapStateToProps = state => ({
    auth: state.login,
    loggedIn: state.login.authToken !== null, // Assuming authToken indicates user logged in
});

const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(App);

