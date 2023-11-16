import React from 'react';
import { colors } from '../constants/index'
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loading = () => (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={colors.primary} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

export default Loading;