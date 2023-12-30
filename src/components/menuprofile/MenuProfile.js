import { Link } from 'react-router-dom';

import '../profile/Profile.css';
import { useSelector } from 'react-redux';
const MenuProfile = () => {
    const { dataRole, loadingRole, errorRole } = useSelector((state) => state.roleReducer);
    return (
        <>
            <div className="category">
                <div className="menu-profile">
                    <label className="lableprofile">
                        <Link to="/profile">👤Hồ sơ</Link>
                    </label>
                    {dataRole[0] != 'ROLE_BUSINESS' && (
                        <label className="lableprofile">
                            <Link to="/order/5">🔔Đơn hàng</Link>
                        </label>
                    )}
                </div>
            </div>
        </>
    );
};

export default MenuProfile;
