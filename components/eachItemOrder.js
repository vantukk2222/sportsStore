import { Button, Image, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { COLOURS } from "../screens/Home/Database";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopInfo from "../screens/Business/ShopInfo";
import { formatMoneyVND } from "../utilies/validation";
import UIButton from "./UIButton";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useDebugValue, useEffect, useRef, useState } from "react";
import { getInforBusinessByID } from "../redux/reducers/Business/getBusinessByID";
import { useNavigation } from "@react-navigation/native";
import { cancelBillByID } from "../redux/reducers/Bill/billCancelReducer";
import { toastError, toastsuccess } from "./toastCustom";
import addToCart from "../API/Cart/addToCart";
import { addToCartUser } from "../redux/reducers/Cart/cartReducer";

const EachItemOrderComp = ({ item, setStateOrder, setIndex, total }) => {
    const { businessInfor, isLoading, error } = useSelector((state) => state.getBusinessByIDReducer)
    // const [total, setTotal] = useState(0)
    const listIDRef = useRef([]);


    const dispatch = useDispatch();

    const navigation = useNavigation();
    useEffect(() => {
        const uniqueBusinessIds = new Set();
        if (item?.state === 2) {
            item.bill_detailSet.forEach((bill) => {
                const { product } = bill;
                if (product && product.id_business) {
                    if (!uniqueBusinessIds.has(product.id_business)) {
                        uniqueBusinessIds.add(product.id_business);
                    }
                }
            });
        }
        else {
            uniqueBusinessIds.add(item?.id_business)
        }
        const newIDs = Array.from(uniqueBusinessIds);
        
        // Cập nhật giá trị của listID thông qua useRef
        listIDRef.current = newIDs;
    
        newIDs.map((eachID) => {
            console.log("ID_buss", eachID);
            dispatch(getInforBusinessByID(eachID))
        })
    }, [item?.id_business]);

    console.log("Re-render eachItem");

    const setOrderButton = (state) => {

        const currentDate = new Date();
        const pastDate = new Date(item?.created_at);
        const differenceInTime = currentDate - pastDate;
        const futureDate = moment(pastDate).add(30, 'days').format('DD/MM/YYYY');

        // Chuyển đổi milliseconds sang số ngày
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        // Kiểm tra nếu sự khác biệt lớn hơn 30 ngày

        if (state === 0) {
            if (differenceInDays > 1 && differenceInDays < 7) {
                return "Đã nhận hàng"
            }
            if (differenceInDays > 7 && differenceInDays < 30) {
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
    const handleButton = (text) => {
        if (text === "Huỷ đơn") {
            dispatch(cancelBillByID(item?.transaction?.id, "cancel")).then((status) => {
                if (status === 200 || status === 201 || status === 202 || status === 203 || status === 204) {
                    toastsuccess("Cảm ơn", "Quý khách đã huỷ đơn thành công.")
                    setIndex(0)
                    setStateOrder(0)
                }
                else {
                    toastError("Xin lỗi", status)
                }
            })
        }

        if (text === "Mua lại") {
            const promises = item?.bill_detailSet?.map((eachProductItem) => {
                return dispatch(addToCartUser(item?.id_user, eachProductItem?.product?.id, eachProductItem.quantity));
            });
            Promise.all(promises)
                .then((results) => {
                    // Đã hoàn thành tất cả các promises
                    console.log('All addToCartUser operations completed:', results);
                    toastsuccess("Xong", "Đã thêm lại vào giỏ hàng")
                    // Thực hiện công việc tiếp theo sau khi map và dispatch đã hoàn thành ở đây
                })
                .catch((error) => {
                    // Xử lý lỗi nếu có
                    console.error('Error during addToCartUser operations:', error);
                    toastError("Xin lỗi", "Đã có lỗi xảy ra")
                });
        }
        if (text === "Đã nhận hàng") {
            let list_ID_Bill = [];
            list_ID_Bill.push(item?.id)
            dispatch(cancelBillByID(list_ID_Bill, "receive")).then((status) => {
                if (status === 200 || status === 201 || status === 202 || status === 203 || status === 204) {
                    toastsuccess("Cảm ơn", "Đơn của bạn đã hoàn thành.")
                    setIndex(0)
                    setStateOrder(0)
                }
                else {
                    toastError("Xin lỗi", status)
                }
            })
        }
        if (text === "Đánh giá") {
            navigation.navigate("RatingOrder", { item: item })
        }
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
            if (differenceInDays > 1 && differenceInDays < 7) {
                return "Chỉ nhấn 'Đã nhận hàng' khi không có sự cố nào xảy ra."
            }
            if (differenceInDays > 7 && differenceInDays < 30) {
                return "Bạn hãy đánh giá sản phẩm trước " + futureDate + " nhé."
            }
            if (differenceInDays > 30) {
                return ""
            }
            return "Đơn hàng đang trên đường giao tới cho bạn."
        }
        if (state === 1) {
            if (differenceInDays > 30) {
                return ""
            }
            return "Bạn hãy đánh giá sản phẩm trước " + futureDate + " nhé."
        }
        if (state === 2) {
            return "Đơn hàng chưa thanh toán, hãy thanh toán nếu không đơn sẽ bị huỷ."
        }
        if (state === 3) {
            return "Đơn đang được SHOP xác nhận."
        }
        if (state === 4) { return "Đơn đã bị huỷ." }

    }

    return (

        <TouchableOpacity
            onPress={() => {
                // console.log("data detail product", businessInfor[item?.id_business]);
                console.log("ID_Bill:", item?.id);
                // navigation.navigate("RatingOrder", { item: item })

                navigation.navigate("detailOrder", { orderByState: item, businessInfor: businessInfor, list_id: listIDRef.current, total: total })
                // navigation.navigate("RatingOrder" )

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
                        borderRadius: 10,
                        marginRight: 22,
                        marginLeft: 5,
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
                        <Text style={{ fontSize: 16, color: 'black', alignItems: 'flex-start' }}>
                            {item?.bill_detailSet.length + " sản phẩm"}
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
            <View
                // onPress={() => {
                //     console.log(total);
                // }}
                style={{
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
                    {formatMoneyVND(total)}
                </Text>
            </View>
            <View style={{
                marginTop: 5,
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'space-between', // Đây là phần cập nhật
                // opacity: 1,
            }}>
                <Text style={{ paddingLeft: 40, color: 'black', fontSize: 12, width: 200 }} numberOfLines={4}>{setOrderText(item?.state)}</Text>
                <TouchableOpacity
                    style={{
                        marginRight: 10,
                        width: 120,
                        paddingVertical: 12,
                        borderWidth: 1,
                        backgroundColor: "red",
                        borderColor: "#ccc",
                        marginVertical: 5,
                        alignItems: 'center',
                        opacity: 1,

                    }}
                    onPress={() => {
                        handleButton(setOrderButton(item?.state))
                        // console.log("data", item)
                        // 
                    }}>
                    <Text style={{
                        opacity: 1,

                        fontSize: 16,
                        color: 'white'
                    }}>{setOrderButton(item?.state)}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'gray',
    },
    selectedButton: {
        backgroundColor: 'lightblue',
        borderColor: 'blue',
    },
    selectedText: {
        color: 'blue',
        fontWeight: 'bold',
    },
    openButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default EachItemOrderComp;