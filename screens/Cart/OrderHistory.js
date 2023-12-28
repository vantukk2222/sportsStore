import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HeaderComp from "../../components/Header";
import ListCategory from "../Category/ListCategory";
import { useEffect, useRef, useState } from "react";
import { colors, fontSize } from '../../constants/index';
import eachItemOrderComp from "../../components/eachItemOrder";
import EachItemOrderComp from "../../components/eachItemOrder";
import { useDispatch, useSelector } from "react-redux";
import { getAllBillByIDUser } from "../../redux/reducers/Bill/getBillUserReducer";

const _spacing = 10;
const OrderHistoryScreen = ({route}) => {
    const {id_user} = route.params
    const [index, setIndex] = useState(0);
    const [orderStatus, setorderStatus] = useState(["Đang giao hàng","Đã giao", "Chưa thanh toán", "Chờ lấy hàng",  "Đã huỷ"]);
    const ref = useRef(null);
    const [viewPosition, setViewPosition] = useState(0)
    const [stateOrder, setStateOrder] = useState(0)
    // const []
    const {dataBill, isLoading:loadingBill, error:errorBill} = useSelector((state) => state.getAllBillReducer)
    const [cartItems, setCartItems] = useState([])
    
    const [orderByState, setorderByState] = useState(cartItems)
    const dispatch = useDispatch()
    useEffect(()=>{
        console.log("ID_user before dispatch getALLBill", id_user);
        dispatch(getAllBillByIDUser(id_user)).then(()=>{setCartItems(dataBill)})
    },[id_user])
    useEffect(()=>{
        if(dataBill)
        {
            setCartItems(dataBill)
            const listOrderByState = cartItems.filter((item) => item.state === 0);
            setorderByState(listOrderByState);
        }
    },[dataBill])
    useEffect(() => {
        const listOrderByState = cartItems.filter((item) => item.state === stateOrder);
        setorderByState(listOrderByState);
    }, [stateOrder]);
    useEffect(() => {
        if (orderStatus?.length > 0) {
            ref.current?.scrollToIndex({
                index,
                animated: true,
                viewOffset: viewPosition === 0.5 || viewPosition === 1 ? 0 : _spacing,
                viewPosition: 0.5 // percentage from the viewport starting from left handSide 
            });
        }

    }, [index, orderStatus, viewPosition]);

    const setOrderState= (item) =>{
       if(item === orderStatus[0]) 
        {return 0}
        if(item === orderStatus[1]) 
        {return 1}
        if(item === orderStatus[2]) 
        {return 2}
        if(item === orderStatus[3]) 
        {return 3}
        if(item === orderStatus[4]) 
        {return 4}

    }


    if(errorBill)
    {
        return (
            <View>
                <HeaderComp></HeaderComp>
                <Text>Đã có lỗi xin hãy đăng nhập lại</Text>
            </View>
        )
    }

    return (<View style={{flex:100}}>
        <HeaderComp init="Đơn mua"></HeaderComp>
        <View style={{  alignItems: 'center', justifyContent: 'center', marginVertical: 5, }}>
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
                                // navigation.navigate('ListProductByCategory', {
                                //     item: item,
                                // });
                                setStateOrder(fIndex)
                                setIndex(fIndex)
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
                                    <Text style={{ color: fIndex === index ? 'white':'#36303F', fontWeight: '700', fontSize: fontSize.h4, }}>
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
            {orderByState && orderByState[0]?.state === index ? orderByState.map((eachproductItem, eachindex) => {
                  return <EachItemOrderComp item={eachproductItem} key ={eachindex}/>;
                }) : <Text style={{alignContent:'center'}}> Chưa có đơn nào</Text>}
            </View>

        </ScrollView>

    </View>)


}
export default OrderHistoryScreen;