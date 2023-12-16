import { Link } from 'react-router-dom';
import './head.css';

const Head = () => {
    return (
        <>
            <section className="head">
                <div className="container d_flex">
                    <div className="left row">
                        📞
                        <label> +03 99 23 52 54</label>
                        ✉️
                        <label> dt5@gmail.com</label>
                    </div>
                    <div className="right row RText">
                        <label>
                            <Link to="/contact">📧 Liên hệ</Link>
                        </label>

                        <label>
                            <Link to="/login">Đăng nhập</Link>
                        </label>
                        <label>
                            <Link to="/register">Đăng ký</Link>
                        </label>

                        {/* Account Menu */}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Head;
