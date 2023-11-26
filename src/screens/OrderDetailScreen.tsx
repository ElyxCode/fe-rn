import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {CustomNavBar} from '../components/CustomNavBar';
import {CurrentAddressButton} from '../components/CurrentAddressButton';
import {CurrentPaymentButton} from '../components/CurrentPaymentButton';
import {CurrentBillingButton} from '../components/CurrentBillingButton';
import {CurrentTotalOrder} from '../components/CurrentTotalOrder';
import {ProductListOrder} from '../components/ProductListOrder';

import {Order} from '../model/Order';

import {paymentMethodFormat} from '../utils/utilities';
import {colors} from '../styles/colors';
import {OrderStatus} from '../components/OrderStatus';

export const OrderDetailScreen = ({route}: any) => {
  const {order} = route.params;

  const [currentOrder] = useState<Order>(order);
  console.log({currentOrder});

  return (
    <SafeAreaView style={styles.container}>
      <CustomNavBar
        titleText={currentOrder.branch.name}
        primaryColorDefault={false}
      />
      <ScrollView style={{flex: 1}}>
        <View style={styles.orderStatusContainer}>
          <OrderStatus order={currentOrder} />
        </View>
        <View style={styles.orderDetailsContainer}>
          <Text style={styles.titleSection}>Detalle de la orden</Text>
          <View style={styles.addressPaymentBillingContainer}>
            <CurrentAddressButton
              isOrderDetail={true}
              addressName={currentOrder.address?.name}
              address={currentOrder.address?.address}
            />
            <CurrentPaymentButton
              isOrderDetail={true}
              paymentMethod={paymentMethodFormat(currentOrder)}
              paymentStatus={currentOrder.transaction?.status}
            />
            <CurrentBillingButton isOrderDetail={true} order={order} />
          </View>
          <View style={styles.productListOrder}>
            <Text style={styles.titleSection}>Productos</Text>
            {currentOrder.items.map(item => (
              <ProductListOrder
                key={item.id}
                quantity={item.quantity.toString()}
                productName={item.product.name}
                brand={item.product.brand.name}
                price={item.price}
              />
            ))}
          </View>
          <View style={styles.totalDetailOrderContainer}>
            <CurrentTotalOrder
              subtotal={currentOrder.subtotal}
              deliveryTotal={currentOrder.delivery}
              discount={currentOrder.discount}
              totalAmount={currentOrder.total}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryColor,
  },
  orderStatusContainer: {
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  orderDetailsContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.PrimaryBackgroundColor,
  },
  addressPaymentBillingContainer: {
    rowGap: 15,
  },
  titleSection: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.PrimaryTextColor,
    paddingVertical: 25,
  },
  productListOrder: {},
  totalDetailOrderContainer: {
    paddingBottom: 30,
  },
});
