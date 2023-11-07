import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/colors';

type CurrentTotalOrderProps = {
  isOrderDetail?: boolean;
  subtotal?: string;
  deliveryTotal?: string;
  discount?: string;
  totalAmount: string;
};

export const CurrentTotalOrder = ({
  isOrderDetail = false,
  subtotal,
  deliveryTotal,
  discount,
  totalAmount,
}: CurrentTotalOrderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.totalTextContainer}>
        <Text style={styles.totalLabelText}>Subtotal</Text>
        <Text style={styles.totalText}>${subtotal}</Text>
      </View>
      <View style={styles.totalTextContainer}>
        <Text style={styles.totalLabelText}>Costo de envío</Text>
        <Text style={styles.totalText}>${deliveryTotal}</Text>
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
    rowGap: 5,
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
  totalText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: colors.LightGrayColor,
  },
});
