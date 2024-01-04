import axios from 'axios';
import { api } from './url';

export const postComment = async (CommentData, authToken) => {
    CommentData.id_imageSet = CommentData.id_imageSet.map((e) => e.id);
    try {
        await axios({
            method: 'post',
            url: `${api}comment/save`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: CommentData,
        });
    } catch (error) {
        console.error('Error updating sale:', error);
    }
};
