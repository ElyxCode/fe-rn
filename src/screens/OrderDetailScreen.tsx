import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAppSelector} from '../hooks/useRedux';

import {LoaderScreen} from './LoaderScreen';

import {Order} from '../model/Order';

import {CustomNavBar} from '../components/CustomNavBar';
import {CurrentAddressButton} from '../components/CurrentAddressButton';
import {CurrentPaymentButton} from '../components/CurrentPaymentButton';
import {CurrentBillingButton} from '../components/CurrentBillingButton';
import {CurrentTotalOrder} from '../components/CurrentTotalOrder';
import {ProductListOrder} from '../components/ProductListOrder';
import {OrderStatus} from '../components/OrderStatus';
import {RatingViewComponent} from '../components/RatingViewComponent';

import {paymentMethodFormat} from '../utils/utilities';
import {colors} from '../styles/colors';

export const OrderDetailScreen = ({route}: any) => {
  const {order} = route.params;

  const [currentOrder] = useState<Order>(order);
  const [showReview, setShowReview] = useState<boolean>(
    Boolean(currentOrder.review),
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = useAppSelector(state => state.authToken.token);

  if (isLoading) return <LoaderScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <CustomNavBar
        titleText={currentOrder.branch.name}
        primaryColorDefault={false}
      />
      {currentOrder.state === 'entregado' && !showReview ? (
        <RatingViewComponent
          token={token}
          currentOrder={currentOrder}
          setShowReview={setShowReview}
        />
      ) : (
        <>
          <ScrollView style={{flex: 1}}>
            <View style={styles.orderStatusContainer}>
              <OrderStatus order={currentOrder} />
            </View>
            <View style={styles.orderDetailsContainer}>
              <Text style={styles.titleSection}>Detalle de la orden</Text>
              <View style={styles.addressPaymentBillingContainer}>
                <CurrentAddressButton
                  isOrderDetail={true}
                  address={currentOrder.address}
                />
                <CurrentPaymentButton
                  isOrderDetail={true}
                  paymentMethod={paymentMethodFormat(currentOrder)}
                  paymentStatus={currentOrder.transaction?.status}
                />
                <CurrentBillingButton
                  isOrderDetail={true}
                  billType={currentOrder.transaction?.bill_type ?? ''}
                  billEntity={currentOrder.transaction?.bill_entity ?? ''}
                  dui={currentOrder.transaction?.dui ?? ''}
                  iva={currentOrder.transaction?.iva ?? ''}
                />
              </View>
              <View style={styles.productListOrder}>
                <Text style={styles.titleSection}>Productos</Text>
                {currentOrder.items !== null &&
                currentOrder.items.length !== 0 ? (
                  currentOrder.items.map(item => (
                    <ProductListOrder
                      key={item.id}
                      quantity={item.quantity.toString()}
                      productName={item.product.name}
                      brand={item.product.brand.name}
                      price={item.price}
                    />
                  ))
                ) : (
                  <View style={styles.noProductTextContainer}>
                    <Text>No tienes productos</Text>
                  </View>
                )}
                {}
              </View>
              <View style={styles.totalDetailOrderContainer}>
                <CurrentTotalOrder
                  isOrderDetail={true}
                  subtotal={currentOrder.subtotal}
                  deliveryTotal={currentOrder.delivery}
                  discount={currentOrder.discount}
                  totalAmount={currentOrder.total}
                  specialDiscount={currentOrder.special_discount}
                  subtotalWithDiscount={currentOrder.subtotal_with_discount}
                />
              </View>
            </View>
          </ScrollView>
        </>
      )}
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
    paddingTop: 25,
    paddingBottom: 5,
  },
  productListOrder: {},
  totalDetailOrderContainer: {
    paddingBottom: 30,
  },
  noProductTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
});
