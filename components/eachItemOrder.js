import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { COLOURS } from "../screens/Home/Database";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopInfo from "../screens/Business/ShopInfo";
import { formatMoneyVND } from "../utilies/validation";
import UIButton from "./UIButton";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useDebugValue, useEffect } from "react";
import { getInforBusinessByID } from "../redux/reducers/Business/getBusinessByID";

const EachItemOrderComp = ({ item }) => {
    // const data = item
    const {businessInfor, isLoading, error} = useSelector((state)=> state.getBusinessByIDReducer)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getInforBusinessByID(item?.id_business))
    },[item?.id_business])
    const setOrderState = (state) => {
        
        const currentDate = new Date();
        const pastDate = new Date(item?.created_at);
        const differenceInTime = currentDate - pastDate;
        const futureDate = moment(pastDate).add(30, 'days').format('DD/MM/YYYY');

        // Chuyển đổi milliseconds sang số ngày
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        // Kiểm tra nếu sự khác biệt lớn hơn 30 ngày

        if (state === 0) {
            if (differenceInDays > 7 && differenceInDays < 10) {
                return "Đã nhận được hàng"
            }
            if (differenceInDays > 10 && differenceInDays < 30) {
                return "Đánh giá"
            }
            if (differenceInDays > 30) {
                return "Mua lại"
            }
            return "Đang giao"
        }
        if (state === 1) {
            if (differenceInDays > 30) {
                return "Mua lại"
            }
            return "Đánh giá"
        }
        if (state === 2) {
            return "Huỷ đơn"
        }
        if (state === 3) {
            return "Huỷ đơn"
        }
        if (state === 4) { return "Mua lại" }

    }
    const setOrderText = (state) => {
        
        const currentDate = new Date();
        const pastDate = new Date(item?.created_at);
        const differenceInTime = currentDate - pastDate;
        const futureDate = moment(pastDate).add(30, 'days').format('DD/MM/YYYY');

        // Chuyển đổi milliseconds sang số ngày
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        // Kiểm tra nếu sự khác biệt lớn hơn 30 ngày

        if (state === 0) {
            if (differenceInDays > 7 && differenceInDays < 10) {
                return "Chỉ nhấn 'Đã nhận được hàng' khi không có sự cố nào xảy ra"
            }
            if (differenceInDays > 10 && differenceInDays < 30) {
                return "Bạn hãy đánh giá sản phẩm trước " + futureDate +" nhé"
            }
            if (differenceInDays > 30) {
                return ""
            }
            return "Đơn hàng đang trên đường giao tới cho bạn"
        }
        if (state === 1) {
            if (differenceInDays > 30) {
                return ""
            }
            return "Bạn hãy đánh giá sản phẩm trước " + futureDate +" nhé"
        }
        if (state === 2) {
            return "Đơn hàng chưa thanh toán, xin vui lòng đợi Shop xác nhận"
        }
        if (state === 3) {
            return "Đơn hàng đang được shipper đi lấy"
        }
        if (state === 4) { return "Đơn đã bị huỷ" }

    }
    return (
        <TouchableOpacity
            onPress={() => {
                console.log("data detail product", businessInfor[item?.id_business]);
                //   navigation.navigate('DetailProduct',  {item: dataDetail[data?.id_product_information]} ),
                // id_user: dataUser?.id,
                // console.log("detail product in renderProducts in cart:", item);

            }}
            key={item?.id}
            style={{
                width: '100%',
                height: 240,
                // marginVertical: 6,
                paddingHorizontal: 5,
                marginBottom: 65,
                // borderWidth:1,
                flexDirection: 'column',
                backgroundColor: 'white'
            }}>
            <ShopInfo inCart={true} business={businessInfor[item?.id_business]}></ShopInfo>
            <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                <View
                    style={{
                        width: '30%',
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: COLOURS?.backgroundLight,
                        borderRadius: 10,
                        marginRight: 22,
                        marginLeft: 5,
                        // paddingBottom:5,
                        // marginBottom:5
                        // overflow: 'hidden', // Thêm dòng này
                    }}>
                    <Image
                        source={{ uri: item?.bill_detailSet[0]?.product?.image_product_information }}
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
                            {/* {1} */}
                            {item?.bill_detailSet[0]?.product?.name_product_information}
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
                                {item?.bill_detailSet[0]?.product?.size}
                            </Text>
                            <Text style={{ fontSize: 16, color: 'red', marginRight: 15, alignItems: 'flex-end' }}>
                                {"x" + (item?.bill_detailSet[0]?.quantity)}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between', // Đây là phần cập nhật
                            opacity: 0.6,
                        }}>
                            <Text></Text>
                            <Text style={{ fontSize: 16, color: 'red', marginRight: 15, alignItems: 'flex-end' }}>
                                {formatMoneyVND(item?.bill_detailSet[0]?.product?.price)}
                            </Text>
                        </View>
                        
                    </View>
                    <View style={{
                            flexDirection: 'row',
                            opacity: 0.6,
                        }}>
                            <Text style={{ fontSize: 16, color: 'black', alignItems:'flex-start' }}>
                                {item?.bill_detailSet.length+" sản phẩm"}
                            </Text>
                        </View>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                borderTopColor: '#F0F0F0',
                borderBottomColor: '#F0F0F0',
                borderLeftColor: 'white',
                borderRightColor: 'white',
                borderWidth: 4,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.6,
            }}>
                <Text>Xem thêm</Text>
            </View>
            <View style={{
                marginTop: 5,
                flexDirection: 'row',
                backgroundColor: 'white',
                borderTopColor: '#F0F0F0',
                borderBottomColor: '#F0F0F0',
                borderLeftColor: 'white',
                borderRightColor: 'white',
                borderWidth: 4,
                alignItems: 'center',
                justifyContent: 'space-between', // Đây là phần cập nhật
                opacity: 0.6,
            }}>
                <Text style={{ paddingLeft: 40, color: 'black' }}>Thành tiền</Text>
                <Text style={{ fontSize: 16, color: 'red', marginRight: 15, alignItems: 'flex-end' }}>
                    {formatMoneyVND(item?.total)}
                </Text>
            </View>
            <View style={{
                marginTop: 5,
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'space-between', // Đây là phần cập nhật
                opacity: 0.6,
            }}>
                <Text style={{ paddingLeft: 40, color: 'black', fontSize: 12, width: 200 }} numberOfLines={4}>{setOrderText(item?.state)}</Text>
                <TouchableOpacity style={{
                    marginRight: 10,
                    width: 120,
                    paddingVertical: 12,
                    borderWidth: 1,
                    backgroundColor: "red",
                    borderColor: "#ccc",
                    marginVertical: 5,
                    alignItems: 'center'
                }}
                    onPress={() => {
                        // handleLogin()
                    }}>
                    <Text style={{
                        fontSize: 16,
                        color: '#FFFFFF'
                    }}>{setOrderState(item?.state)}</Text>
                </TouchableOpacity>
                {/* <UIButton isSelected={true} title="OK"></UIButton> */}
            </View>
        </TouchableOpacity>

    )

}
export default EachItemOrderComp;