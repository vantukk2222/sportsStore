import axios from 'axios';
import { api } from './url';

export const putProductInformation = async (productId, productData, authToken) => {
    const images = productData.imageSet.map((e) => e.id);
    const category = productData.categorySet.map((e) => e.id);
    console.log('Product :', productData.name, productData.id_business, images);
    try {
        await axios({
            method: 'put',
            url: `${api}product-information/save/${productId}`,
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
    } catch (error) {
        console.error('Error updating product:', error);
    }
};
