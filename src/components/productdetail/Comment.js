import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const Comment = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {}, []);
    return (
        <>
            <div className="comment">
                <div className="product-comments-container">
                    <div className="header-comment">
                        <h3 className="product-title">ĐÁNH GIÁ</h3>
                    </div>
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index} className="comment-item">
                                <div className="comment-header">
                                    {comment.img && (
                                        <img className="comment-image" src={comment.img} alt="User Avatar" />
                                    )}
                                    <div className="comment-details">
                                        <p>
                                            <strong>{comment.user}</strong>
                                        </p>
                                        <p>
                                            Đánh giá:{' '}
                                            {Array.from({ length: comment.rating }).map((_, index) => (
                                                <FaStar key={index} className="star-iicon" />
                                            ))}
                                        </p>
                                        <p>Sản phẩm: {comment.product}</p>
                                    </div>
                                </div>
                                <p className="comment-content">{comment.comment}</p>
                                <p className="comment-content">{comment.time}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Comment;
