import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import SalesChart from './SalesChart';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchStatistic, resetStatistic } from '../../../redux/reducers/Statistic/getStatistic';
import Loading from '../../../components/loading';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../../constants';
const StatisticScreen = (props) => {
    const navigation = useNavigation()
    const [startDate, setStartDate] = useState('2023-06-01')
    const [endDate, setEndDate] = useState('2023-12-31')

    const [isCheck, setisCheck] = useState(false)
    const dispatch = useDispatch()
    const [selectMonth, setSelectMonth] = useState('7-12')
    const [selectYear, setSelectYear] = useState('2023')
    const { data, loading, error } = useSelector((state) => state.userData)
    const {
        fetchStatistic,
        getStatisticState
    } = props
    const [statis, setStatis] = useState()
    useEffect(() => {
        if (data && endDate && startDate && !isCheck) {
            // console.log('id business', data.id);
            //setisCheck(true)
            fetchStatistic(data.id, 1, startDate, endDate)

        }
        return () => {
            dispatch(resetStatistic())
        }

    }, [data, startDate, endDate, isCheck])
    useEffect(() => {
        if (getStatisticState?.dataGetStatisticState?.setStatistic) {
            console.log(getStatisticState?.dataGetStatisticState?.setStatistic);
            setStatis(getStatisticState?.dataGetStatisticState)
        }
    }, [getStatisticState?.dataGetStatisticState])
    useEffect(() => {
        if (selectMonth && selectYear) {
            console.log(selectMonth, selectYear);

        }

    }, [selectMonth, selectYear])
    const handleSearch = () => {
        if (selectMonth && selectYear) {
            if (selectMonth === '7-12') {
                setStartDate(`${selectYear}-07-01`)
                setEndDate(`${selectYear}-12-31`)
            }
            else {
                setStartDate(`${selectYear}-01-01`)
                setEndDate(`${selectYear}-06-30`)
            }
            // setSelectMonth()
            //setSelectYear()
        }
    }
    if (getStatisticState?.loadingGetStatisticState) {
        return <View style={{ flex: 1, backgroundColor: '#20367F' }}>
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>

        </View >
    }

    const year = ['2022', '2023', '2024', '2025']
    const month = ['1-6', '7-12']
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#6A99B8' }}>

            <View style={{ backgroundColor: '#30468F' }}>
                <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: '600', color: 'white', marginBottom: 10, marginTop: 5, marginHorizontal: 20 }}>
                    Thống kê
                </Text>
            </View>

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, }}>
                    <Text style={{ textAlign: 'left', fontSize: 18, fontWeight: '300', color: 'white', marginHorizontal: 5, marginTop: 15 }}>
                        Tháng
                    </Text>
                    <SelectList
                        setSelected={(val) => {
                            setSelectMonth(val)
                            //  setSelectedCParent(val)
                            //addToArrIfNotExists(selectedCategories, val)

                        }}
                        data={month}
                        placeholder={selectMonth ? selectMonth : month[1]}
                        dropdownTextStyles={{ color: 'white' }}
                        inputStyles={{ color: 'white' }}
                        boxStyles={{ marginLeft: 5, marginTop: 5, alignItems: 'flex-end' }}
                    />
                    <Text style={{ textAlign: 'left', marginLeft: 5, fontSize: 18, fontWeight: '300', color: 'white', marginHorizontal: 5, marginTop: 15 }}>
                        /
                    </Text>
                    <SelectList
                        setSelected={(val) => {
                            setSelectYear(val)
                            //  setSelectedCParent(val)
                            //addToArrIfNotExists(selectedCategories, val)

                        }}
                        data={year}
                        placeholder={selectYear ? selectYear : year[1]}
                        dropdownTextStyles={{ color: 'white' }}
                        inputStyles={{ color: 'white' }}
                        boxStyles={{ marginVertical: 5, marginLeft: 5, alignItems: 'flex-end' }}
                    />
                    <TouchableOpacity style={{ padding: 5, marginLeft: 20 }}
                        onPress={() => handleSearch()}>
                        <Icon style={styles.productImage}
                            name={'search'}
                            size={30}
                            color={'white'} />
                    </TouchableOpacity>

                </View>

                {statis &&
                    <SalesChart statis={statis} />
                }

            </View>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: 50,
        height: 40,
        //   resizeMode: 'cover',
        marginTop: 8,
        borderRadius: 4,
        flex: 1

    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#E3E3E3', // Độ trong suốt của màu đen
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = (state) => ({
    getStatisticState: state.getStatistic
})
const mapDispatchToProps = {
    fetchStatistic
}
export default connect(mapStateToProps, { ...mapDispatchToProps })(StatisticScreen);