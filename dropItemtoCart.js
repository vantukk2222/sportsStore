import React, { useRef } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import loginPage from './API/Login/loginAPI';

const DropProductToCart = () => {
  const dropAnimation = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const cartScale = useRef(new Animated.Value(1)).current;

  const dropProductToCart = () => {
    {loginPage('test48','test').then(data =>{
      console.log("LOGIN test OK nha e:\n", data)
    })}
    Animated.sequence([
      Animated.timing(dropAnimation, {
        toValue: { x: 200, y: 400 },
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cartScale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(cartScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={dropProductToCart}>
        <View style={styles.product} />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.cart,
          {
            transform: [{ scale: cartScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.product,
          {
            transform: dropAnimation.getTranslateTransform(),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  product: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    position: 'absolute',
    top: 50,
    left: 50,
  },
  cart: {
    width: 80,
    height: 80,
    borderRadius: 5,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 50,
    right: 50,
  },
});

export default DropProductToCart;
