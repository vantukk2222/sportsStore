import { Link } from 'react-router-dom';

const MenuBusiness = () => {
    return (
        <div className="menubusiness">
            <div className="menu-business">
                <label>
                    <Link to="/businesstrack">
                        <i className="fas fa-shopping-cart"></i> Quản lý đơn hàng
                    </Link>
                </label>
            </div>
            <div className="menu-business">
                <label>
                    <Link to="/businessproduct">
                        <i className="fas fa-box"></i> Quản lý sản phẩm
                    </Link>
                </label>
            </div>
            <div className="menu-business">
                <label>
                    <Link to="/businesssale">
                        <i className="fas fa-calendar-alt"></i> Quản lý sự kiện
                    </Link>
                </label>
            </div>
            <div className="menu-business">
                <label>
                    <Link to="/businessrevenue">
                        <i className="fas fa-chart-line"></i> Doanh thu
                    </Link>
                </label>
            </div>
        </div>
    );
};

export default MenuBusiness;
