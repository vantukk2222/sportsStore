import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSize, images } from '../../constants/index';
import { fetchCategories } from '../../redux/reducers/Caregory/getAllCategories';
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../components/loading";

const ListProductByCategory = ({ route, navigation }) => {
    const { item } = route.params;
    console.log(item)
}
export default ListProductByCategory