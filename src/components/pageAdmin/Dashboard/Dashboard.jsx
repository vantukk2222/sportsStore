import { useState } from 'react';
import BestSellingProductsComponent from './BestSellingProductsComponent ';
import ChartComponent from './ChartComponent';
import TableComponent from './TableComponent ';
import VisitComponent from './VisitComponent';
const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="dashboard-container">
            <h1 className="h1-dashboard">DASHBOARD</h1>
            <div className="search-container">
                <input type="text" placeholder="Tìm kiếm..." value={searchQuery} onChange={handleSearchChange} />
            </div>

            <div className="dashboard-content">
                <div className="widget">
                    <h2>KHÁCH HÀNG</h2>
                </div>

                <div className="widget">
                    <h2>LƯỢT XEM</h2>
                </div>

                <div className="widget">
                    <h2>SẢN PHẨM</h2>
                </div>
                <div className="widget">
                    <h2>TOTAL SALES</h2>
                </div>
            </div>
            <div className="mainDashboard">
                <ChartComponent />
                <BestSellingProductsComponent />
                <TableComponent />
                <VisitComponent />
            </div>
        </div>
    );
};

export default Dashboard;
