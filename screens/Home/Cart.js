// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native';
import ItemCard from './itemCart';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DashedLine from 'react-native-dashed-line';

function Cart() {
  const [quantity, setQuantity] = useState();
  const [yourArray, setYourArray] = useState([1, 2, 3, 4, 5]);
  const elements = yourArray.map((item, index) => (
    <View key={index} style={{ marginVertical: 5, marginHorizontal: 10, borderRadius: 5, elevation: 1 }}>
      <ItemCard></ItemCard>
    </View>
  ));
  return <View style={styles.container}>
    <View style={styles.iconTop}>
      <View style={styles.iconBack}>
        <Icon
          onPress={() => navigation.navigate('home')}
          name="md-arrow-back"
          size={25}
        />
      </View>
    </View>
    <View style={styles.cartItem}>
      {/* <Image source={require('../../assets/Strawberry.png')} /> */}
      <View style={styles.cartSubItem}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: 240,
          }}>
          <Text style={{ color: '#16162E', fontSize: 16 }}>Strawberry</Text>
          <Icon color="#F8849E" name="close" size={25} />
        </View>
        <Text
          style={{
            fontSize: 14,
            color: '#6A6A79',
            marginTop: 5,
          }}>
          Weight : 1Kg
        </Text>
        <View style={styles.cartSubItem}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{ color: '#16162E', fontSize: 18, marginTop: 5 }}>
              $07.00
            </Text>
            <View style={styles.innerText}>
              <TouchableOpacity
                onPress={() => {
                  if (quantity === 0) {
                    setQuantity(0);
                  } else {
                    setQuantity(quantity - 1);
                  }
                }}>
                <View style={styles.iconBack}>
                  <Icon name="minus" size={25} color="#70BF7F" />
                </View>
              </TouchableOpacity>
              <Text style={{ fontSize: 20 }}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <View style={styles.iconBack}>
                  <Icon name="plus" size={25} color="#70BF7F" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
    <View style={styles.totalParent}>
      <View style={styles.total}>
        <Text style={styles.textHeading}>Total Items</Text>
        <Text style={{ fontWeight: 'bold' }}>4</Text>
      </View>
      <View style={styles.total}>
        <Text style={styles.textHeading}>Price</Text>

        <Text style={{ fontWeight: 'bold' }}>$ 73.50</Text>
      </View>
      <DashedLine
        style={styles.textHeading}
        dashColor="#8B8B97"
        dashLength={5}
      />
      <View style={styles.total}>
        <Text style={styles.textHeading}>Total Price</Text>
        <Text style={{ fontWeight: 'bold' }}>$ 73.50</Text>
      </View>
    </View>
    <TouchableOpacity>
      <View style={styles.checkoutBtn}>
        <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
          Checkout
        </Text>
      </View>
    </TouchableOpacity>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  iconTop: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 6,
    paddingRight: 6,
    marginTop: -60,
  },
  productCard: {
    height: 230,
    width: 166,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    marginTop: 10,
    borderRadius: 5,
  },
  iconBack: {
    backgroundColor: '#FFFFFF',
    padding: 3,
    elevation: 2,
    borderRadius: 5,
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  totalParent: {
    padding: 10,
    marginTop: 10,
    margin: 5,
  },
  checkoutBtn: {
    backgroundColor: '#40AA54',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
  },
  productContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingLeft: 7,
    paddingRight: 7,
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    padding: 10,
    elevation: 5,
    margin: 10,
  },
  cartSubItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  innerText: {
    display: 'flex',
    width: 130,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textHeading: {
    color: '#16162E',
    fontSize: 16,
    marginTop: 7,
  },
});

export default Cart;