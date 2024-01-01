import React from "react";
import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StatisticScreen from "../screens/Business/Statistics/StatisticScreen";
import TopProduct from "../screens/Business/Statistics/TopProduct";

const Tab = createBottomTabNavigator();

export const StatisticBottomNavigator = (props) => {
    return (
        <Tab.Navigator
            initialRouteName="StatisticScreen"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === "Thống kê") {
                        iconName = focused ? "home" : "home";

                    } else if (route.name === "Sản phẩm") {
                        iconName = focused ? "cart-plus" : "shopping-cart";
                    }
                    return <Icon name={iconName} size={size} color={color} />;

                }
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
            <Tab.Screen name="Thống kê" component={StatisticScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Sản phẩm" component={TopProduct} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}