import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import BestSellersList from "./BestSellersList";
import { fetchMostSoldProduct, resetFindMostSoldProduct } from "../../../redux/reducers/Statistic/findMostSoldProduct";
import { connect, useDispatch, useSelector } from "react-redux";
import LoadingModal from "../../../components/loading";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../constants";
const TopProduct = (props) => {
    const dispatch = useDispatch()
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [desc, setDesc] = useState(0);
    const [state, setState] = useState(0);
    const { data, loading, error } = useSelector((state) => state.userData)
    const navigation = useNavigation();

    const [dataPro, setDataPro] = useState([])
    const {
        fetchMostSoldProduct,
        findMostSoldProductState
    } = props
    const [totalPage, setTotalPage] = useState(0)
    useEffect(() => {
        fetchMostSoldProduct(data?.id, state, page, pageSize, desc);
        return () => {
            dispatch(resetFindMostSoldProduct())
        }
    }, [data, page, pageSize, desc, state])
    useEffect(() => {
        //  if (findMostSoldProductState?.dataFindMostSoldProduct) {
        setDataPro(findMostSoldProductState?.dataFindMostSoldProduct?.content);
        setTotalPage(findMostSoldProductState?.dataFindMostSoldProduct?.totalPages);
        //  console.log('dataPro', findMostSoldProductState?.dataFindMostSoldProduct?.content);
        //}
    }, [findMostSoldProductState?.dataFindMostSoldProduct])

    const handleNextPage = () => {

        if (page + 1 <= totalPage) {

            setPage(page + 1)
            console.log('Go to the next page');
        }

    };

    const handlePrevPage = () => {
        // Xử lý sự kiện chuyển trang lui
        if (page > 0) {
            setPage(page - 1)
            console.log('Go to the previous page');
        }
    };
    if (findMostSoldProductState?.loadingFindMostSoldProduct) {
        return <LoadingModal />
    }
    if (findMostSoldProductState?.errorFindMostSoldProduct) {
        navigation.goBack()
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PaperProvider>
                <View>
                    <View style={{ padding: 15 }}>
                        <BestSellersList dataPro={dataPro} />

                    </View>

                </View>

            </PaperProvider>
            <View style={styles.navigation}>
                <TouchableOpacity
                    style={page === 0 ? styles.disableButton : styles.button}
                    disabled={page > 0 ? false : true}
                    onPress={handlePrevPage}
                >
                    <Text style={{ color: 'white', fontWeight: '500' }}>Trước</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={page + 1 >= totalPage ? styles.disableButton : styles.button}
                    disabled={page + 1 >= totalPage ? true : false}
                    onPress={handleNextPage}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Sau</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 10,

    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '38%', // Đặt chiều rộng của nút
    },
    disableButton: {
        backgroundColor: colors.xam,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '38%', // Đặt chiều rộng của nút
    }
})
const mapStateToProps = (state) => ({
    findMostSoldProductState: state.findMostSoldProduct
})
const mapDispatchToProps = {
    fetchMostSoldProduct
}
export default connect(mapStateToProps, { ...mapDispatchToProps })(TopProduct)
