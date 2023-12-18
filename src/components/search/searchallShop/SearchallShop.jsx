// SearchAllShops.js
import React from 'react';
import Shop from './Shop.jsx'; 
import allShopData from './allShopData.jsx';
import  './allShop.css'; 

const SearchallShop = () => {
  return (
    <div>
      <h2>Shop liên quan đến : </h2>
      <div className="allshop-list">
        {allShopData.map((shop, index) => (
          <Shop key={index} shop={shop} />
        ))}
      </div>
    </div>
  );
};

export default SearchallShop;
