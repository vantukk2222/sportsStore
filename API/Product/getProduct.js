import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { useSelector } from "react-redux";
import axiosInstance from "../axiosConfig";

const getProduct = async (page, pageSize, sort, desc) => {
    try {
        const response = await axiosInstance.get('/product', {
            params: {
                page: page,
                page_size: pageSize,
                sort: sort,
                desc: desc

            }
        });

        // console.log('call API get product ', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        console.log(error.response);
        throw error;
        // return "Error login"
    }
};

export default getProduct;
