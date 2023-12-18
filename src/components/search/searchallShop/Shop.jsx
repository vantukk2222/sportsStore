// Shop.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faStar, faComment, faReply, faClock } from '@fortawesome/free-solid-svg-icons';

const Shop = ({ shop }) => {
  return (
    <div className="allshop">
      <img src={shop.logo} alt={shop.name} />
      <div className="allshop-info">
        <h2>{shop.name}</h2>
        <p>{shop.description}</p>
        <div className="allshopfollowers">
          <FontAwesomeIcon icon={faStar} /> Followers: {shop.followers} &nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faStar} /> Followers: {shop.followers}
        </div>
      </div>

      <div className='allshopdiv'>
        <FontAwesomeIcon icon={faShoppingBasket} /> Sản phẩm 
        <p>100</p>
      </div>

      <div className='allshopdiv'>
        <FontAwesomeIcon icon={faComment} /> Đánh giá
        <p>100</p>

      </div>

      <div className='allshopdiv'>
        <FontAwesomeIcon icon={faReply} /> Tỉ lệ phản hồi
        <p>100</p>

      </div>

      <div className='allshopdiv'>
        <FontAwesomeIcon icon={faClock} /> Thời gian phản hồi
        <p>100</p>

      </div>

      <div className='allshopdiv'>
        <button className="allshopview-button">View Shop</button>&nbsp;&nbsp;
        <button className="allshopview-button">Theo dõi</button>
      </div>
    </div>
  );
};

export default Shop;
