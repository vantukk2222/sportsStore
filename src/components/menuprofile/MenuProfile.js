import { Link } from 'react-router-dom';

import '../profile/Profile.css';

const MenuProfile = () => {
    return (
        <>
            <div className="category">
                <div className="menu-profile">
                    <label className="lableprofile">
                        <Link to="/profile">👤Hồ sơ</Link>
                    </label>
                    <label className="lableprofile">
                        <Link to="/address">📍Địa chỉ</Link>
                    </label>
                    <label className="lableprofile">
                        <Link to="/bank"> 💳Ngân Hàng</Link>
                    </label>
                    <label className="lableprofile">
                        <Link to="/order">🔔Đơn hàng</Link>
                    </label>
                </div>
            </div>
        </>
    );
};

export default MenuProfile;
