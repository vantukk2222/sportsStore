import AsyncStorage from "@react-native-async-storage/async-storage";

const setAuthToken =async (data) => {
    await AsyncStorage.setItem("authToken", String(data));
}

const getAuthToken = async()=> {
    return await AsyncStorage.getItem("authToken")
}
const removeAuthToken = async ()=> {
    await AsyncStorage.removeItem("auth.token");
}
export const  asyncStorage = {
    setAuthToken,
    getAuthToken,
    removeAuthToken
}