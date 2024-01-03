import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useLocation } from 'react-router';
import getUnAuth from '~/API/get';

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
                response.content.map((e) => {
                    const UserData = async (id) => {
                        try {
                            setLoading(true);
                            const response = await getUnAuth(`user/${id}`);
                            if (!response) {
                                throw new Error('Network response was not ok');
                            }
                            e.name_user = response.name;
                            e.image_user = response.image_url;
                            return e;
                        } catch (error) {
                            setError(error);
                        } finally {
                            setLoading(false);
                        }
                    };
                    UserData(e.id_user);
                });
                setComments(response.content);
                console.log(response.content);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <div className="comment">
                <div className="product-comments-container">
                    <div className="header-comment">
                        <h3 className="product-title">ĐÁNH GIÁ</h3>
                    </div>
                    <ul>
                        {comments.map((comment, index) => {
                            return <li key={index} className="comment-item"></li>;
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Comment;
