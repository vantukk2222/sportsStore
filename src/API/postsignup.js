import axios from 'axios';
import { api } from './url';
const postRegister = async (data, role) => {
    console.log(data, role);
    try {
        // console.log(data);
        // const response = await axios.post(
        //     `${api}auth/${role}`,
        //     {
        //         username: data.username,
        //         password: data.password,
        //         name: data.name,
        //         phone: data.phone,
        //         email: data.email,
        //     },
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Accept: '*/*',
        //         },
        //     },
        // );
        // return response.data;
    } catch (error) {
        console.log('error sign in' + error.message);
    }
};

export default postRegister;
