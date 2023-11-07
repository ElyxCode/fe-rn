import React from 'react';

import {Pressable, StyleSheet, Text, View} from 'react-native';

import ReceiptIcon from '../assets/receipt_edit.svg';

import {colors} from '../styles/colors';
import {Order, Transaction} from '../model/Order';

type CurrentBillingButtonProps = {
  isOrderDetail?: boolean;
  currentBilling?: string;
  order?: Order;
  onPress?: () => void;
};

type BillingFormatRenderProps = {
  transaction?: Transaction | null;
};

const BillingFormatRender = ({transaction}: BillingFormatRenderProps) => {
  return (
    <>
      {transaction?.bill_type === 'final' ? (
        <>
          <Text
            style={styles.billingText}
            numberOfLines={1}
            lineBreakMode="tail">
            Consumidor final
          </Text>

          <Text
            style={styles.billingText}
            numberOfLines={1}
            lineBreakMode="tail">
            DUI: {transaction?.dui}
          </Text>
        </>
      ) : (
        <>
          <Text
            style={styles.billingText}
            numberOfLines={1}
            lineBreakMode="tail">
            Crédito fiscal
          </Text>

          <Text
            style={styles.billingText}
            numberOfLines={1}
            lineBreakMode="tail">
            Registro de IVA: {transaction?.iva}
          </Text>
          <Text
            style={styles.billingText}
            numberOfLines={1}
            lineBreakMode="tail">
            Tipo de Persona:{' '}
            {transaction?.bill_entity === 'natural' ? 'Natural' : 'Jurídica'}
          </Text>
          {transaction?.bill_entity === 'natural' ? (
            <Text
              style={styles.billingText}
              numberOfLines={1}
              lineBreakMode="tail">
              DUI: {transaction?.dui}
            </Text>
          ) : null}
        </>
      )}
    </>
  );
};

export const CurrentBillingButton = ({
  isOrderDetail = false,
  currentBilling,
  order,
  onPress,
}: CurrentBillingButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <ReceiptIcon height={24} width={24} />
        </View>
        <View style={styles.billingContainer}>
          <Text
            style={styles.billingText}
            numberOfLines={1}
            lineBreakMode="tail">
            Información de facturación
          </Text>
          {!isOrderDetail ? (
            <Text
              style={styles.billingText}
              numberOfLines={1}
              lineBreakMode="tail">
              {currentBilling}
            </Text>
          ) : (
            <BillingFormatRender transaction={order?.transaction} />
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
  billingContainer: {
    rowGap: 8,
  },
  billingText: {
    fontSize: 12,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-Medium',
  },
});
