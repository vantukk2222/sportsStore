import React from 'react';
import logoImage from './shop.png';

const MainShop = ({ shopItem }) => {
    const date = new Date(shopItem.time_start);
    const d = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return (
        <div className="shop-container">
            <div className="store-header">
                <div className="store-header-info">
                    <div className="shop-name">
                        <h1>{shopItem.name}</h1>&nbsp;&nbsp;&nbsp;
                        <img src={logoImage} alt="DT5 SPORT" />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="b">Theo dõi</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        {/* <button className="b">Nhắn tin</button> */}
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
                            <span className="icon">&#128100;</span> Products: {shopItem.count_product}
                        </p>
                        <p>
                            <span className="icon">&#128100;</span> Tham gia: {d}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainShop;
