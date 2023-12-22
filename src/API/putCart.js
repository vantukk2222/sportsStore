import axios from 'axios';
import { api } from './url';
const putCart = async (id, quantity, authToken) => {
    try {
        console.log(authToken);
        await axios.put('https://project-pbl6-production.up.railway.app/api/v1/cart/change-quantity/10?quantity=5', {
            headers: {
                'Content-Type': 'application/json',
                accept: '*/*',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTAiLCJyb2xlIjpbIlJPTEVfQ1VTVE9NRVIiXSwiaWF0IjoxNzAzMjM1MDU1LCJleHAiOjE3MDMyNTMwNTV9.j32DGDe3_FadfiIQf48CWsCMgL4hgQFd8G4rrhY-sjk`,
            },
        });
    } catch (error) {
        console.log('error sign in' + error.message);
    }
};

export default putCart;
