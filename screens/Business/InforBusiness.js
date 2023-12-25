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
const Information = () => {
    const { userName, isLoading, error:errorUser } = useSelector((state) => state.login)

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
    if(error)
    {
        toastError("Xin lỗi", "Đã có lỗi xảy ra với kết nối")
        return <Loading />;
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: inforUser?.image_url ? inforUser?.image_url : "data:image/png;base64,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" }} // Thay đổi đường dẫn ảnh tương ứng
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
                <TouchableOpacity style={styles.infoItem}>
                    <Text style={styles.infoText}>Ví và ưu đãi</Text>
                    <Icon
                        onPress={() => {
                            //   navigation.navigate('Cart')
                        }}
                        name="chevron-circle-right"
                        size={24}
                        color={colors.denNhe}
                        style={{ position: 'absolute', right: 0, bottom: 0, marginBottom: 10 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoItem}>
                    <Text style={styles.infoText}>Địa chỉ của tôi</Text>
                    <Icon
                        onPress={() => {
                            //  navigation.navigate('Cart')
                        }}
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
        bottom: 0,
        left: 1,
        right: 1,
        // borderTopWidth: 1,
        // borderTopColor: "#ccc",
        flex: 2,
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
        flex: 1,
        paddingTop: 20,
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
        color: 'black'
    },
    infoText: {
        fontSize: 16,
        color: 'black'
    },
});

export default Information;
