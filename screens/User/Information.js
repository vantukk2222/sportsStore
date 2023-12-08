import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useEvent } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByUserName, resetUser } from "../../redux/reducers/User/userInfor";
import Loading from "../../components/loading";
import { colors } from "../../constants";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
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
        // console.log("user", data);
        return () => {
            dispatch(resetUser)
        }
    }, [data])
    if (loading) {
        <Loading />
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: inforUser?.image_url }} // Thay đổi đường dẫn ảnh tương ứng
                    style={styles.profileImage}
                />
                <Text style={styles.username}>
                    {inforUser?.name}
                </Text>
            </View>

            <View style={styles.infoContainer}>
                <TouchableOpacity style={styles.infoItem}
                    onPress={() => {
                        navigation.navigate('Cart', { id_user: inforUser?.id })
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
                        navigation.navigate('setInfor', { infor: inforUser })
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
                <TouchableOpacity style={styles.setItem}
                    onPress={() => {

                    }}>
                    <Text style={styles.setText}>Đăng xuất</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingHorizontal: 10,
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
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
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
