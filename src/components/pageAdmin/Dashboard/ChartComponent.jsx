// SinChartComponent.js
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const ChartComponent = () => {
    // Tạo dữ liệu cho hàm sin
    const data = [];
    for (let i = 0; i <= 360; i += 10) {
        data.push({ angle: i, sinValue: Math.sin((i * Math.PI) / 180) });
    }

    return (
        <div className="sin-chart-container">
            <h2 className="chart-title">Sine Wave Chart</h2>
            <LineChart width={750} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="angle"
                    label={{ value: 'Angle (degrees)', position: 'insideBottom', offset: -5, fill: '#666' }}
                />
                <YAxis label={{ value: 'Sin Value', angle: -90, position: 'insideLeft', offset: -10, fill: '#666' }} />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="sinValue"
                    stroke="#4CAF50"
                    strokeWidth={2}
                    dot={{ fill: '#4CAF50', r: 5 }}
                />
            </LineChart>
        </div>
    );
};

export default ChartComponent;
