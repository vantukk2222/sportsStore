import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const CheckoutAd = ({ selectedItems }) => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        phoneNumber: '',
        address: '',
    });

    useEffect(() => {
        if (selectedItems && selectedItems.length > 0) {
            const user = selectedItems[0].user;
            setUserInfo({
                name: user.name,
                phoneNumber: user.phone,
                address: user.address,
            });
        }
    }, [selectedItems]);

    return (
        <div className="CheckoutAd">
            <div className="head-CheckoutAd">
                <FaMapMarkerAlt /> &nbsp; Địa chỉ nhận hàng
            </div>
            <div className="list-CheckoutAd">
                <p>Tên: {userInfo.name}</p>
                <p>Số điện thoại: {userInfo.phoneNumber}</p>
                <p>Địa chỉ: {userInfo.address}</p>
                <Link to="/profile">Thay đổi</Link>
            </div>
        </div>
    );
};

export default CheckoutAd;
