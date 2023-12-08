import axios from 'axios';
const loginPage = async (email, password) => {
    try {
        const response = await axios.post(
            'http://ec2-3-25-109-240.ap-southeast-2.compute.amazonaws.com:5555/api/v1/auth/signin',
            {
                username: email,
                password: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: '*/*',
                },
            },
        );
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        return token;
    } catch (error) {
        console.log('error sign in' + error.message);
    }
};

export default loginPage;
