import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HeaderComp from "../../components/Header";
import ListCategory from "../Category/ListCategory";
import { useEffect, useRef, useState } from "react";
import { colors, fontSize } from '../../constants/index';
import eachItemOrderComp from "../../components/eachItemOrder";

const _spacing = 10;
const OrderHistoryScreen = () => {
    const [index, setIndex] = useState(0);
    const [orderStatus, setorderStatus] = useState(["Chờ xác nhận", "Chờ lấy hàng", "Chờ giao hàng", "Đã giao", "Đà huỷ", "Trả hàng"]);
    const ref = useRef(null);
    const [viewPosition, setViewPosition] = useState(0)
    const cartItems = [
        {
            id: '1',
            productName: 'Áo thun nam',
            price: 200000,
            quantity: 2,
            size : 'size S',
            image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/451b4531-1090-4044-ad0f-fa9e2b6cd902/streakfly-road-racing-shoes-V17qZm.png',
        },
        {
            id: '2',
            productName: 'Áo thun nam',
            price: 200000,
            quantity: 2,
            size : 'size S',
            image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/451b4531-1090-4044-ad0f-fa9e2b6cd902/streakfly-road-racing-shoes-V17qZm.png',
        },
        {
            id: '3',
            productName: 'Áo thun nam',
            price: 200000,
            quantity: 2,
            size : 'size S',
            image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/451b4531-1090-4044-ad0f-fa9e2b6cd902/streakfly-road-racing-shoes-V17qZm.png',
        },
        {
            id: '4',
            productName: 'Áo thun nam',
            price: 200000,
            quantity: 2,
            size : 'size S',
            image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/451b4531-1090-4044-ad0f-fa9e2b6cd902/streakfly-road-racing-shoes-V17qZm.png',
        },
        {
            id: '5',
            productName: 'Áo thun nam',
            price: 200000,
            quantity: 2,
            size : 'size S',
            image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/451b4531-1090-4044-ad0f-fa9e2b6cd902/streakfly-road-racing-shoes-V17qZm.png',
        },
        {
            id: '6',
            productName: 'Áo thun nam',
            price: 200000,
            quantity: 2,
            size : 'size S',
            image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/451b4531-1090-4044-ad0f-fa9e2b6cd902/streakfly-road-racing-shoes-V17qZm.png',
        },
        {
            id: '7',
            productName: 'Áo thun nam',
            price: 200000,
            quantity: 2,
            size : 'size S',
            image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/451b4531-1090-4044-ad0f-fa9e2b6cd902/streakfly-road-racing-shoes-V17qZm.png',
        },
        {
            id: '8',
            productName: 'Áo thun nam',
            price: 200000,
            quantity: 2,
            size : 'size S',
            image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/451b4531-1090-4044-ad0f-fa9e2b6cd902/streakfly-road-racing-shoes-V17qZm.png',
        },
        {
            id: '9',
            productName: 'Áo thun nam',
            price: 200000,
            quantity: 2,
            size : 'size S',
            image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/451b4531-1090-4044-ad0f-fa9e2b6cd902/streakfly-road-racing-shoes-V17qZm.png',
        },
        // Thêm các mục khác nếu cần
    ];
    useEffect(() => {
        if (orderStatus.length > 0) {
            ref.current?.scrollToIndex({
                index,
                animated: true,
                viewOffset: viewPosition === 0.5 || viewPosition === 1 ? 0 : _spacing,
                viewPosition: 0.5 // percentage from the viewport starting from left handSide 
            });
        }

    }, [index, orderStatus, viewPosition]);






    return (<View>
        <HeaderComp init="Đơn mua"></HeaderComp>
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 5, }}>
                {/* // <<<<<<< categoryDat */}

                {/* // ======= */}
                {/* //             {console.log(categories.length)} */}
                {/* // >>>>>>> NewD */}
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
            <FlatList
                data={cartItems}
                renderItem={eachItemOrderComp}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />

        </ScrollView>

    </View>)


}
export default OrderHistoryScreen;