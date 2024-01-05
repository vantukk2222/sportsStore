import AsyncStorage from "@react-native-async-storage/async-storage";

const setAuthToken =async (data) => {
    await AsyncStorage.setItem("authToken", String(data));
}

const getAuthToken = async()=> {
    return await AsyncStorage.getItem("authToken")
}
const removeAuthToken = async ()=> {
    // console.log(getAuthToken())
    console.log("Remove Token");
    await AsyncStorage.removeItem("authToken");
    // console.log(getAuthToken())
}
const setUsername = async(username)=>{
    await AsyncStorage.setItem("userName", username);
}
const getUserNameStorage = async()=>{
    return await AsyncStorage.getItem("userName");

}

const setProductInfor = async(item)=>{
    console.log("Item:", item);
    await AsyncStorage.setItem("productInfor",JSON.stringify(item))
}
const getProductInfor = async()=>{
    return await AsyncStorage.getItem("productInfor")
}
const removeProductInfor = async()=>{
    await AsyncStorage.removeItem("productInfor")
}
export const  asyncStorage = {
    setAuthToken,
    getAuthToken,
    removeAuthToken,
    setUsername,
    getUserNameStorage,
    setProductInfor,
    getProductInfor,
    removeProductInfor
}