import React from 'react';

const Sortproduct = ({}) => {
    return (
        <div className="sort-product">
            <ul className="sort-buttons">
                <p>Sắp xếp theo:</p>

                <li className="sort">Liên quan</li>
                <li className="sort">Mới nhất</li>
                <li className="sort">Bán chạy</li>
                <li className="menu-sort">
                    <span>Giá</span>

                    <ul className="menu-content">
                        <li>Giá tăng dần</li>
                        <li>Giá giảm dần</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default Sortproduct;
