// Shop.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faStar, faComment, faReply, faClock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

const Shop = ({ shop }) => {
   
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/shop/${id}`);
    };
    return (
        <div className="allshop">
            <div className="allshop-info">
                <h2>{shop.name}</h2>
                <p>{shop.description}</p>
            </div>

            <div className="allshopdiv">
                <FontAwesomeIcon icon={faShoppingBasket} /> Sản phẩm
                <p>{shop.count_product}</p>
            </div>

            <div className="allshopdiv">
                <FontAwesomeIcon icon={faComment} /> Đánh giá
                <p>{shop.count_comment}</p>
            </div>

            <div className="allshopdiv">
                <FontAwesomeIcon icon={faReply} /> Tỉ lệ phản hồi
                <p>100%</p>
            </div>

            <div className="allshopdiv">
                <FontAwesomeIcon icon={faClock} /> Thời gian phản hồi
                <p>Không có sẵn</p>
            </div>

            <div className="allshopdiv">
                <button className="allshopview-button" onClick={() => handleClick(shop.id)}>
                    View Shop
                </button>
                &nbsp;&nbsp;
                {/* <button className="allshopview-button">Theo dõi</button> */}
            </div>
        </div>
    );
};

export default Shop;
