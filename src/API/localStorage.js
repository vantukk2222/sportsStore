import AsyncStorage from '@react-native-async-storage/async-storage';

const setAuthToken = async (data) => {
    await AsyncStorage.setItem('authToken', String(data));
};

const getAuthToken = async () => {
    return await AsyncStorage.getItem('authToken');
};
const removeAuthToken = async () => {
    //  console.log(getAuthToken())
    //  console.log("Remove Token");
    await AsyncStorage.removeItem('authToken');
    //console.log(getAuthToken());
};
export const asyncStorage = {
    setAuthToken,
    getAuthToken,
    removeAuthToken,
};
