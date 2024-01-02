import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HeaderComp from "../../components/Header";
import ListCategory from "../Category/ListCategory";
import { useEffect, useRef, useState } from "react";
import { colors, fontSize } from '../../constants/index';
import eachItemOrderComp from "../../components/eachItemOrder";
import EachItemOrderComp from "../../components/eachItemOrder";
import { useDispatch, useSelector } from "react-redux";
import { getAllBillByIDUser } from "../../redux/reducers/Bill/getBillUserReducer";
import {isEqual} from 'lodash'
const _spacing = 10;
const OrderHistoryScreen = ({ route }) => {
    const { id_user } = route.params
    const [index, setIndex] = useState(0);
    const orderStatus = ["Đang giao hàng", "Đã giao", "Chưa thanh toán", "Chờ lấy hàng", "Đã huỷ"];
    const ref = useRef(null);
    const [viewPosition, setViewPosition] = useState(0)
    const { dataBill, isLoading: loadingBill, error: errorBill } = useSelector((state) => state.getAllBillReducer)
    const [cartItems, setCartItems] = useState([])
    const [orderByState, setorderByState] = useState([])
    const dispatch = useDispatch()

    const transformData = (data) => {
        const updatedData = data.map((item) => ({
            ...item,
            bill_detailSet: item.bill_detailSet.map((bill) => ({
                ...bill,
                product: {
                    ...bill.product,
                    id_business: item.id_business,
                },
            })),
        }));
        console.log("Transform nè");
        setCartItems(updatedData);
    };

    useEffect(() => {
        dispatch(getAllBillByIDUser(id_user)).then(() => { transformData(dataBill) })
    }, [id_user])
    useEffect(()=>{
       if(!isEqual(dataBill,cartItems))
       { transformData(dataBill)
        setIndex(0)
    }
    },[dataBill])
    useEffect(() => {
        const orderByStateByState = Array.from({ length: 5 }, () => []);

        if (cartItems.length > 0) {
            orderByStateByState.forEach((_, state) => {
                orderByStateByState[state] = cartItems.filter((item) => item.state === state);
            });
        }

        const copiedOrderByState = orderByStateByState.map((subArray) => [...subArray]);
        if (copiedOrderByState[2]?.length > 0) {
            const newData = {};
            copiedOrderByState[2].forEach((item) => {
                if (!newData[item.transaction.id]) {
                    newData[item.transaction.id] = { ...item };
                } else {
                    newData[item.transaction.id].bill_detailSet = [
                        ...newData[item.transaction.id].bill_detailSet,
                        ...item.bill_detailSet,
                    ];
                }
            });
            copiedOrderByState[2] = Object.values(newData);
        }
        setorderByState(copiedOrderByState);
        setIndex(0);
    }, [cartItems])
    useEffect(() => {
        if (orderStatus?.length > 0) {
            ref.current?.scrollToIndex({
                index,
                animated: true,
                viewOffset: viewPosition === 0.5 || viewPosition === 1 ? 0 : _spacing,
                viewPosition: 0.5 
            });
        }

    }, [index, orderStatus, viewPosition]);

    if (errorBill) {
        return (
            <View>
                <HeaderComp></HeaderComp>
                <Text>Đã có lỗi xin hãy đăng nhập lại</Text>
            </View>
        )
    }

    return (<View style={{ flex: 100 }}>
        <HeaderComp init="Đơn mua"></HeaderComp>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 5, }}>
            {/* In ra menu order */}
            <FlatList
                ref={ref}
                initialScrollIndex={index}
                style={{ flexGrow: 0, marginBottom: 5 }}
                data={orderStatus}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingLeft: _spacing }}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item, index: fIndex }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            setIndex(fIndex)
                            key = { index }
                            console.log("index:", fIndex);
                        }}>
                            <View
                                style={{
                                    marginRight: _spacing,
                                    padding: _spacing,
                                    borderWidth: 0.5,
                                    borderColor: "black",
                                    borderRadius: 12,
                                    backgroundColor: fIndex === index ? 'red' : colors.inactives
                                }}>
                                <Text style={{ color: fIndex === index ? 'white' : '#36303F', fontWeight: '700', fontSize: fontSize.h4, }}>
                                    {item}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
        <ScrollView nestedScrollEnabled={true}>


            <View>
                {orderByState ? orderByState[index]?.map((eachproductItem, eachindex) => {
                    let totalEachItem = 0
                    eachproductItem?.bill_detailSet?.map((eachBill) => {
                        // console.log("1", eachBill);
                        totalEachItem += eachBill?.price
                    })
                    return <EachItemOrderComp item={JSON.parse(JSON.stringify(eachproductItem))} total={totalEachItem} key={eachindex} />;
                }) : <Text style={{ alignContent: 'center' }}> Chưa có đơn nào</Text>}
            </View>

        </ScrollView>

    </View>)


}
export default OrderHistoryScreen;