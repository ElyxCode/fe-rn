import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/colors';

export const CartButton = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <View style={styles.containerButton}>
          <Text style={styles.cartText}>Ver carrito</Text>
          <Text style={styles.cartText}>(1) •</Text>
          <Text style={styles.cartText}>$500</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    backgroundColor: colors.PrimaryColor,
    marginVertical: 8,
    paddingVertical: 13,
    borderRadius: 10,
    justifyContent: 'center',
    columnGap: 5,
  },
  cartText: {
    color: colors.White,
    fontSize: 16,
  },
});
