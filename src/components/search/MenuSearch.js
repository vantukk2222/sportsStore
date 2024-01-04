import React, { useState, useEffect } from "react";

const MenuSearch = ({ shopItems, apiCate }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleFilterClick = () => {
        // Xử lý logic lọc dữ liệu ở đây, có thể sử dụng minPrice và maxPrice
        // Ví dụ: Gửi yêu cầu lọc đến server hoặc lọc dữ liệu trên client
     
      };
    
    return (
        <div className='category'>
            <div className="filter-category">
            <h1>BỘ LỌC TÌM KIẾM</h1>
                <h3>DANH MỤC</h3>
                <button style={{ color: "black" }} >
                    Hiếu
                </button>
                <button style={{ color: "black" }} >
                    Bảo
                </button>
            </div>

            <div className="filter-category">
                <h3>SẢN PHẨM</h3>

                <button style={{ color: "black" }} >
                    Hiếu
                </button>
                <button style={{ color: "black" }} >
                    Bảo
                </button>

            </div>
            <div className="filter-category">
                <h3>ĐƠN VẬN CHUYỂN</h3>

                <button style={{ color: "black" }} >
                    Hiếu
                </button>
                <button style={{ color: "black" }} >
                    Bảo
                </button>

            </div>
            <div className="filter-category">
                <h3>NƠI BÁN</h3>

                <button style={{ color: "black" }} >
                    Hiếu
                </button>
                <button style={{ color: "black" }} >
                    Bảo
                </button>

            </div>
            <div className="filter-category">
                <h3>THƯƠNG HIỆU</h3>

                <button style={{ color: "black" }} >
                    Hiếu
                </button>
                <button style={{ color: "black" }} >
                    Bảo
                </button>

            </div>
            <div className="filter-category">
            
            <h3>GIÁ</h3>
            <div className="pricemaxmin"> 
             <input className="price-input"
        type="text"
        placeholder="Từ"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <span>-</span>

      <input className="price-input"
        type="text"
        placeholder="Đến"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      </div>
      <button style={{ color: "black" }} onClick={handleFilterClick}>
     ÁP DỤNG
      </button>
    </div>
    <div className="filter-category">
                <h3>LOẠI SHOP</h3>

                <button style={{ color: "black" }} >
                    Hiếu
                </button>
                <button style={{ color: "black" }} >
                    Bảo
                </button>

            </div>
            <div className="filter-clear">
                <button className="btn" >
                    Xóa tất cả
                </button>
            </div>
        </div>
    );
};

export default MenuSearch;
