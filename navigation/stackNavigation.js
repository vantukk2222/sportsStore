// <<<<<<< categoryDat
import { Cart, Login, MyCart, Register, UITab } from "../screens"
import Business from "../screens/Business/Business"
import ShopInfo from "../screens/Business/ShopInfo"
import DetailProduct from "../screens/Category/DetailProduct"
import ListProductByCategory from "../screens/Category/ListProductByCategory"
import ModalBuyProduct from "../screens/Category/ModalBuyProduct"
// =======
// import MyCart from "../screens/Home/MyCart"
// >>>>>>> NewD
import Start from "../screens/Home/Start"
import ProductItem from "../screens/Product/ProductItem"
import ProductList from "../screens/Product/ProductList"
import FlatListSale from "../screens/Sale/FlatListSale"
import ListProductofSale from "../screens/Sale/ListProductofSale"
import SalesofBusiness from "../screens/Sale/SalesofBusiness"
import Information from "../screens/User/Information"
import setInfor from "../screens/User/setInfor"

import { LoginBottomNavigator } from "./bottomNavigation"

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

export const LoginScreenNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="LoginBottomNavigator" >
            <Stack.Screen name="LoginBottomNavigator" component={LoginBottomNavigator} options={{ headerShown: false }} />
            <Stack.Screen name='Start' component={Start} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Cart" component={MyCart} options={{ headerShown: false }} />
            <Stack.Screen name='ProductList' component={ProductList} options={{ headerShown: false }} />
            <Stack.Screen name='ProductItem' component={ProductItem} options={{ headerShown: false }} />
            <Stack.Screen name='Information' component={Information} options={{ headerShown: false }} />
            <Stack.Screen name='setInfor' component={setInfor} options={{ headerShown: false }} />
            <Stack.Screen name='ListProductByCategory' component={ListProductByCategory} options={{ headerShown: false }} />
            {/* // <<<<<<< categoryDat */}
            <Stack.Screen name="DetailProduct" component={DetailProduct} options={{ headerShown: false }} />

            {/* // ======= */}
            {/* //             <Stack.Screen name='UITab' component={UITab} options={{ headerShown: false }} /> */}
            {/* // >>>>>>> NewD */}
            <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
                <Stack.Screen name="ModalBuyProduct" component={ModalBuyProduct} />
            </Stack.Group>
            <Stack.Screen name="ShopInfo" component={ShopInfo} options={{ headerShown: false }} />
            <Stack.Screen name="Business" component={Business} options={{ headerShown: false }} />
            <Stack.Screen name="ListProductofSale" component={ListProductofSale} options={{ headerShown: false }} />
            <Stack.Screen name="FlatListSale" component={FlatListSale} options={{ headerShown: false }} />
            <Stack.Screen name="SalesofBusiness" component={SalesofBusiness} options={{ headerShown: false }} />


        </Stack.Navigator>
    )
}
export const MainScreenNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Start' component={Start} options={{ headerShown: false }} />
            <Stack.Screen name="Cart" component={MyCart} options={{ headerShown: false }} />
            <Stack.Screen name='ProductList' component={ProductList} options={{ headerShown: false }} />
            <Stack.Screen name='ProductItem' component={ProductItem} options={{ headerShown: false }} />
            <Stack.Screen name='Information' component={Information} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={LoginScreenNavigator} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name='ListProductByCategory' component={ListProductByCategory} options={{ headerShown: false }} />
            {/* // <<<<<<< categoryDat */}
            <Stack.Screen name="DetailProduct" component={DetailProduct} options={{ headerShown: false }} />
            <Stack.Screen name="ShopInfo" component={ShopInfo} options={{ headerShown: false }} />
            <Stack.Screen name="Business" component={Business} options={{ headerShown: false }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="ModalBuyProduct" component={ModalBuyProduct} />
            </Stack.Group>
            {/* // ======= */}
            {/* //             <Stack.Screen name='UITab' component={UITab} options={{ headerShown: false }} /> */}
            {/* // >>>>>>> NewD */}

        </Stack.Navigator>
    )
};
// export default mainScreenNavigator;
