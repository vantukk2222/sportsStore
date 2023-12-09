
import React from "react";
import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionic from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SalesofBusiness from "../screens/Sale/SalesofBusiness"
import ProductList from "../screens/Product/ProductList"
import Start from "../screens/Home/Start";
import Information from "../screens/User/Information";
import { fontSize } from "../constants";

const Tab = createBottomTabNavigator();

export const LoginBottomNavigator = (props) => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home";

                    } else if (route.name === "Sale") {
                        iconName = focused ? "cart-plus" : "shopping-cart";

                    } else if (route.name === "Product") {
                        iconName = focused ? "archive" : "box";

                    } else if (route.name === "Me") {
                        iconName = focused ? "user" : "user-circle"
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'black',
                showLabel: true, // Đặt giá trị này thành true nếu bạn muốn hiển thị nhãn

                labelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                }
            }}
            tabBarStyle={{ height: 80 }}
        >
            <Tab.Screen name="Home" component={Start} options={{ headerShown: false }} />
            <Tab.Screen name="Sale" component={SalesofBusiness} options={{ headerShown: false }} />
            <Tab.Screen name="Product" component={ProductList} options={{ headerShown: false }} />
            <Tab.Screen name="Me" component={Information} options={{ headerShown: false }} />
        </Tab.Navigator >
    );
}

