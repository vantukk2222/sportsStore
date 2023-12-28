import { Link } from 'react-router-dom';
const MenuBusiness = () => {
    return (
        <>
            <div className="category">
                <div className="menu-business">
                    <label>
                        <Link to="/businesstrack">Quản lý đơn hàng</Link>
                    </label>
                </div>
                <div className="menu-business">
                    <label>
                        <Link to="/businessproduct"> Quản lý sản phẩm</Link>
                    </label>
                </div>
                <div className="menu-business">
                    <label>
                        <Link to="/businesssale"> Quản lý sự kiện</Link>
                    </label>
                </div>
                <div className="menu-business">
                    <label>
                        <Link to="/businessrevenue"> Doanh thu</Link>
                    </label>
                </div>
            </div>
        </>
    );
};

export default MenuBusiness;
