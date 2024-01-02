import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useEvent } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByUserName, resetStateUser, resetUser } from "../../redux/reducers/User/userInfor";
import Loading from "../../components/loading";
import { colors } from "../../constants";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistor } from "../../redux/store";
import { logout } from "../../redux/reducers/Login/signinReducer";
import { resetListCart, resetStateListCart } from "../../redux/reducers/Cart/listCartReducer";
import { isEqual } from 'lodash'
import { toastError } from "../../components/toastCustom";
import Toast from "react-native-toast-message";
import { asyncStorage } from "../../utilies/asyncStorage";
const Information = () => {
    const { userName } = useSelector((state) => state.login)

    const { data, loading, error } = useSelector((state) => state.userData)
    const dispatch = useDispatch();
    const [inforUser, setInforUser] = useState([])

    const navigation = useNavigation()
    useEffect(() => {
        dispatch(fetchUserByUserName(userName))
    }, [userName])
    useEffect(() => {
        setInforUser(data)
    }, [data])
    const handleLogin = () => {
        navigation.navigate("Login")
    }
    const handleLogout = async () => {
        await asyncStorage.setUsername('')
        dispatch(logout())
        dispatch(resetStateListCart())
        dispatch(resetStateUser())
        // const data = await AsyncStorage.getItem('persist:root')
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'LoginBottomNavigator' }], // Thay 'Home' bằng màn hình bạn muốn quay về
            })
        );
        // console.log("data logout:", data);
    }
    if (loading) {
        <Loading />
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: inforUser?.image_url ? inforUser?.image_url : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" }} // Thay đổi đường dẫn ảnh tương ứng
                    style={styles.profileImage}
                />
                <Text style={{
                    fontSize: inforUser?.name ? 25 : 15,
                    // alignContent: 'center',
                    // alignItems: 'center',
                    fontWeight: "600",
                    color: inforUser?.name ? colors.facebook : 'red',
                }}>
                    {inforUser?.name ? inforUser?.name : "Vui lòng đăng nhập"}
                </Text>
            </View>

            <View style={styles.infoContainer}>
                <TouchableOpacity style={styles.infoItem}
                    onPress={() => {
                        inforUser?.id ? navigation.navigate('Cart', { id_user: inforUser?.id }) : toastError("Bạn chưa đăng nhập", "Xin vui lòng đăng nhập")
                    }}>
                    <Text style={styles.infoText}>Đơn hàng của tôi</Text>
                    <Icon
                        name="chevron-circle-right"
                        size={24}
                        color={colors.denNhe}
                        style={{ position: 'absolute', right: 0, bottom: 0, marginBottom: 10 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoItem}
                    onPress={() => {
                        data?.id ? navigation.navigate('OrderHistory' , {id_user:data?.id}) : toastError("Bạn chưa đăng nhập","Xin vui lòng đăng nhập")
                    }}
                >
                    <Text style={styles.infoText}>Đơn mua</Text>
                    <Icon

                        name="chevron-circle-right"
                        size={24}
                        color={colors.denNhe}
                        style={{ position: 'absolute', right: 0, bottom: 0, marginBottom: 10 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoItem}
                onPress={() => {
                    //  navigation.navigate('Cart')
                    console.log("ID user in information: ",data?.id);
                }}>
                    <Text style={styles.infoText}>Địa chỉ của tôi</Text>
                    <Icon
                        
                        name="chevron-circle-right"
                        size={24}
                        color={colors.denNhe}
                        style={{ position: 'absolute', right: 0, bottom: 0, marginBottom: 10 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoItem}
                    onPress={() => {
                        inforUser?.id ? navigation.navigate('setInfor', { infor: inforUser }) : toastError("Bạn chưa đăng nhập", "Xin vui lòng đăng nhập")
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
            <View style={styles.settingContainer}>
                {inforUser?.name ? "" : (<TouchableOpacity style={styles.setItem}
                    onPress={() => {
                        handleLogin()
                    }}>
                    <Text style={styles.setText}>Đăng nhập</Text>
                </TouchableOpacity>)}
                {inforUser?.name ? (<TouchableOpacity style={styles.setItem}
                    onPress={() => {
                        handleLogout()
                    }}>
                    <Text style={styles.setText}>Đăng xuất</Text>
                </TouchableOpacity>) : ""}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#FBFBFB"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    username: {
        fontSize: 25,
        fontWeight: "600",
        color: colors.facebook,

    },
    infoContainer: {
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingTop: 6,
        paddingTop: 40,

    },
    settingContainer: {

        position: 'absolute',
        bottom: 1,
        left: 1,
        right: 1,
        // borderTopWidth: 1,
        // borderTopColor: "#ccc",
        flex: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    infoItem: {
        paddingTop: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: 'row'
    },
    setItem: {
        paddingTop: 20,
        width: 160,
        paddingVertical: 12,
        borderWidth: 1,
        backgroundColor: "#FBFBFB",
        borderColor: "#ccc",
        marginLeft: 5,
        marginVertical: 5,
        alignItems: 'center'
    },
    setText: {
        fontSize: 16,
        color: 'red'
    },
    infoText: {
        fontSize: 16,
        color: 'black'
    },
});

export default Information;
