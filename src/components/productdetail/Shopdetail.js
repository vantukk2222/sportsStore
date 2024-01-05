import { useNavigate } from 'react-router';
import logoImage from './shop.png';

const Shopdetail = ({ business }) => {
    const navigate = useNavigate();

    const date = new Date(business.time_start);
    const d = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const handleClick = (id) => {
        navigate(`/shop/${id}`);
    };
    return (
        <div className="shopdetail-container">
            <div className="store-header">
                <div className="store-header-info">
                    <div className="shop-name">
                        <img src={logoImage} alt="DT5 SPORT" />
                        <div className="shop-flow">
                            &nbsp;<h1 className="h1-shopname">{business.name}</h1>
                            <button className="b" onClick={() => handleClick(business.id)}>
                                Xem shop
                            </button>
                            {/* <button className="b">Nhắn tin</button> */}
                        </div>
                    </div>
                    <div className="shop-review">
                        <p>
                            <span className="icon">&#128101;</span> Lượt thích: {business.count_comment_like}
                        </p>
                        <p>
                            <span className="icon">&#128101;</span> Lượt không thích: {business.count_comment_dislike}
                        </p>
                        <p>
                            <span className="icon">&#9733;</span> Đánh giá: {business.count_comment}
                        </p>

                        <p>
                            <span className="icon">&#128100;</span> Sản phẩm: {business.count_product}
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
