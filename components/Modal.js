import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

const ModalPoup = ({ visible, children, onClose }) => {
  const [showModal, setShowModal] = useState(!visible); // Sử dụng local state

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setShowModal(!showModal);
    // if (visible) {
      toggleModal();
    // }
  }, [visible]); 

  const toggleModal = () => {
    setShowModal(!showModal);
    Animated.spring(translateY, {
      toValue: showModal ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleBackdropPress = () => {
    onClose();
  };

  const handleInnerPress = () => {
    // Do nothing on inner press
  };

  return (
    <Modal transparent visible={showModal} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.modalBackGround}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [
                  {
                    translateY: translateY.interpolate({
                      inputRange: [0, 1],
                      outputRange: [600, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableWithoutFeedback onPress={handleInnerPress}>
              <View>{children}</View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 20,
    // alignItems: 'center',
  }
});

export default ModalPoup;
