import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Alert,
  } from 'react-native';
function Home(){
  // useEffect(() => {
  //   console.log("Home token:        "+AsyncStorage.getItem("authToken"));
  // },[])
return <Text
onPress={async ()=> {
  const token = await  AsyncStorage.getItem("authToken")
  console.log("Home token:        "+token);
}}>
    Homeeeeeeeeeeeee
</Text>
}

export default Home;