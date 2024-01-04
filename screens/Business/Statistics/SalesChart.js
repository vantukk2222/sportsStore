import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit';
import { colors } from '../../../constants';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchStatistic, resetStatistic } from '../../../redux/reducers/Statistic/getStatistic';
import { useRoute } from '@react-navigation/native';
import Loading from '../../../components/loading';
import { formatMoneyVND } from '../../../utilies/validation';

const SalesChart = (props) => {
    const route = useRoute();
    const [data, setData] = useState({
        labels: ['0'],
        datasets: [
            {
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

    const { statis } = props;

    useEffect(() => {
        if (statis) {
            // console.log('statis', statis);

            const months = statis?.setStatistic?.map(item => item.month.toString());
            const dataValues = statis?.setStatistic?.map(item => item.bill_total / 1000);
            const dataBil = statis?.setStatistic?.map(item => item.bill_count)
            setData({
                labels: months,
                datasets: [
                    {
                        data: dataValues,
                    },
                ],
            });
            serDataBar({
                labels: months,
                datasets: [
                    {
                        data: dataBil,
                    },
                ],
            })
        }
    }, [statis]);
    // console.log('data', data.datasets);
    return (
        <View style={{
            flex: 1, paddingTop: 10, backgroundColor: '#6A99B8', marginBottom: 30//colors.xam
        }}>

            <View style={{ paddingHorizontal: 5 }}>
                {statis && (
                    <>
                        {/* <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: '300', color: 'white', paddingLeft: 20 }}>
                            Doanh số bán hàng
                        </Text> */}

                        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: '500', color: '#FE7F5E', marginLeft: 20, paddingVertical: 5 }}>
                            Tổng doanh thu:
                            <> </>
                            <Text style={{ color: 'white', fontSize: 17 }}>
                                {formatMoneyVND(statis?.bill_total_all)}
                            </Text>
                            <> </>
                        </Text>
                        <LineChart
                            data={data}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#20367F",
                                backgroundGradientFrom: "#0C5F9A", //"#fb8c00",
                                backgroundGradientTo: "#112942", //"#4E8C43",//"#ffa726",
                                decimalPlaces: 1, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(20, 255, 146, ${opacity})`,
                                //color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(87,191,45, ${opacity})`, //`rgba(255, 255, 255, ${opacity})`,rgb(253,77,116)
                                strokeWidth: 4,
                                barPercentage: 0.1,
                                style: {
                                    borderRadius: 10,
                                    marginLeft: 5
                                },
                                propsForDots: {
                                    r: "5",
                                    strokeWidth: "2",
                                    stroke: "green"// "#ffa726"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 0,
                                paddingTop: 20,
                                marginTop: 5,
                                marginLeft: 2,
                                marginRight: 2,
                                borderRadius: 10,
                            }}
                        />
                        {/* <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: '300', color: 'white', paddingLeft: 20, marginTop: 20 }}>
                            Số đơn hàng
                        </Text> */}
                        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: '500', color: '#FE7F5E', marginLeft: 20, paddingVertical: 10 }}>
                            Tổng đơn hàng :
                            <> </>
                            <Text style={{ color: 'white', fontSize: 17 }}>
                                {statis?.bill_count_all}
                            </Text>
                            <> </>
                            <Text style={{ color: 'white', fontSize: 17 }}>Đơn</Text>
                        </Text>
                        <BarChart
                            data={dataBar}
                            width={Dimensions.get("window").width}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1}
                            // barPercentage
                            chartConfig={{
                                backgroundColor: "#20367F",
                                backgroundGradientFrom: "#3C5196",
                                backgroundGradientTo: "#0C5F9A",
                                decimalPlaces: 1,
                                barPercentage: 0.5,
                                fontSize: 5,
                                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,//rgb(254,127,94)
                                labelColor: (opacity = 1) => `rgba(87,191,45, ${opacity})`,//rgb(240,211,124)/rgb(87,191,45)
                                strokeWidth: 4,
                                //barPercentage: 0.1,
                                style: {
                                    borderRadius: 10,
                                    marginLeft: 5
                                },
                                propsForDots: {
                                    r: "5",
                                    strokeWidth: "1",
                                    stroke: 'red'//"#ffa726"
                                }
                            }}
                            style={{
                                //  marginVertical: 8,
                                paddingTop: 20,
                                marginLeft: 2,
                                marginRight: 2,
                                borderRadius: 10,
                            }}
                        />
                    </>)

                }
            </View>

        </View>
    );
};

export default SalesChart;
