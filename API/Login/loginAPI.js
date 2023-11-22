import axiosInstance, { setHeaderToken } from "../axiosConfig";
// import { asyncStorage } from "../../utilies/asyncStorage";

const loginPage = async (email, password) => {
    try {
        const response = await axiosInstance.post('/auth/signin', {
          username: email,
          password: password,
        });
        const { token } = response.data;
        console.log("token api login: ",token);
        setHeaderToken(token);
        // await asyncStorage.removeAuthToken()
        // await asyncStorage.setAuthToken(token)
        // console.log("API signin storage: " +await asyncStorage.getAuthToken())
        return token;
      } catch (error) {

        console.log("error sign in: "+error.message)
      }
}

export default loginPage;