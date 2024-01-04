
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

export const ChooseOptionModal = ({ visible, onClose, onSelectOption }) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => onClose()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={async () => await onSelectOption('QR MOMO')}>
              <Text style={styles.optionText}>QR MOMO</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => await onSelectOption('ATM Debit')}>
              <Text style={styles.optionText}>ATM Debit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClose()}>
              <Text style={styles.closeButton}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    optionText: {
      // fontWeight:600,
      color:'black',
      fontSize: 18,
      marginVertical: 10,
    },
    closeButton: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'red',
      marginTop: 20,
    },
  });
    