import axios from 'axios';
import { api } from './url';
const putCart = async (id, quantity, authToken) => {
    try {
        await axios({
            method: 'put',
            url: 'http://localhost:8080/api/v1/cart/change-quantity/20?quantity=5',
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTAiLCJyb2xlIjpbIlJPTEVfQ1VTVE9NRVIiXSwiaWF0IjoxNzAzMjM3NzkwLCJleHAiOjE3MDMyNTU3OTB9.lg7YLAMm4qkzkcrnonDU_nNHtt37s-s-ff5KMau4NiA`,
            },
        });
    } catch (error) {
        console.log('error sign in' + error.message);
    }
};

export default putCart;
