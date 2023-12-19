import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../styles/colors';
import {formatter} from '../utils/utilities';

type CartButtonProps = {
  itemAmount: number;
  totalAmount: number;
};

export const CartButton = ({itemAmount, totalAmount}: CartButtonProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('ShoppingCartScreen' as never)}>
        <View style={styles.containerButton}>
          <Text style={styles.cartText}>Ver carrito</Text>
          <Text style={styles.cartText}>({itemAmount}) •</Text>
          <Text style={styles.cartText}>
            {formatter.format(Number(totalAmount.toFixed(2)))}
          </Text>
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
