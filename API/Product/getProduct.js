import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector } from "react-redux";
import axiosInstance from "../axiosConfig";

const getProduct = async (page, pageSize, sort, desc) => {
    
    // const token = 

    try {
        const response = await axiosInstance.get('/product', {
            params: {
                page: page,
                page_size: pageSize,
                sort: sort,
                desc: desc
            }
        });
        return response.data.content;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
        // return "Error login"
    }
};

export default getProduct;
