import { Link } from 'react-router-dom';
const Head = () => {
    return (
        <>
            <section className="head">
                <div className="container d_flex">
                    <div className="left row">
                        <i className="fa fa-phone"></i>
                        <label> +03 99 23 52 54</label>
                        <i className="fa fa-envelope"></i>
                        <label> dt5@gmail.com</label>
                    </div>
                    <div className="right row RText">
                        <label>Thông báo</label>
                        <label>Hỗ trợ</label>
                        <label>
                            <Link to="/login">Đăng nhập</Link>
                        </label>
                        <label>
                            <Link to="/register">Đăng ký</Link>
                        </label>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Head;
