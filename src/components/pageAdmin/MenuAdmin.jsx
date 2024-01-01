import {
    faBox,
    faCalendarAlt,
    faChartLine,
    faShoppingCart,
    faTachometerAlt,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const MenuAdmin = () => {
    return (
        <>
            <div className="menu-admin">
                <div className="menuadmin">
                    <label>
                        <FontAwesomeIcon icon={faTachometerAlt} />
                        &nbsp;&nbsp;
                        <Link to="/dashboard">Dashboard</Link>
                    </label>
                </div>
                <div className="menuadmin">
                    <label>
                        <FontAwesomeIcon icon={faUsers} />
                        &nbsp;&nbsp;
                        <Link to="/adminuser">Quản lý người dùng</Link>
                    </label>
                </div>
                <div className="menuadmin">
                    <label>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        &nbsp;&nbsp;
                        <Link to="/adminsale">Quản lý sự kiện</Link>
                    </label>
                </div>
                <div className="menuadmin">
                    <label>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        &nbsp;&nbsp;
                        <Link to="/admintrack">Quản lý đơn hàng</Link>
                    </label>
                </div>
                <div className="menuadmin">
                    <label>
                        <FontAwesomeIcon icon={faBox} />
                        &nbsp;&nbsp;
                        <Link to="/adminproduct">Quản lý sản phẩm</Link>
                    </label>
                </div>
                <div className="menuadmin">
                    <label>
                        <FontAwesomeIcon icon={faChartLine} />
                        &nbsp;&nbsp;
                        <Link to="/adminrevenue">Doanh thu</Link>
                    </label>
                </div>
            </div>
        </>
    );
};

export default MenuAdmin;
