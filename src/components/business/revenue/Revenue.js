import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import revenueAdmin from '~/API/Admin/revenueAdmin';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const RevenueAndOrdersChart = () => {
    const [revenueData, setRevenueData] = useState([]);
    const [data, setData] = useState({
        labels: ['0'],
        datasets: [
            {
                label: 'First dataset',
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                data: [0],
            },
        ],
    });
    const [dataBar, serDataBar] = useState({
        labels: ['0'],
        datasets: [
            {
                data: [0],
            },
        ],
    });
    useEffect(() => {
        const start = '2023-01-01';
        const end = '2024-12-01';
        const user = JSON.parse(localStorage.getItem('User'));

        const fetchData = async () => {
            try {
                const responseRevenue = await revenueAdmin(1, user?.id, start, end);
                setRevenueData(responseRevenue);
                console.log(responseRevenue);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const months = revenueData?.setStatistic?.map((item) => item.month.toString());
        const dataValues = revenueData?.setStatistic?.map((item) => item.bill_total);
        const dataBil = revenueData?.setStatistic?.map((item) => item.bill_count);
        console.log(months, data, dataBar);
        setData({
            labels: months,
            datasets: [
                {
                    fill: true,
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                    data: dataValues,
                    label: 'Tổng tiền',
                },
            ],
        });
        serDataBar({
            labels: months,
            datasets: [
                {
                    data: dataBil,
                    fill: true,
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: '#742774',
                    label: 'Tổng đơn',
                },
            ],
        });
    }, [revenueData]);

    console.log(data, dataBar);
    return (
        <div className="chart-container">
            <h2 className="chart-title">Biểu đồ Giá tiền thu được</h2>

            <div className="chart-table">
                <Line data={data} />
                <h2 className="chart-title">Biểu đồ tổng số đơn bán được</h2>

                <Line data={dataBar} />
            </div>
        </div>
    );
};

export default RevenueAndOrdersChart;
