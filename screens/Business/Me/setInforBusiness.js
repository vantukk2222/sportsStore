import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView, TextInput, TouchableOpacityBase } from "react-native";
import { colors } from "../../../constants";
import { toastError } from "../../../components/toastCustom";
import { ChangeInforBusiness } from "../../../redux/reducers/Business/changeInfor";
import { connect } from "react-redux";

const setInforBusiness = (props) => {
    const route = useRoute()
    const businessInfor = route.params.businessInfor;
    const [business, setBusiness] = useState({
        id_user: 0,
        name: "",
        payment: "",
        about: "",
        tax: 0

    })
    const navigation = useNavigation()
    useEffect(() => {
        setBusiness({
            id_user: businessInfor.id,
            name: businessInfor.name,
            payment: businessInfor.payment,
            about: businessInfor.about,
            tax: businessInfor.tax
        })
    }, [businessInfor])
    const {
        ChangeInforBusiness,
        changeInforState
    } = props
    const handleInputChange = (field, value) => {
        // console.log(field, value);
        setBusiness((preBusiness) => ({ ...preBusiness, [field]: value }));

    };
    const handleSubmit = () => {
        if (business.name.length > 0 && business.payment.length > 0) {
            let taxBusi = business.tax.length > 0 ? business.tax : businessInfor.tax
            ChangeInforBusiness(businessInfor.id, business)
            navigation.goBack()
            //console.log(business);

        }
        else {
            toastError('Cảnh báo', 'bạn cần nhập đủ thông tin')
        }
    }
    //console.log(business);
    return (
        <ScrollView style={styles.container}>
            <View style={{ borderBottomWidth: 0.4 }}>
                <Text style={styles.header}>Chỉnh sửa </Text>

            </View>
            <View style={styles.inputView}>
                <Text style={styles.inputText}>Tên cửa hàng:</Text>
                <TextInput
                    backgroundColor={'white'}
                    style={styles.input}
                    color={colors.denNhe}
                    placeholderTextColor={'gray'}
                    value={business?.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                    placeholder={business?.name}
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.inputText}>Thanh toán:</Text>
                <TextInput
                    backgroundColor={'white'}
                    style={styles.input}
                    color={colors.denNhe}
                    placeholderTextColor={'gray'}
                    value={business?.payment}
                    onChangeText={(value) => handleInputChange('payment', value)}
                    placeholder={business?.payment}
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.inputText}>Thông tin:</Text>
                <TextInput
                    backgroundColor={'white'}
                    style={styles.input}
                    color={colors.denNhe}
                    placeholderTextColor={'gray'}
                    value={business?.about}
                    onChangeText={(value) => handleInputChange('about', value)}
                    placeholder={business?.about}
                />
            </View>

            <View style={styles.inputView}>
                <View>
                    <Text style={styles.inputText}>Mã số thuế: </Text>
                    <Text style={{ color: 'red', fontSize: 12 }}>Mã hiện tại : {businessInfor.tax}</Text>
                </View>
                <TextInput
                    backgroundColor={'white'}
                    color={colors.denNhe}
                    style={styles.input}
                    value={business.tax}
                    onChangeText={(value) => handleInputChange('tax', value)}
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity
                //</ScrollView>
                onPress={() => {
                    if (business?.tax.length <= 0) {
                        handleInputChange('tax', businessInfor?.tax)
                    }
                    handleSubmit()
                }}
                style={{
                    marginTop: 50,
                    height: 50,
                    width: 200,
                    backgroundColor: 'green',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                }} >
                <Text style={{ fontSize: 20, color: 'white', fontSize: 20, fontWeight: '500' }}>Lưu</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginHorizontal: 2,
        backgroundColor: colors.trangXam,
        borderRadius: 8,
        borderColor: 'gray',
        borderWidth: 0.4
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
        marginTop: 5

    },
    inputView: {
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginVertical: 10,
        marginTop: 20
    },
    inputText: {
        color: 'black'
        , fontSize: 20
        , fontWeight: '500'
    },
    input: {
        marginTop: 10,
        borderRadius: 8,
    }
});
const mapStateToProps = (state) => ({
    changeInforState: state.changeInfor
})
const mapDispatchToProps = {
    ChangeInforBusiness
}
export default connect(mapStateToProps, { ...mapDispatchToProps })(setInforBusiness)