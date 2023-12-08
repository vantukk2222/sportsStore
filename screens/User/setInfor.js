import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../constants";
import { useDispatch, useSelector } from 'react-redux';
import { reset, setUserInformation } from "../../redux/reducers/User/setInforUser";
import { fetchUserByUserName } from "../../redux/reducers/User/userInfor";
const setInfor = ({ route }) => {

    const TxtName = useRef();
    const TxtEmail = useRef();
    const TxtPhone = useRef();
    const TxtCic = useRef();

    const { infor } = route.params
    const [user, setUser] = useState()

    const { dataInfor, loadingInfor, errorInfor } = useSelector((state) => state.setInforUser)

    const dispatch = useDispatch()
    useEffect(() => {
        setUser(infor)
    }, [infor])

    const handleSaveChanges = () => {
        // Thực hiện logic để lưu các thay đổi thông tin cá nhân
        // Ví dụ: Gửi yêu cầu API để cập nhật thông tin lên máy chủ
        console.log("Saved changes:", TxtName.current);
        const newUser = ({
            ...user
            , name: TxtName.current || user.name,
            email: TxtEmail.current || user.email,
            phone: TxtPhone.current || user.phone,
            cic: TxtCic.current || user.cic,
            password: "$2a$10$FyUiMIaGMB4FRKSSiGUG6ump1uHtO4vJTFOijfBha3bE0u0KIeGxq",
        });
        setUser(newUser)
        // console.log(newUser)
        dispatch(setUserInformation(newUser))

        // Đưa ra thông báo hoặc chuyển hướng sau khi lưu thành công
    };
    useEffect(() => {
        console.log("status", dataInfor)
        if (dataInfor === 202) {
            console.log("hi")
            dispatch(fetchUserByUserName(infor?.username))
        }
        return (() => {
            dispatch(reset())
        })
        //setUser(data)
    }, [dataInfor, dispatch]);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Chỉnh sửa thông tin cá nhân</Text>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Họ và tên:</Text>
                <TextInput
                    style={styles.input}
                    placeholder={user?.name}
                    placeholderTextColor="gray"
                    onChangeText={(text) => { TxtName.current = text }}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder={user?.email}
                    placeholderTextColor="gray"
                    onChangeText={(text) => { TxtEmail.current = text }}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Căn cước công dân:</Text>
                <TextInput
                    style={styles.input}
                    placeholder={user?.cic}
                    placeholderTextColor="gray"
                    onChangeText={(text) => { TxtCic.current = text }}
                    keyboardType="phone-pad"
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Số điện thoại:</Text>
                <TextInput
                    style={styles.input}
                    placeholder={user?.phone}
                    placeholderTextColor="gray"
                    onChangeText={(text) => { TxtPhone.current = text }}
                    keyboardType="phone-pad"
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 20
    },
    heading: {
        fontSize: 25,
        fontWeight: "700",
        marginBottom: 20,
        color: colors.facebook,

    },
    fieldContainer: {
        marginBottom: 16,
        paddingTop: 5,
        marginTop: 2
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: 'black'
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: 'black'
    },
    saveButton: {
        position: 'absolute',
        bottom: 0,
        left: 1,
        right: 1,
        backgroundColor: "green",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15,
        marginHorizontal: 15

    },
    saveButtonText: {

        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default setInfor;
