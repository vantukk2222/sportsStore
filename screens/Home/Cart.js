import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import ItemCard from './itemCart';
function Cart() {
  // useEffect(() => {
  //   console.log("Home token:        "+AsyncStorage.getItem("authToken"));
  // },[])
  const [yourArray, setYourArray] = useState([1, 2, 3, 4, 5]);
  const elements = yourArray.map((item, index) => (
    <View  key ={index} style={{ marginVertical: 5, marginHorizontal: 10, borderRadius: 5,elevation:1 }}>
      <ItemCard></ItemCard>
    </View>
  ));
  return <View
    style={{
      flexDirection: 'column'
    }}>
    {/* <Text onPress={async () => {
      const token = await AsyncStorage.getItem("authToken")
      console.log("Cart token:        " + token);
    }}>Cart</Text> */}
    <ScrollView>
      {elements}
    </ScrollView>
  </View>
}

export default Cart;