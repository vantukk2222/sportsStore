import React from "react";
import { Link } from "react-router-dom";
import './head.css';

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container d_flex'>
          <div className='left row'>
            📞
            <label> +03 99 23 52 54</label>
            ✉️
            <label> dt5@gmail.com</label>
          </div>
          <div className='right row RText'>
            📢
            <label>Thông báo</label>

            <label><Link to='/contact'>📧 Liên hệ</Link></label>
            <label><Link to="/login">Đăng nhập</Link></label>
            <label><Link to="/register">Đăng ký</Link></label>

            {/* Account Menu */}
            <div className="account-menu">
              <label><Link to="/account">👤 Tài khoản</Link></label>
              <ul>
                <li><Link to="/myacc">👤 Hồ sơ của tôi</Link></li>
                <li><Link to="/track">🛒 Đơn hàng</Link></li>
                <li><Link to="/account/settings">🚪 Đăng xuất</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Head;

