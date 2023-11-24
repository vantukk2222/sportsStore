import React, { useState, useEffect } from "react";
import "./catg.css";

const Catg = ({ shopItems, apiCate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [filteredPrices, setFilteredPrices] = useState([]);
    const [rangeValues, setRangeValues] = useState([0, 0]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [uniqueBrands, setUniqueBrands] = useState([]);

    useEffect(() => {
        const uniquePrices = Array.from(new Set(shopItems.map((item) => item.price)));
        setMinPrice(Math.min(...uniquePrices));
        setMaxPrice(Math.max(...uniquePrices));
        setRangeValues([minPrice, maxPrice]);
        setFilteredPrices(uniquePrices);

        // Lấy các giá trị thương hiệu duy nhất
        const uniqueBrands = Array.from(new Set(shopItems.map((item) => item.brand)));
        setUniqueBrands(uniqueBrands);
    }, [shopItems, minPrice, maxPrice]);

    const handlePriceChange = (e) => {
        const [newMinPrice, newMaxPrice] = e.target.value.split(",").map(Number);
        setRangeValues([newMinPrice, newMaxPrice]);
    };

    const handleApplyFilter = () => {
        const filtered = shopItems.filter(
            (item) => item.price >= rangeValues[0] && item.price <= rangeValues[1]
        );

        const uniqueFilteredPrices = Array.from(new Set(filtered.map((item) => item.price)));
        setFilteredPrices(uniqueFilteredPrices);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        // Gọi logic khi chọn phân loại ở đây hoặc truyền phân loại đã chọn đến một component cha
    };

    const handleBrandClick = (brand) => {
        // Xử lý logic khi click vào thương hiệu ở đây
    };
    const handleCategoryClick = (category) => {
        // Handle category click logic here
    };


    const clearFilters = () => {
        setSearchQuery('');
        setRangeValues([minPrice, maxPrice]);
        setSelectedCategory('');
        // Logic bổ sung cho việc xóa bộ lọc khác
    };

    return (
        <div className='category'>
            <div className="filter-search">
                <h3>DANH MỤC</h3>
            </div>

            {/* <div className="filter-category">
                <h3>Phân Loại</h3>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">-- Chọn phân loại --</option>
                    {apiCate.map((eachItem, index) => (
                        { eachItem.name }
                    ))}
                </select>
            </div> */}
            <div className="filter-category">
                <h3>SẢN PHẨM</h3>
                {apiCate.map((eachItem, index) => (
                    <button key={index} style={{ color: "black" }} onCl={() => handleCategoryClick(eachItem.name)}>
                        {eachItem.name}
                    </button>
                ))}
            </div>

            {/* <div className="filter-brand">
                <h3>Thương hiệu</h3>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">-- Chọn thương hiệu --</option>
                    {uniqueBrands.map((brand, index) => (
                        <option key={index} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
            </div> */}

            {/* <div className="filter-price">
                <h3>Giá</h3>
                <p>
                    <input
                        type="range"
                        name="price"
                        min={minPrice}
                        max={maxPrice}
                        step={1}
                        value={`${rangeValues[0]},${rangeValues[1]}`}
                        onChange={handlePriceChange}
                        onMouseUp={handleApplyFilter}
                    />
                    <br />
                    <span>
                        {rangeValues[0]} - {rangeValues[1]}
                    </span>
                </p>
                <div>
                    {filteredPrices.map((price, index) => (
                        <button key={index} style={{ color: "black" }}>
                            {price}
                        </button>
                    ))}
                </div>
            </div> */}

            <div className="filter-clear">
                <button className="btn" onClick={clearFilters}>
                    Xóa bộ lọc
                </button>
            </div>
        </div>
    );
};

export default Catg;
