import React from 'react';
import { colors } from '../constants/index'
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loading = () => (
    <View style={[styles.container, styles.horizontal]}>
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#E3E3E3', // Độ trong suốt của màu đen
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Loading;
