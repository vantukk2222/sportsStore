// <<<<<<< categoryDat
import { initialCalculations } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils"
import { Cart, Login, MyCart, Register, UITab } from "../screens"
// {Register}
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
import SetInfor from "../screens/User/setInfor"
import CreateNewProduct from "../screens/Business/Products/CreateNewProduct"

import { LoginBottomNavigator } from "./bottomNavigation"

import { createStackNavigator } from '@react-navigation/stack'
import { BusinessBottomNavigator } from './bottomBusinessNavigation'
import CreateSize from "../screens/Business/Products/CreateSize"
import setProductinSale from "../screens/Business/Sale/setProductinSale"
import CreateSale from "../screens/Business/Sale/CreateSale"
import Sale from "../screens/Business/Sale/Sale"
import ListSale from "../screens/Business/Sale/ListSale"
import EditSale from "../screens/Business/Sale/EditSale"
import EditProductInfor from "../screens/Business/Products/EditProductInfor"
import EditandDelete from "../screens/Business/Products/SetImage/EditandDelete"
import EditProductSize from "../screens/Business/Products/EditProductSize"
import StatisticScreen from "../screens/Business/Statistics/StatisticScreen"
import OrderHistoryScreen from "../screens/Cart/OrderHistory"
import DetailOrderScreen from "../screens/Cart/detailOrder"
import OrderScreen from "../screens/Business/Order/OrderScreen"
import Orderdetail from "../screens/Business/Order/Orderdetail"

import { StatisticBottomNavigator } from "./bottomStatistic"
import SetMain from "../screens/Business/Products/SetImage/SetMain"
import setInforBusiness from "../screens/Business/Me/setInforBusiness"
import RatingOrder from "../screens/Cart/ratingOrder"
import HomeBusiness from "../screens/Business/HomeBusiness";
import InforBusiness from "../screens/Business/InforBusiness";
import ProductBusiness from "../screens/Business/Products/ProductBusiness";
const Stack = createStackNavigator();
export const BusinessScreenNavigator = () => {
    console.log("vodayyyyy business: ");
    return (
        <Stack.Navigator initialCalculations="BusinessBottomNavigator">
            <Stack.Screen name="BusinessBottomNavigator" component={BusinessBottomNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeBusiness} options={{ headerShown: false }} />
            <Stack.Screen name="Product" component={ProductBusiness} options={{ headerShown: false }} />
            <Stack.Screen name="Me" component={InforBusiness} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />

            <Stack.Screen name="CreateNewProduct" component={CreateNewProduct} options={{ headerShown: false }} />
            <Stack.Screen name="CreateSize" component={CreateSize} options={{ headerShown: false }} />
            <Stack.Screen name="setProductinSale" component={setProductinSale} options={{ headerShown: false }} />
            <Stack.Screen name="CreateSale" component={CreateSale} options={{ headerShown: false }} />
            <Stack.Screen name="Sale" component={Sale} options={{ headerShown: false }} />
            <Stack.Screen name="ListSale" component={ListSale} options={{ headerShown: false }} />
            <Stack.Screen name="EditSale" component={EditSale} options={{ headerShown: false }} />
            <Stack.Screen name="EditProductInfor" component={EditProductInfor} options={{ headerShown: false }} />
            <Stack.Screen name="EditandDelete" component={EditandDelete} options={{ headerShown: false }} />
            <Stack.Screen name="EditProductSize" component={EditProductSize} options={{ headerShown: false }} />
            <Stack.Screen name="StatisticScreen" component={StatisticScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Orderdetail" component={Orderdetail} options={{ headerShown: false }} />
            <Stack.Screen name="StatisticBottomNavigator" component={StatisticBottomNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="SetMain" component={SetMain} options={{ headerShown: false }} />
            <Stack.Screen name="setInforBusiness" component={setInforBusiness} options={{ headerShown: false }} />



        </Stack.Navigator>
    )
}

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

            <Stack.Screen name='setInfor' component={SetInfor} options={{ headerShown: false }} />
            <Stack.Screen name='OrderHistory' component={OrderHistoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name='ListProductByCategory' component={ListProductByCategory} options={{ headerShown: false }} />
            {/* // <<<<<<< categoryDat */}
            <Stack.Screen name="RatingOrder" component={RatingOrder} options={{ headerShown: false }} />

            <Stack.Screen name="DetailProduct" component={DetailProduct} options={{ headerShown: false }} />
            <Stack.Screen name="detailOrder" component={DetailOrderScreen} options={{ headerShown: false }} />
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

// export const MainScreenNavigator = () => {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name='Start' component={Start} options={{ headerShown: false }} />
//             <Stack.Screen name="Cart" component={MyCart} options={{ headerShown: false }} />
//             <Stack.Screen name='ProductList' component={ProductList} options={{ headerShown: false }} />
//             <Stack.Screen name='ProductItem' component={ProductItem} options={{ headerShown: false }} />
//             <Stack.Screen name='Information' component={Information} options={{ headerShown: false }} />
//             <Stack.Screen name='Login' component={LoginScreenNavigator} />
//             <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
//             <Stack.Screen name='ListProductByCategory' component={ListProductByCategory} options={{ headerShown: false }} />
//             {/* // <<<<<<< categoryDat */}
//             <Stack.Screen name="DetailProduct" component={DetailProduct} options={{ headerShown: false }} />
//             <Stack.Screen name="ShopInfo" component={ShopInfo} options={{ headerShown: false }} />
//             <Stack.Screen name="Business" component={Business} options={{ headerShown: false }} />
//             <Stack.Group screenOptions={{ presentation: 'modal' }}>
//                 <Stack.Screen name="ModalBuyProduct" component={ModalBuyProduct} />
//             </Stack.Group>
//             {/* // ======= */}
//             {/* //             <Stack.Screen name='UITab' component={UITab} options={{ headerShown: false }} /> */}
//             {/* // >>>>>>> NewD */}

//         </Stack.Navigator>
//     )
// };
// // export default mainScreenNavigator;
