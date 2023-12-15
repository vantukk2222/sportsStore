
import React from "react";
import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { fontSize } from "../constants";
import HomeBusiness from "../screens/Business/HomeBusiness";
import InforBusiness from "../screens/Business/InforBusiness";
import ProductBusiness from "../screens/Business/Products/ProductBusiness";

const Tab = createBottomTabNavigator();

export const BusinessBottomNavigator = (props) => {
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
            <Tab.Screen name="Home" component={HomeBusiness} options={{ headerShown: false }} />
            <Tab.Screen name="Sale" component={InforBusiness} options={{ headerShown: false }} />
            <Tab.Screen name="Product" component={ProductBusiness} options={{ headerShown: false }} />
            <Tab.Screen name="Me" component={InforBusiness} options={{ headerShown: false }} />
        </Tab.Navigator >
    );
}

