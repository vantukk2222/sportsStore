import React, {useState, useEffect, useCallback} from 'react'
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
import { connect, useDispatch } from 'react-redux';
import { loginUser, setToken } from '../redux/reducers/Login/signinReducer';
// import { bindActionCreators } from 'redux';
import { asyncStorage } from '../utilies/asyncStorage';
import Loading from '../components/loading';
import * as Navigation from './stackNavigation';
// {loginScreenNavigator}
// {loginUser}
// {useEffect}
// {useCallBack}
const Stack = createStackNavigator();

const App = ({ loggedIn, loginUser }) => {
    const [isLogged, setisLogged] = useState(false)
    // const dispatch = useDispatch();
    const getData = async () => {
        try {
            const token = await asyncStorage.getAuthToken();
            setisLogged(token)
        } catch(error){}
    }
    
    //  useEffect(() => {
    //     const checkToken = async () => {
    //     try {
    //         const token = await getToken();
    //         if (token) {
    //             console.log("ok vao day: "+token);
    //         dispatch(setToken(token)); // Dispatch action để cập nhật trạng thái login với token đã có
    //         }
    //     } catch (error) {
    //         console.log("ok vao da11y");

    //         console.error('Error retrieving token:', error);
    //     }
    //     };

    //     checkToken();
    //  }, [loggedIn]);
    const [loading, setloading] = useState(true)
    useEffect(()=>{
        getData();
        setTimeout(() => {
            
        }, setloading(false),1000);
    },[])

    return (
        <>
        {loading?(
            <Loading />
        ) : (
            <>
            <NavigationContainer>
            {isLogged ? (<Navigation.MainScreenNavigator/>) : (<Navigation.LoginScreenNavigator/>)}
                </NavigationContainer>
                </>
        )}
        </>
    )
    // return  (
    //     <>
    //     {loading? (<Loading/>):(
    //         <>
    //             <NavigationContainer>
    //             {isLogged? (<mainScreenNavigator/>) : (<loginScreenNavigator/>)}
    //         </NavigationContainer>
    //         </>
    //     )}
    //     </>
    // )
}

const mapStateToProps = state => ({
    
    loggedIn: state.login.authToken, // Assuming authToken indicates user logged in
  });
  
  const mapDispatchToProps = {loginUser};
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);
  