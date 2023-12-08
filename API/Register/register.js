import axios from "axios"
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";



const registerPage = async (userData) => {
  try {
    const response = await axios.post(urlAPI+'/api/v1/auth/signup', userData, {

      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
      }
    });
    const { token } = response.data;
    await asyncStorage.removeAuthToken()
    await asyncStorage.setAuthToken(token)

    console.log("signUp Token: " + token);
    console.log("error: " + response.data)
    return token;
    // You can handle success actions here, such as storing tokens or redirecting
  } catch (error) {

    console.log("error sign in" + error.message)
  }
}

export default registerPage;