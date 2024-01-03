import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import getUnAuth from '~/API/get';

const DEFAULT_AVATAR_URL = 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg';

const Comment = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const id = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
                let response = await getUnAuth(`comment/find-by-product/${id}`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }

                const processedComments = await Promise.all(
                    response.content.map(async (comment) => {
                        const userData = await getUserData(comment.id_user);
                        return { ...comment, name_user: userData.name, image_user: userData.image_url };
                    }),
                );

                setComments(processedComments);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const getUserData = async (id) => {
            try {
                setLoading(true);
                const response = await getUnAuth(`user/${id}`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                return response;
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location.pathname]);

    const getProductDetails = async (productId) => {
        try {
            const response = await getUnAuth(`product/${productId}`);
            if (!response) {
                throw new Error('Network response was not ok');
            }
            return response;
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            <div className="comment">
                <div className="product-comments-container">
                    <div className="header-comment">
                        <h3 className="product-title">ĐÁNH GIÁ</h3>
                    </div>
                    <ul>
                        {comments.map((comment, index) => {
                            function convertTimeToVietnamFormat(originalTime) {
                                const vietnamTime = new Date(originalTime);
                                const formattedResult = `${vietnamTime.getFullYear()}-${padZero(
                                    vietnamTime.getMonth() + 1,
                                )}-${padZero(vietnamTime.getDate())} ${padZero(vietnamTime.getHours())}:${padZero(
                                    vietnamTime.getMinutes(),
                                )}`;
                                return formattedResult;
                            }
                            function padZero(number) {
                                return number < 10 ? `0${number}` : `${number}`;
                            }
                            const convertedTime = convertTimeToVietnamFormat(comment.created_at);

                            return (
                                <li key={index} className="comment-item">
                                    <div className="comment-user">
                                        <div className="user-avatar">
                                            <img src={comment.image_user || DEFAULT_AVATAR_URL} alt="User Avatar" />
                                        </div>
                                        <div className="user-info">
                                            <p className="user-name">{comment.name_user}</p>
                                            <p className="comment-date">{convertedTime}</p>
                                        </div>
                                    </div>
                                    <div className="comment-content">{comment.content}</div>
                                    <div className="comment-images">
                                        {comment.imageSet?.map((image, imageIndex) => (
                                            <img
                                                key={imageIndex}
                                                src={image.url}
                                                alt={`Comment Image ${imageIndex + 1}`}
                                            />
                                        ))}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Comment;
