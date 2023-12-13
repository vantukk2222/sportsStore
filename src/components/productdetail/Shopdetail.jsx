import React from 'react'
import logoImage from "./shop.png";
import { useHistory } from 'react-router-dom';

const Shopdetail = () => {
    const history = useHistory();

  const handleViewShopClick = () => {
    history.push('/product');
  };

  const handleSendMessageClick = () => {
    history.push('/messaging');
  };
    return (
        <div className="shopdetail-container">
            <div className="store-header">
                <div className="store-header-info">
                    <div className='shop-name'>
                        <img src={logoImage} alt="DT5 SPORT" />
                        <div className='shop-flow'>
                        &nbsp;<h1 className='h1-shopname'>DT5Sport</h1>

                        <button className='b' onClick={handleViewShopClick}>Shop</button>
                        <button className='b' onClick={handleSendMessageClick}>Nhắn tin</button>
                        </div>
                    </div>
                    <div className='shop-review'>
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
                            <span className="icon">&#128100;</span> Products: 150
                        </p>
                        <p>
                            <span className="icon">&#128100;</span> Tham gia: 20/10/2023

                        </p>
                    </div>
                </div>
            </div>
            {/* Rest of your content goes here */}
        </div>
    )
}

export default Shopdetail