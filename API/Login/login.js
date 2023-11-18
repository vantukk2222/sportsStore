import axios from "axios"
import { asyncStorage } from "../../utilies/asyncStorage";
const clearAuthToken = async () => {
  await asyncStorage.removeAuthToken("authToken")
  console.log("auth token cleared");
};
const loginPage = async (email, password) => {
    try {
        const response = await axios.post('https://project-pbl6-production.up.railway.app/api/v1/auth/signin', {
          username: email,
          password: password,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*'
          }
        });
        const { token } = response.data;
        clearAuthToken()
        await asyncStorage.setAuthToken(token)
        console.log("API signin storage: " +await asyncStorage.getAuthToken())
        return token;
      } catch (error) {

        console.log("error sign in"+error.message)
      }
}

export default loginPage;