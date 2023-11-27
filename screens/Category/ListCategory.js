
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';


import { colors, fontSize } from '../../constants/index';
import { fetchCategories } from '../../redux/reducers/Caregory/getAllCategories';
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../components/loading";
import { useNavigation } from '@react-navigation/native';


// faker.seed(10);

// const data = [...Array(20).keys()].map(() => ({
//     key: faker.datatype.uuid(),
//     job: faker.animal.crocodilia(),
// }));

const _colors = {
    active: `#FCD259ff`,
    inactive: `#FCD25900`,
};
const _spacing = 10;

const ListCategory = () => {
    const dispatch = useDispatch();
    const { dataCate, loadingCate, errorCate } = useSelector((state) => state.categories);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    useEffect(() => {
        setCategories(dataCate);

    }, [dataCate])

    const navigation = useNavigation();
    const ref = useRef(null);
    const [index, setIndex] = useState(0);
    const [viewPosition, setViewPosition] = useState(0)

    useEffect(() => {
        if (categories.length > 0) {
            ref.current?.scrollToIndex({
                index,
                animated: true,
                viewOffset: viewPosition === 0.5 || viewPosition === 1 ? 0 : _spacing,
                viewPosition: 0.5 // percentage from the viewport starting from left handSide 
            });
        }

    }, [index, categories, viewPosition]);
    if (loadingCate) {
        return <Loading />
    }

    return (


        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 5, }}>
            {/* // <<<<<<< categoryDat */}

            {/* // ======= */}
            {/* //             {console.log(categories.length)} */}
            {/* // >>>>>>> NewD */}
            <FlatList
                ref={ref}
                initialScrollIndex={index}
                style={{ flexGrow: 0, marginBottom: 5 }}
                data={categories}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingLeft: _spacing }}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item, index: fIndex }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('ListProductByCategory', {
                                item: item,
                            });
                            setIndex(fIndex)
                        }}>
                            <View
                                style={{
                                    marginRight: _spacing,
                                    padding: _spacing,
                                    borderWidth: 2,
                                    borderColor: colors.denNhe,
                                    borderRadius: 12,
                                    backgroundColor: fIndex === index ? colors.orgC1 : colors.inactives
                                }}>
                                <Text style={{ color: '#36303F', fontWeight: '700', fontSize: fontSize.h3, }}>
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />

        </View>
    );
}
export default ListCategory;
