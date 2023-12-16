import axios from 'axios';
const loginPage = async (email, password) => {
    try {
        const response = await axios.post(
            'https://project-pbl6-production.up.railway.app/api/v1/auth/signin',
            {
                username: email,
                password: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                },
            },
        );
        // const { token } = response.data;
        // localStorage.setItem('authToken', token);
        return response.data;
    } catch (error) {
        console.log('error sign in' + error.message);
    }
};

export default loginPage;
