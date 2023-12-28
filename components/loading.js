import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingModal = ({ isLoading }) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isLoading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={isLoading} color="#fff" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default LoadingModal;
