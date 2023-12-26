import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { COLOURS } from "../screens/Home/Database";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopInfo from "../screens/Business/ShopInfo";
import { formatMoneyVND } from "../utilies/validation";
import UIButton from "./UIButton";

const eachItemOrderComp = ({ item }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                console.log("data detail product", item?.id);
                //   navigation.navigate('DetailProduct',  {item: dataDetail[data?.id_product_information]} ),
                // id_user: dataUser?.id,
                console.log("detail product in renderProducts in cart:", item);

            }}
            key={item?.id}
            style={{
                width: '100%',
                height: 240,
                // marginVertical: 6,
                paddingHorizontal:5,
                marginBottom: 65,
                // borderWidth:1,
                flexDirection: 'column',
                backgroundColor: 'white'
            }}>
            <ShopInfo inCart={true}></ShopInfo>
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
                        source={{ uri: item?.image }}
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
                            numberOfLines={1}
                            style={{
                                fontSize: 14,
                                maxWidth: '100%',
                                color: COLOURS.black,
                                fontWeight: '600',
                                letterSpacing: 1,
                                paddingEnd: 3

                            }}>
                            {/* {1} */}
                            {item?.productName}
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
                                {item?.size}
                            </Text>
                            <Text style={{ fontSize: 16, color: 'red', marginRight: 15, alignItems: 'flex-end' }}>
                                {"x" + (item?.quantity)}
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
                                {formatMoneyVND(item?.price)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                borderTopColor:'#F0F0F0',
                borderBottomColor:'#F0F0F0',
                borderLeftColor:'white',
                borderRightColor:'white',
                borderWidth:4,
                alignItems: 'center',
                justifyContent:'center',
                opacity: 0.6,
            }}>
                <Text>Xem thêm</Text>
            </View>
            <View style={{
                marginTop: 5,
                flexDirection: 'row',
                backgroundColor: 'white',
                borderTopColor:'#F0F0F0',
                borderBottomColor:'#F0F0F0',
                borderLeftColor:'white',
                borderRightColor:'white',
                borderWidth:4,
                alignItems: 'center',
                justifyContent: 'space-between', // Đây là phần cập nhật
                opacity: 0.6,
            }}>
                <Text style={{ paddingLeft: 40, color: 'black' }}>Thành tiền</Text>
                <Text style={{ fontSize: 16, color: 'red', marginRight: 15, alignItems: 'flex-end' }}>
                    {formatMoneyVND(item?.price)}
                </Text>
            </View>
            <View style={{
                marginTop:5,
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'space-between', // Đây là phần cập nhật
                opacity: 0.6,
            }}>
                <Text style={{ paddingLeft: 40, color: 'black', fontSize:12, width:200 }} numberOfLines={4}>MuốnMuốnMuốnMuốnMuốnMuốnMuốnMuốn mua lại thì nhắn tin cho tôi vào số này nhé hehe</Text>
                <TouchableOpacity style={{
                    marginRight:10,
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
                    }}>Mua lại</Text>
                </TouchableOpacity>
                {/* <UIButton isSelected={true} title="OK"></UIButton> */}
            </View>
        </TouchableOpacity>

    )

}
export default eachItemOrderComp;