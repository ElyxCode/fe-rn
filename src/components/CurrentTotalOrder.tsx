import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/colors';

type CurrentTotalOrderProps = {
  isOrderDetail?: boolean;
  subtotal?: string;
  deliveryTotal?: string;
  discount?: string;
  totalAmount: string;
  specialDiscount: boolean;
  subtotalWithDiscount?: string;
};

export const CurrentTotalOrder = ({
  isOrderDetail = false,
  subtotal,
  deliveryTotal,
  discount,
  totalAmount,
  specialDiscount,
  subtotalWithDiscount,
}: CurrentTotalOrderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.totalTextContainer}>
        {subtotalWithDiscount !== null &&
        subtotalWithDiscount !== undefined &&
        Number(subtotal) > Number(subtotalWithDiscount) ? (
          <>
            <Text style={styles.totalLabelText}>Subtotal</Text>
            <View style={styles.totalWithDiscountContainer}>
              <Text
                style={[
                  styles.totalText,
                  {textDecorationLine: 'line-through'},
                ]}>
                ${subtotal}
              </Text>
              <Text style={styles.totalText}>${subtotalWithDiscount}</Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.totalLabelText}>Subtotal</Text>
            <Text style={styles.totalText}>${subtotal}</Text>
          </>
        )}
      </View>
      <View style={styles.totalTextContainer}>
        {specialDiscount ? (
          <>
            <Text style={styles.totalLabelText}>Costo de envío</Text>
            <View style={styles.totalWithDiscountContainer}>
              <Text
                style={[
                  styles.totalText,
                  {textDecorationLine: 'line-through'},
                ]}>
                ${deliveryTotal}
              </Text>
              <Text style={styles.totalText}>$0.00</Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.totalLabelText}>Costo de envío</Text>
            <Text style={styles.totalText}>${deliveryTotal}</Text>
          </>
        )}
      </View>
      <View style={styles.totalTextContainer}>
        <Text style={styles.totalLabelText}>Ahorro</Text>
        <Text style={styles.totalText}>${discount}</Text>
      </View>
      <View style={styles.totalTextContainer}>
        <Text
          style={[
            styles.totalLabelText,
            {fontSize: 16, color: colors.PrimaryTextColor},
          ]}>
          Total
        </Text>
        <Text
          style={[
            styles.totalText,
            {fontSize: 16, color: colors.SecondaryTextColor},
          ]}>
          ${totalAmount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
    paddingHorizontal: 15,
  },
  totalTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabelText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: colors.DarkGrayColor,
  },
  totalWithDiscountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 8,
  },
  totalText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: colors.LightGrayColor,
  },
});
