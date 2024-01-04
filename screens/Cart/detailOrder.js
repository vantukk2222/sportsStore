import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { COLOURS } from "../Home/Database";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopInfo from "../Business/ShopInfo";
import { formatMoneyVND } from "../../utilies/validation";
import UIButton from "../../components/UIButton";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useDebugValue, useEffect, useState } from "react";
import { getInforBusinessByID } from "../../redux/reducers/Business/getBusinessByID";
import HeaderComp from "../../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import { cancelBillByID } from "../../redux/reducers/Bill/billCancelReducer";
import { listCartByIdUser } from "../../redux/reducers/Cart/listCartReducer";
import { toastError, toastsuccess } from "../../components/toastCustom";
import { useNavigation } from "@react-navigation/native";
import { fetchProductbyId } from "../../redux/reducers/productReducer/getDetailProduct";

const DetailOrderScreen = ({ route }) => {
    const { orderByState, businessInfor, list_id, total } = route.params
    const { data, loading, error } = useSelector((state) => state.userData)
    // const [total, setTotal] = useState(0)
  const { data: dataDetail, loading: loadingDetail, error: errorDetail } = useSelector((state) => state.productDetail)
    
    console.log("list ID",list_id);
    const dispatch = useDispatch()
    const navigation = useNavigation()
    useEffect(() => {
        const totalAllBill = () => {
            orderByState?.bill_detailSet?.map((eachBill) => {
                dispatch(fetchProductbyId(eachBill?.product?.id_product_information))
            })
        }
        totalAllBill()
    }, [])
    // console.log("Re-render detail");
    const getTextTitle = () => {
        if (orderByState?.state === 0) {
            return "Đơn hàng đang được giao."
        }
        if (orderByState?.state === 1) {
            return "Đơn hàng đã hoàn thành."
        }
        if (orderByState?.state === 2) {
            return "Đơn hàng đang chờ bạn thanh toán."
        }
        if (orderByState?.state === 3) {
            return "Đơn hàng chờ SHOP xác nhận."
        }
        if (orderByState?.state === 4) {
            return "Đơn hàng đã bị huỷ."
        }
    }
    const cancelBillAgain = (transcationID)=>{
        dispatch(cancelBillByID(transcationID, "cancel")).then((status) => {
            if (status === 200 || status === 201 || status === 202 || status === 203 || status === 204) {
                toastsuccess("Cảm ơn", "Quý khách đã huỷ đơn thành công.")
                setIndex(0)
                setStateOrder(0)
                navigation.goBack()
            }
            else {
                toastError("Xin lỗi", status)
            }
        })
    }
    const checkOut = async (link) => {

        try {
            await Linking.openURL(link).then(() => {
                dispatch(getAllBillByIDUser(data?.id))
                navigation.goBack()
                toastsuccess("Thành công", "Thanh toán thành công");
            })
        } catch (error) {
            toastError("Xin lỗi", "Đã có lỗi xảy ra với máy chủ");
            return error;
        }
    };
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
                    <Text style={{ color: 'white', fontSize: 16, paddingLeft: 15 }}>{getTextTitle()}</Text>
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
                    {list_id?.map((eachID, index_eachID) => (
                        <View key={index_eachID}>
                            <ShopInfo inCart={true} business={businessInfor[eachID]}></ShopInfo>
                            {orderByState ? orderByState?.bill_detailSet?.map((eachproductItem, eachindex) => {
                               console.log("eachProductItem detailOrder:", eachproductItem);
                               if (eachproductItem?.product?.id_business === eachID) {
                                    return (
                                        <View key={eachindex}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate("DetailProduct", {item: dataDetail[eachproductItem?.product?.id_product_information]})
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
                                                                {formatMoneyVND(eachproductItem?.product?.price * eachproductItem?.quantity)}
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
                                }
                            })
                                : <Text style={{ alignContent: 'center' }}> Có lỗi rồi nè</Text>}

                        </View>

                    ))}


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
                            {formatMoneyVND(total)}
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


                <View
                    style={{
                        // height: '8%',
                        margin: 10,
                        width: '100%',
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        justifyContent: 'center'
                    }}>
                    {orderByState?.state === 2 || orderByState?.state === 3 ? <TouchableOpacity
                        onPress={() => {
                            // console.log(orderByState?.bill_detailSet[0].product);
                            
                            cancelBillAgain(transcationID)
                        }}
                        style={{
                            paddingHorizontal: 10,
                            marginHorizontal: 10,
                            height: 50,
                            backgroundColor: "red",
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            numberOfLines={2}
                            style={{
                                textAlign: 'center',
                                // height:60,
                                width: 112,
                                fontSize: 14,
                                letterSpacing: 1,
                                color: COLOURS.white,
                                textTransform: 'uppercase',
                            }}>
                            Huỷ đơn
                        </Text>
                    </TouchableOpacity> : null}
                    {orderByState?.state === 2 && <TouchableOpacity
                        onPress={() => {
                            checkOut(orderByState?.transaction?.pay_url)
                        }}
                        style={{
                            paddingHorizontal: 10,
                            marginHorizontal: 10,
                            height: 50,
                            backgroundColor: "#0084FF",
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            numberOfLines={2}
                            style={{
                                textAlign: 'center',
                                // height:60,
                                width: 112,
                                fontSize: 14,
                                letterSpacing: 1,
                                color: COLOURS.white,
                                textTransform: 'uppercase',
                            }}>
                            Thanh toán ngay
                        </Text>
                    </TouchableOpacity>}
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailOrderScreen;