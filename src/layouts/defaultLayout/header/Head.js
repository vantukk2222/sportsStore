import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
const Head = () => {
    const [login, setLogin] = useState(false);
    const storage = localStorage.getItem('authToken');
    useEffect(() => {
        if (storage) setLogin(true);
    }, [storage]);
    return (
        <>
            <section className="head">
                <div className="container d_flex">
                    <div className="left row"></div>
                    <div className="right row RText">
                        <label>
                            <Link to="/contact">Liên hệ</Link>
                        </label>
                        {login ? (
                            <i className="fa fa-user icon-circle"></i>
                        ) : (
                            <>
                                <label>
                                    <Link to="/login">Đăng nhập</Link>
                                </label>
                                <label>
                                    <Link to="/register">Đăng ký</Link>
                                </label>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Head;
