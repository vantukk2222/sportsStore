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
function Home({navigation}) {
  // useEffect(() => {
  //   console.log("Home token:        "+AsyncStorage.getItem("authToken"));
  // },[])
  
  return <View
    style={{
      flexDirection: 'column'
    }}>
    <Text onPress={async () => {
      const token = await AsyncStorage.getItem("authToken")
      console.log("Home token:        " + token);
      navigation.navigate('Cart')
    }}>Home</Text>
     
  </View>

}

export default Home;