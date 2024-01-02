import axios from 'axios';
import { api } from './url';

export const postProductInformation = async (productData, authToken) => {
    const images = productData.imageSet.map((e) => e.id);
    const category = productData.categorySet.map((e) => e.id);
    try {
        const response = await axios({
            method: 'post',
            url: `${api}product-information/save`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: {
                name: productData.name,
                id_business: productData.id_business,
                id_imageSet: images,
                id_categorySet: category,
            },
        });
        return response;
    } catch (error) {
        console.error('Error updating product:', error);
    }
};
