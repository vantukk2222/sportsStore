// BestSellingProductsComponent.js
import React from 'react';

const BestSellingProductsComponent = () => {
  // Giả sử bạn có dữ liệu về sản phẩm bán chạy nhất, có thể lấy từ API hoặc một nguồn dữ liệu khác
  const bestSellingProducts = [
    { id: 1, name: 'Product 1', sales: 100 },
    { id: 2, name: 'Product 2', sales: 150 },
    { id: 3, name: 'Product 3', sales: 120 },
    // Thêm dữ liệu khác nếu cần
  ];

  return (
    <div className="best-selling-products-container">
      <h2 >Best Selling Products</h2>
      <ul>
        {bestSellingProducts.map(item => (
          <li key={item.id}>
            <span className="product-name">{item.name}</span>
            <span className="product-sales">{item.sales} sales</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BestSellingProductsComponent;
