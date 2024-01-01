// VisitComponent.js
import React from 'react';

const VisitComponent = () => {
  // Giả sử bạn có dữ liệu về lượt xem, có thể lấy từ API hoặc một nguồn dữ liệu khác
  const visitData = [
    { date: '2023-01-01', visits: 100 },
    { date: '2023-01-02', visits: 150 },
    { date: '2023-01-03', visits: 120 },
    // Thêm dữ liệu khác nếu cần
  ];

  return (
    <div className="visit-container">
      <h2>Visit Page</h2>
      <ul>
        {visitData.map(item => (
          <li key={item.date}>
            <span className="visit-date">{item.date}</span>
            <span className="visit-count">{item.visits} visits</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VisitComponent;
