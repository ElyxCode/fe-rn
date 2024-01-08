import React from 'react';

import {Pressable, StyleSheet, Text, View} from 'react-native';

import ReceiptIcon from '../assets/receipt_edit.svg';
import ArrowRightIcon from '../assets/arrow_right_blue.svg';

import {colors} from '../styles/colors';
import {BillEntity, BillType, Order, Transaction} from '../model/Order';

type CurrentBillingButtonProps = {
  isOrderDetail?: boolean;
  billType?: string;
  billEntity?: string;
  dui?: string;
  iva?: string;
  onPress?: () => void;
};

type BillingFormatRenderProps = {
  //transaction?: Transaction | null;
  bill_type: string;
  bill_entity: string;
  dui: string;
  iva: string;
};

export const CurrentBillingButton = ({
  isOrderDetail = false,
  billType,
  billEntity,
  iva,
  dui,
  onPress,
}: CurrentBillingButtonProps) => {
  const BillingFormatRender = ({
    bill_type,
    bill_entity,
    dui,
    iva,
  }: BillingFormatRenderProps) => {
    return (
      <>
        {bill_type === 'final' ? (
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
              {bill_entity === 'natural' ? 'Natural' : 'Jurídica'}
            </Text>
            {bill_entity === 'natural' ? (
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
              {billType === 'final' ? 'Consumidor final' : 'Crédito fiscal'}
            </Text>
          ) : (
            <BillingFormatRender
              bill_type={billType ?? ''}
              bill_entity={billEntity ?? ''}
              dui={dui ?? ''}
              iva={iva ?? ''}
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
