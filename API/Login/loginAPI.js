import axios from "axios"
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";

const loginPage = async (email, password) => {
  console.log("login API: username: ", email , "\t pass: ", password);
    try {
        const response = await axios.post(urlAPI+'/api/v1/auth/signin', {
          username: email,
          password: password,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*'
          }
        });
        const { token } = response.data;
        // await asyncStorage.removeAuthToken()
        // await asyncStorage.setAuthToken(token)
        // console.log("API signin storage: " +token)
        return token;
      } catch (error) {

        console.log("error sign in"+error.message)
      }
}

export default loginPage;