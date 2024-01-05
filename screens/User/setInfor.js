import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../constants";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { reset, setUserInformation } from "../../redux/reducers/User/setInforUser";
import { fetchUserByUserName } from "../../redux/reducers/User/userInfor";
import { useNavigation } from "@react-navigation/native";
import { toastError, toastsuccess } from "../../components/toastCustom";
import LoadingModal from "../../components/loading";
const SetInfor = ({ route }) => {

    const TxtName = useRef();
    const TxtEmail = useRef();
    const TxtPhone = useRef();
    const TxtCic = useRef();
    const TxtAdress = useRef();

    const [address, setAdress] = useState("")
    const { infor } = route.params
    const [user, setUser] = useState()

    const { dataInfor, loadingInfor, errorInfor } = useSelector((state) => state.setInforUser)

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const goBack = () => {
        navigation.goBack();
        // console.log("Log number id: ", 111);
    };
    useEffect(() => {
        setUser(infor)
    }, [infor])

    const handleSaveChanges = async () => {
        const newUser = ({
            ...user
            , name: TxtName.current || user.name,
            email: TxtEmail.current || user.email,
            phone: TxtPhone.current || user.phone,
            cic: TxtCic.current || user.cic,
            address: TxtAdress.current || user.address
            // password: "$2a$10$FyUiMIaGMB4FRKSSiGUG6ump1uHtO4vJTFOijfBha3bE0u0KIeGxq",
        });
        setUser(newUser)
        console.log("Saved changes:", newUser);

        // console.log(newUser)
        await dispatch(setUserInformation(newUser))


        // Đưa ra thông báo hoặc chuyển hướng sau khi lưu thành công
    };
    useEffect(() => {
        console.log("status", dataInfor)
        if (dataInfor === 202) {
            console.log("hi")
            dispatch(fetchUserByUserName(infor?.username)).then(() => {
                toastsuccess("Thành công", "Chỉnh sửa thông tin xong.")
                navigation.goBack()
            })
        }
        if (errorInfor) { toastError("Xin lỗi", "Đã xảy ra lỗi") }
        return (() => {
            dispatch(reset())
        })
        //setUser(data)
    }, [dataInfor, dispatch]);

    return (
        <View style={{ flex: 100 }}>
            {loadingInfor && <LoadingModal />}
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => { goBack() }}>
                        <Icon name="angle-left" size={30} style={styles.iconBuffer}></Icon>
                    </TouchableOpacity>
                    {/* {init == "Start"? "":(<Icon name="angle-left" size={30} style={styles.iconBuffer} onPress={() => { goBack}} />)} */}
                    <Text style={styles.heading}>Chỉnh sửa thông tin cá nhân</Text>
                </View>


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
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Địa chỉ hiện tại:</Text>
                    <TextInput
                        style={styles.input}
                        // placeholder={user?.address}
                        placeholderTextColor="gray"
                        value={address || user?.address}
                        onChangeText={(text) => {
                            setAdress(text)
                            TxtAdress.current = text
                        }}

                    />
                </View>

            </ScrollView>
            <TouchableOpacity style={styles.saveButton} onPress={async () => {
                handleSaveChanges()
            }}>
                <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingTop: 20
    },
    headerContainer: {
        backgroundColor: "#EEEEEE",
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        // marginTop: 5,
        justifyContent: 'space-between',
    },
    iconBuffer:
    {
        // backgroundColor:"green",
        // witd:30,
        color: '#4873E0',
        alignItems: 'flex-end',
        marginLeft: 5

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
        // height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: 'black'
    },
    saveButton: {
        // position: 'absolute',
        marginTop: 15,

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

export default SetInfor;
