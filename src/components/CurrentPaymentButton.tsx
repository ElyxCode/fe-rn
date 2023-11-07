import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import PaymentIcon from '../assets/cards_primary.svg';

import {colors} from '../styles/colors';

type CurrentPaymentButtonProps = {
  paymentName?: string;
  payment?: string;
  onPress?: () => void;
  isOrderDetail?: boolean;
  paymentMethod?: string;
  paymentStatus?: string;
};

export const CurrentPaymentButton = ({
  isOrderDetail = false,
  paymentStatus,
  paymentMethod,
  paymentName,
  payment,
  onPress,
}: CurrentPaymentButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <PaymentIcon height={24} width={24} />
        </View>
        <View style={styles.addressDescriptionContainer}>
          {!isOrderDetail ? (
            <>
              <Text
                style={styles.addressDescriptionText}
                numberOfLines={1}
                lineBreakMode="tail">
                {paymentName}
              </Text>
              <Text
                style={styles.addressDescriptionText}
                numberOfLines={1}
                lineBreakMode="tail">
                {payment}
              </Text>
            </>
          ) : (
            <>
              <Text
                style={styles.addressDescriptionText}
                numberOfLines={1}
                lineBreakMode="tail">
                {'Método de pago'}
              </Text>
              <Text
                style={styles.addressDescriptionText}
                numberOfLines={1}
                lineBreakMode="tail">
                {paymentMethod} - {paymentStatus}
              </Text>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: colors.White,
    alignItems: 'center',
    padding: 17,
  },
  logoContainer: {
    height: 24,
    paddingRight: 23,
  },
  addressDescriptionContainer: {
    rowGap: 8,
  },
  addressDescriptionText: {
    fontSize: 12,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-Medium',
  },
});
