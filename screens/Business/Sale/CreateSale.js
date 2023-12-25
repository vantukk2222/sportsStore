import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect, useSelector } from 'react-redux';
import { toastConfig, toastError } from '../../../components/toastCustom';
import ImagePickerComponent from '../Products/UploadImages';
import moment from 'moment'
import { createSale } from '../../../redux/reducers/Sale/createNewSale';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../constants';
import Loading from '../../../components/loading';
const ProductForm = (props) => {
    const {
        saleState,
        createSale
    } = props
    const { data, loading, error } = useSelector((state) => state.userData)
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        id_business: data?.id,
        discount: 0,
        started_at: new Date(),
        ended_at: new Date(),
        name: '',
        content: '',
        url: '',
    });


    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || formData.started_at;
            setShowStartDatePicker(false);
            setShowEndDatePicker(false);

            if (event.target === 'started_at') {
                setFormData({ ...formData, started_at: currentDate });
            } else if (event.target === 'ended_at') {
                setFormData({ ...formData, ended_at: currentDate });
            }
        } else {
            setShowStartDatePicker(false);
            setShowEndDatePicker(false);
        }
    };

    const handleInputChange = (field, value) => {
        console.log(field, value);
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {

        const startDate = moment(formData.started_at);
        const endDate = moment(formData.ended_at);
        // Kiểm tra hợp lệ trước khi xử lý
        if (!formData.name || !formData.content || formData.discount === '') {
            toastError('Cảnh báo', 'Bạn cần điền đủ các trường')
            return;
        }

        else if (endDate.isSameOrBefore(startDate)) {
            toastError('Cảnh báo', 'Ngày kết thúc phải sau ngày bắt đầu');
            return;
        }
        // Tiếp tục xử lý khi dữ liệu hợp lệ
        else {
            createSale(formData);
            navigation.navigate('Home');
        }
        console.log('Form data submitted:', formData);
    };
    if(loading)
    {
        <Loading/>
    }
    if(error)
    {
        toastError("Xin lỗi", "Đã có lỗi xảy ra với kết nối")
        return <Loading />;
    }
    // console.log(data?.id);
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.field}>ID Business {data?.id}</Text>
            <Text style={styles.field}>Mức giảm giá (từ 1% đến 100%)</Text>
            <TextInput
                style={styles.input}
                value={formData.discount.toString()}
                onChangeText={(value) => handleInputChange('discount', value)}
                keyboardType="numeric"

            />

            <Text style={styles.field}>Start Date</Text>
            <Button
                title={formData.started_at.toISOString().split('T')[0]}
                onPress={() => setShowStartDatePicker(true)}
            />
            {showStartDatePicker && (
                <DateTimePicker
                    value={formData.started_at}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) =>
                        handleDateChange({ type: 'set', target: 'started_at' }, selectedDate)
                    }
                />
            )}

            <Text style={styles.field}>End Date</Text>
            <Button
                title={formData.ended_at.toISOString().split('T')[0]}
                onPress={() => setShowEndDatePicker(true)}
            />
            {showEndDatePicker && (
                <DateTimePicker
                    value={formData.ended_at}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) =>
                        handleDateChange({ type: 'set', target: 'ended_at' }, selectedDate)
                    }
                />
            )}

            <Text style={styles.field}>Name</Text>
            <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
            />

            <Text style={styles.field}>Content</Text>
            <TextInput
                style={styles.input}
                value={formData.content}
                onChangeText={(value) => handleInputChange('content', value)}
                multiline
            />

            <Text style={styles.field}>URL</Text>
            {/* <TextInput
                style={styles.input}
                value={formData.url}
                onChangeText={(value) => handleInputChange('url', value)}
            /> */}
            <ImagePickerComponent onUrlChange={handleInputChange} isSale={true} />

            <TouchableOpacity onPress={handleSubmit}
                style={{
                    marginTop: 5,
                    height: 50,
                    width: 200,
                    backgroundColor: colors.facebook,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 20,
                }}
            >
                {saleState?.loadingSale ? <ActivityIndicator size="large" color={colors.success} /> :
                    <Text style={{ fontSize: 20, color: 'white', fontSize: 20, fontWeight: '500' }}>Tạo sự kiện</Text>}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        color: 'black'
    },
    field: {
        marginBottom: 10,
        padding: 2,
        color: 'black',
        fontWeight: '500',
        fontSize: 16

    }
});
const mapStateToProps = (state) => ({
    saleState: state.createNewSale
})
const mapDispatchToProps = {
    createSale
}

export default connect(mapStateToProps, { ...mapDispatchToProps })(ProductForm);
