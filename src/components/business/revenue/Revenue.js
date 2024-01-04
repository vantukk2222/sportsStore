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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
    const [startDate, setStartDate] = useState(new Date('2023-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-01-01'));

    const fetchData = async (start, end) => {
        const user = JSON.parse(localStorage.getItem('User'));

        try {
            const responseRevenue = await revenueAdmin(1, user?.id, start, end);
            setRevenueData(responseRevenue);
           
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        const startFormatted = startDate.toISOString().split('T')[0];
        const endFormatted = endDate.toISOString().split('T')[0];
        fetchData(startFormatted, endFormatted);
    }, [startDate, endDate]);

    useEffect(() => {
        const months = revenueData?.setStatistic?.map((item) => {
            const data = `${item.month}/${item.year}`;
            return data;
        });

        const dataValues = revenueData?.setStatistic?.map((item) => item.bill_total);
        const dataBil = revenueData?.setStatistic?.map((item) => item.bill_count);

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

   

    return (
        <div className="chart-container">
            <div className="date-pickers">
                <div>
                    <label>Ngày bắt đầu: </label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div>
                    <label>Ngày kết thúc: </label>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>
            </div>
            <h2 className="chart-title">Biểu đồ Doanh thu của cửa hàng theo tháng</h2>
            <div className="chart-table">
                <Line
                    data={data}
                    options={{
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Tháng', // X-axis label
                                },
                                tooltips: {
                                    callbacks: {
                                        label: (context) => {
                                            const label = context.dataset.label || '';
                                            if (label) {
                                                return `${label}: ${context.parsed.x}`;
                                            }
                                            return '';
                                        },
                                    },
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Giá trị (VNĐ)', // Y-axis label
                                },
                                tooltips: {
                                    callbacks: {
                                        label: (context) => {
                                            return `Giá trị: ${context.parsed.y} VNĐ`;
                                        },
                                    },
                                },
                            },
                        },
                    }}
                />
                <h2 className="chart-title">Biểu đồ tổng số đơn bán được theo tháng</h2>
                <Line
                    data={dataBar}
                    options={{
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Tháng', // X-axis label
                                },
                                tooltips: {
                                    callbacks: {
                                        label: (context) => {
                                            const label = context.dataset.label || '';
                                            if (label) {
                                                return `${label}: ${context.parsed.x}`;
                                            }
                                            return '';
                                        },
                                    },
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Số đơn', // Y-axis label
                                },
                                tooltips: {
                                    callbacks: {
                                        label: (context) => {
                                            return `Số đơn: ${context.parsed.y}`;
                                        },
                                    },
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default RevenueAndOrdersChart;
