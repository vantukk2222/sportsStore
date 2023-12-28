import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLOURS } from "../Home/Database";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopInfo from "../Business/ShopInfo";
import { formatMoneyVND } from "../../utilies/validation";
import UIButton from "../../components/UIButton";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useDebugValue, useEffect } from "react";
import { getInforBusinessByID } from "../../redux/reducers/Business/getBusinessByID";
import HeaderComp from "../../components/Header";
import { ScrollView } from "react-native-gesture-handler";

const DetailOrderScreen = ({ route }) => {
    const { orderByState, businessInfor } = route.params
    const { data, loading, error } = useSelector((state) => state.userData)

    return (
        <View style={{
            height: "100%",
            backgroundColor: '#EFEFEF',
        }}>
            <HeaderComp init="Thông tin đơn hàng"></HeaderComp>
            <ScrollView nestedScrollEnabled={true} >
                <View
                    style={{
                        height: 40,
                        backgroundColor: '#0084FF',
                        justifyContent: 'center',
                        alignContent: 'center',
                        borderWidth: 2,
                        borderEndColor: '#0084FF',
                        borderTopColor: '#0084FF',
                        borderLeftColor: '#0084FF',
                        borderBottomColor: '#D0DBE4',
                    }}>
                    <Text style={{ color: 'white', fontSize: 16, paddingLeft: 15 }}> Đơn đã hoàn thành</Text>
                </View>
                <View
                    onPress={() => {
                        console.log("data", orderByState?.bill_detailSet[0])
                    }}
                    style={{
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignContent: 'center',
                        borderWidth: 2,
                        borderEndColor: 'white',
                        borderTopColor: 'white',
                        borderLeftColor: 'white',
                        borderBottomColor: '#D0DBE4',
                    }}>
                    <Text style={{ fontWeight: '800', color: 'gray', fontSize: 16, paddingLeft: 10 }}>Địa chỉ nhận hàng</Text>
                    <Text style={{ color: 'gray', fontSize: 14, paddingLeft: 20, letterSpacing: 1 }}>{data?.phone}</Text>
                    <Text numberOfLines={3} style={{ color: 'gray', fontSize: 14, paddingLeft: 20, width: '60%', letterSpacing: 1 }}>{data?.address}</Text>
                </View>
                <View>

                    {orderByState ? orderByState?.bill_detailSet?.map((eachproductItem, eachindex) => {
                        return (
                            <View>
                                <ShopInfo inCart={true} business={businessInfor[orderByState?.id_business]}></ShopInfo>
                                <TouchableOpacity
                                    onPress={() => {
                                        // navagation.navgate("DetailProduct")
                                    }}
                                    style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                                    <View
                                        style={{
                                            width: '30%',
                                            height: 100,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 10,
                                            marginRight: 22,
                                            marginLeft: 5,
                                        }}>
                                        <Image
                                            source={{ uri: eachproductItem?.product?.image_product_information }}
                                            style={{
                                                width: '90%',
                                                height: '90%',
                                                resizeMode: 'contain',

                                            }}
                                        />
                                    </View>

                                    <View

                                        style={{
                                            flex: 1,
                                            // height: '100%',
                                            justifyContent: 'space-around',
                                        }}>
                                        <View style={{}}>
                                            <Text
                                                numberOfLines={2}
                                                style={{
                                                    fontSize: 14,
                                                    maxWidth: '100%',
                                                    color: COLOURS.black,
                                                    fontWeight: '600',
                                                    letterSpacing: 1,
                                                    paddingEnd: 3

                                                }}>

                                                {eachproductItem?.product?.name_product_information}
                                            </Text>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between', // Đây là phần cập nhật
                                                    opacity: 0.6,
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'black',
                                                        fontSize: 15,
                                                        fontWeight: '400',
                                                        maxWidth: '85%',
                                                        paddingLeft: 0,
                                                        color: 'gray',
                                                    }}>
                                                    {eachproductItem?.product?.size}
                                                </Text>
                                                <Text style={{ fontSize: 16, color: 'red', marginRight: 15, alignItems: 'flex-end' }}>
                                                    {"x" + (eachproductItem?.quantity)}
                                                </Text>
                                            </View>
                                            {eachproductItem?.product?.sale ? <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between', // Đây là phần cập nhật
                                                opacity: 0.6,
                                            }}>
                                                <Text></Text>
                                                <Text style={{
                                                    textDecorationLine: 'line-through',

                                                    fontSize: 16, color: 'gray', marginLeft: 45, alignItems: 'flex-end'
                                                }}>
                                                    {formatMoneyVND(eachproductItem?.product?.price)}
                                                </Text>
                                                <Text style={{ fontSize: 16, color: 'red', marginRight: 15, alignItems: 'flex-end' }}>
                                                    {formatMoneyVND(eachproductItem?.product?.price * (1 - eachproductItem?.product?.sale?.discount / 100))}
                                                </Text>
                                            </View> : <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between', // Đây là phần cập nhật
                                                opacity: 0.6,
                                            }}>
                                                <Text></Text>

                                                <Text style={{ fontSize: 16, color: 'red', marginRight: 15, alignItems: 'flex-end' }}>
                                                    {formatMoneyVND(eachproductItem?.product?.price)}
                                                </Text>
                                            </View>}

                                        </View>

                                    </View>
                                </TouchableOpacity>

                            </View>

                        )
                    })
                        : <Text style={{ alignContent: 'center' }}> Có lỗi rồi nè</Text>}
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderTopColor: '#F0F0F0',
                        borderBottomColor: '#F0F0F0',
                        borderLeftColor: 'white',
                        borderRightColor: 'white',
                        borderWidth: 2,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'space-between', 
                    }}>
                        <Text style={{ paddingLeft: 40, color: 'black' }}>Thành tiền</Text>
                        <Text style={{ fontSize: 16, color: 'red', marginRight: 15, alignItems: 'flex-end' }}>
                            {formatMoneyVND(orderByState?.total)}
                        </Text>
                    </View>
                    <View style={{
                        paddingTop: 5,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderTopColor: '#F0F0F0',
                        borderBottomColor: '#F0F0F0',
                        borderLeftColor: 'white',
                        borderRightColor: 'white',
                        borderWidth: 2,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>

                        <Text style={{ color: 'black' }}>Phương thức thanh toán</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                // width: '80%',
                                alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    color: COLOURS.blue,
                                    backgroundColor: COLOURS.backgroundLight,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 12,
                                    borderRadius: 10,
                                    marginRight: 18,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 10,
                                        fontWeight: '900',
                                        color: 'red',
                                        letterSpacing: 1,
                                    }}>
                                    MOMO
                                    ****-0497
                                </Text>
                            </View>

                        </View>
                    </View>
                    <View style={{
                        paddingTop: 5,
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        borderTopColor: '#F0F0F0',
                        borderBottomColor: '#F0F0F0',
                        borderLeftColor: 'white',
                        borderRightColor: 'white',
                        borderWidth: 2,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 1,
                            paddingHorizontal: 20,
                        }}>
                            <Text style={{ color: 'black' }}>Mã đơn hàng</Text>
                            <Text style={{ fontSize: 16, color: 'black' }}>
                                {orderByState?.name}
                            </Text>
                        </View>
                        <View style={{
                            marginTop: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 1,
                            paddingHorizontal: 20,
                        }}>
                            <Text style={{ color: 'black' }}>Thời gian đặt hàng</Text>
                            <Text style={{ fontSize: 16, color: 'black' }}>
                                {moment(orderByState?.created_at).format('DD/MM/YYYY-HH:mm:ss')}
                            </Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}
export default DetailOrderScreen;