import React from 'react';

import {Pressable, StyleSheet, Text, View} from 'react-native';

import ReceiptIcon from '../assets/receipt_edit.svg';
import ArrowRightIcon from '../assets/arrow_right_blue.svg';

import {colors} from '../styles/colors';
import {BillEntity, BillType, Order, Transaction} from '../model/Order';
import {BillInfo} from '../model/BillInfo';

type CurrentBillingButtonProps = {
  isOrderDetail?: boolean;
  billInfo: BillInfo;
  onPress?: () => void;
};

export const CurrentBillingButton = ({
  isOrderDetail = false,
  billInfo,
  onPress,
}: CurrentBillingButtonProps) => {
  const BillingFormatRender = ({billType, billEntity, dui, iva}: BillInfo) => {
    return (
      <>
        {billType === 'final' ? (
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
              DUI: {dui}
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
              Registro de IVA: {iva}
            </Text>
            <Text
              style={styles.billingText}
              numberOfLines={1}
              lineBreakMode="tail">
              Tipo de Persona:{' '}
              {billEntity === 'natural' ? 'Natural' : 'Jurídica'}
            </Text>
            {billEntity === 'natural' ? (
              <Text
                style={styles.billingText}
                numberOfLines={1}
                lineBreakMode="tail">
                DUI: {dui}
              </Text>
            ) : null}
          </>
        )}
      </>
    );
  };

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
              {billInfo.billType === 'final'
                ? 'Consumidor final'
                : 'Crédito fiscal'}
            </Text>
          ) : (
            <BillingFormatRender
              billType={billInfo.billType ?? ''}
              billEntity={billInfo.billEntity ?? ''}
              dui={billInfo.dui ?? ''}
              iva={billInfo.iva ?? ''}
            />
          )}
        </View>
        {!isOrderDetail ? <ArrowRightIcon height={25} width={25} /> : null}
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
    flex: 1,
    rowGap: 8,
  },
  billingText: {
    fontSize: 12,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-Medium',
  },
});
