import axios from 'axios';
const loginPage = async (email, password) => {
    try {
        const response = await axios.post(
            'https://project-pbl6-production.up.railway.app/api/v1/auth/signin',
            {
                id_user: 10,
                id_product: 1,
                quantity: 1,
                created_at: '2023-12-17T12:47:12.612Z',
                updated_at: '2023-12-17T12:47:12.612Z',
            },
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*'
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
