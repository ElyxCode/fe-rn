import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors} from '../styles/colors';
import {formatter} from '../utils/utilities';

type ProductListOrderProps = {
  quantity?: string;
  productName?: string;
  brand?: string;
  price?: string;
};

export const ProductListOrder = ({
  quantity,
  productName,
  brand,
  price,
}: ProductListOrderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>
      <View style={styles.productDescriptionContainer}>
        <Text style={styles.productDescriptionText} lineBreakMode="clip">
          {productName}
        </Text>
        <Text style={styles.productDescriptionText}>
          {formatter.format(Number(price))}
        </Text>
        <Text style={[styles.productDescriptionText, {fontSize: 12}]}>
          {brand}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.White,
    alignItems: 'center',
    borderRadius: 10,
    padding: 17,
    marginBottom: 15,
  },
  quantityContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    backgroundColor: colors.PrimaryBackgroundColor,
  },
  quantityText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: colors.PrimaryTextColor,
  },
  productDescriptionContainer: {
    paddingHorizontal: 23,
    rowGap: 10,
  },
  productDescriptionText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: colors.DarkGrayColor,
  },
});
