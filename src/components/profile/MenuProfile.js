import React from 'react';
import { Link } from 'react-router-dom';

import './Profile.css'; // Import file CSS

const MenuProfile = () => {
    return (
        <>
            <div className='category'>
                <div className="menu-profile">
                    <h3>Nguyễn Bảo</h3>
                    <label className='lableprofile'><Link to="/profile">👤Hồ sơ</Link></label>
                    <label className='lableprofile'><Link to="/adress">📍Địa chỉ</Link></label>
                    <label className='lableprofile'><Link to="/bank"> 💳Ngân Hàng</Link></label>
                    <label className='lableprofile'><Link to="/order">🔔Đơn hàng</Link></label>
                </div>
            </div>
        </>
    );
};

export default MenuProfile;
