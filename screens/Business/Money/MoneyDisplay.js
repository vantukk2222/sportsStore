import React, { useDebugValue, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { formatMoneyVND } from '../../../utilies/validation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getInforBusinessByID } from '../../../redux/reducers/Business/getBusinessByID';
import { colors } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { toastError } from '../../../components/toastCustom';

const MoneyDisplay = ({ inforUser }, props) => {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [revenue, setRevenue] = useState(0);
    const { businessInfor, isLoading } = useSelector((state) => state.getBusinessByIDReducer)
    // const {
    //     initialState,
    //     getInforBusinessByID
    // } = props
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        //console.log(inforUser.id);
        if (inforUser) {
            dispatch(getInforBusinessByID(inforUser.id))
        }
    }, [inforUser, refresh])
    useEffect(() => {
        // console.log(businessInfor[inforUser.id]?.revenue);
        if (businessInfor[inforUser?.id]?.revenue !== null) {
            setRevenue(businessInfor[inforUser?.id]?.revenue)
        }
    }, [businessInfor])
    return (
        <View>
            <View style={styles.container}>
                <Icon
                    // style={styles.productImage}
                    name={'credit-card'}
                    size={30}
                    color={'black'} />
                <View>
                    {isLoading === true ? <ActivityIndicator size="small" color={colors.success} style={{ padding: 2, alignItems: 'center' }} /> :
                        <Text style={styles.amount}>{formatMoneyVND(revenue)}</Text>}
                    <TouchableOpacity
                        onPress={() => {
                            setRefresh(refresh === true ? false : true)
                        }}>
                        <Icon
                            // style={styles.productImage}
                            name={'retweet'}
                            size={20}
                            color={'black'}
                        />
                    </TouchableOpacity>
                </View>


            </View>
            <View style={styles.infoContainer}>

                <TouchableOpacity style={styles.infoItem}
                    onPress={() => {
                        inforUser?.id ? navigation.navigate('setInforBusiness', { businessInfor: businessInfor[inforUser.id] }) : toastError("Bạn chưa đăng nhập", "Xin vui lòng đăng nhập")
                    }}>
                    <Text style={styles.infoText}>Chỉnh sửa thông tin cá nhân</Text>
                    <Icon
                        name="chevron-circle-right"
                        size={24}
                        color={colors.denNhe}
                        style={{ position: 'absolute', right: 0, bottom: 0, marginBottom: 10 }}
                    />
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between'
    },
    currencySymbol: {
        fontSize: 18,
        marginRight: 5,
        color: 'black'
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E8A930',
        alignItems: 'flex-end'
    },
    infoContainer: {
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        marginTop: 6,
        paddingTop: 20,

    },
    infoItem: {
        paddingTop: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: 'row'
    },
    infoText: {
        fontSize: 16,
        color: 'black'
    },
});
const mapStateToProps = (state) => ({
    initialState: state.getBusinessByIDReducer,
})

const mapDispatchToProps = {

}
export default connect(mapStateToProps, { ...mapDispatchToProps })(MoneyDisplay);
