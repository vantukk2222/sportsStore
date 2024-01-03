import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const RevenueAndOrdersChart = () => {
    const revenueData = [
        { date: '2022-01', revenue: 100 },
        { date: '2022-02', revenue: 150 },
        { date: '2022-03', revenue: 120 },
    ];

    const ordersData = [
        { date: '2022-01', orders: 5 },
        { date: '2022-02', orders: 8 },
        { date: '2022-03', orders: 6 },
    ];

    return (
        <div className="chart-container">
            <h2 className="chart-title">Biểu đồ Doanh thu theo tháng</h2>
            <LineChart
                width={1000}
                height={350}
                data={revenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleString('default', { month: 'short' })}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#41A0FF" activeDot={{ r: 8 }} />
            </LineChart>

            <h2 className="chart-title">Biểu đồ Đơn hàng</h2>
            <BarChart width={1000} height={350} data={ordersData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleString('default', { month: 'short' })}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#55D8FE" />
            </BarChart>
        </div>
    );
};

export default RevenueAndOrdersChart;
