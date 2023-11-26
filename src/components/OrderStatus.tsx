import React, {useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Order} from '../model/Order';

import OrderConfirmIcon from '../assets/order_confirm.svg';
import OrderDeliveredIcon from '../assets/order_delivered.svg';
import OrderNoDeliveredIcon from '../assets/order_nodelivered.svg';
import OrderOnWayIcon from '../assets/order_ontheway.svg';
import OrderPreparingIcon from '../assets/order_preparing.svg';
import OrderRecieved from '../assets/order_recieved.svg';
import OrderTransportAssigmentIcon from '../assets/order_transport_assigment.svg';

import {colors} from '../styles/colors';

let orderStatusDescription = [
  {
    status: 'creado',
    label: 'Orden recibida',
    icon: OrderRecieved,
    message:
      'Espera la confirmación para visualizar la fecha de entrega estimada.',
  },
  {
    status: 'aceptado',
    label: 'Orden confirmada',
    icon: OrderConfirmIcon,
    message: 'Fecha estimada de entrega ',
  },
  {
    status: 'preparando',
    label: 'En proceso de preparación',
    icon: OrderPreparingIcon,
    message: 'Fecha estimada de entrega',
  },
  {
    status: 'asignado',
    label: 'Transporte asignado ',
    icon: OrderTransportAssigmentIcon,
    message: '',
  },
  {
    status: 'camino',
    label: 'Orden en camino',
    icon: OrderOnWayIcon,
    message: 'Fecha estimada de entrega',
  },
  {
    status: 'entregado',
    label: 'Orden entregada',
    icon: OrderDeliveredIcon,
    message: '',
  },
  {
    status: 'cancelado|rechazado',
    label: 'Orden no entregada',
    icon: OrderNoDeliveredIcon,
    message: '',
  },
  // {
  //   status: 'rechazado',
  //   label: 'Orden no entregada',
  //   icon: OrderNoDeliveredIcon,
  //   message: 'Motivo',
  // },
];

type OrderStatusProps = {
  order?: Order;
};

export const OrderStatus = ({order}: OrderStatusProps) => {
  return (
    <View style={styles.container}>
      {orderStatusDescription.map(item =>
        order?.state === item.status ||
        order?.state === item.status.split('|')[0] ||
        order?.state === item.status.split('|')[1] ? (
          <item.icon
            key={item.status}
            height={85}
            width={85}
            style={{marginBottom: 20}}
          />
        ) : null,
      )}
      {orderStatusDescription.map(item => (
        <View key={item.status}>
          {order?.state === item.status ||
          order?.state === item.status.split('|')[0] ||
          order?.state === item.status.split('|')[1] ? (
            <View>
              <View style={styles.orderStatusTextContainer}>
                <View style={styles.circle}></View>
                <Text
                  style={[
                    styles.orderStatusText,
                    {fontSize: 24, paddingBottom: 5},
                  ]}>
                  {item.label}
                </Text>
              </View>
              <Text style={[styles.orderStatusMessageText, {paddingBottom: 3}]}>
                {item.message}
                <Text style={[styles.orderStatusMessageText]}>
                  {order?.cancellation_reason}
                </Text>
              </Text>
            </View>
          ) : item.status !== 'entregado' ? (
            order?.state === 'entregado' &&
            item.status.split('|')[1] === 'rechazado' &&
            item.status.split('|')[0] === 'cancelado' ? null : (
              <View style={styles.orderStatusTextContainer}>
                <View style={[styles.circle, {opacity: 0.1}]}></View>
                <Text style={[styles.orderStatusText, {opacity: 0.3}]}>
                  {item.label}
                </Text>
              </View>
            )
          ) : (
            item.status !== 'entregado' && null
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PrimaryColor,
    paddingBottom: 10,
  },
  orderStatusTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    paddingVertical: 8,
  },
  orderStatusText: {
    color: colors.White,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  orderStatusMessageText: {
    color: colors.SecondaryTextColor,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    paddingLeft: 22,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 14 / 2,
    backgroundColor: colors.White,
  },
});
