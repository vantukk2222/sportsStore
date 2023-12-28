import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from './logooo.png';
import './headerlogin.css';

const HeaderLogin = () => {
    return (
        <>
            <section className="headlogin">
                <div className="header-container">
                    <img src={logoImage} className="imgheaderlogin"></img>
                    <label className="dn">
                        <h2>ĐĂNG NHẬP</h2>
                    </label>
                    <label className="label-left lableheaderlogin">
                        <Link to="/contact"> Bạn cần giúp đỡ gì?</Link>
                    </label>
                </div>
            </section>
        </>
    );
};

export default HeaderLogin;
