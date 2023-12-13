import React from 'react';
import logoImage from './shop.png';

const Shopdetail = ({ business }) => {
    const date = new Date(business.time_start);
    const d = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return (
        <div className="shopdetail-container">
            <div className="store-header">
                <div className="store-header-info">
                    <div className="shop-name">
                        <img src={logoImage} alt="DT5 SPORT" />
                        <div className="shop-flow">
                            &nbsp;<h1 className="h1-shopname">{business.name}</h1>
                            <button className="b">Xem shop</button>
                            {/* <button className="b">Nhắn tin</button> */}
                        </div>
                    </div>
                    <div className="shop-review">
                        <p>
                            <span className="icon">&#128722;</span> Followers: 1000
                        </p>
                        <p>
                            <span className="icon">&#128101;</span> Following: 500
                        </p>
                        <p>
                            <span className="icon">&#9733;</span> Ratings: 4.5
                        </p>
                        <p>
                            <span className="icon">&#128100;</span> Feedback: 95%
                        </p>
                        <p>
                            <span className="icon">&#128100;</span> Products: {business.count_product}
                        </p>
                        <p>
                            <span className="icon">&#128100;</span> Tham gia: {d}
                        </p>
                    </div>
                </div>
            </div>
            {/* Rest of your content goes here */}
        </div>
    );
};

export default Shopdetail;
