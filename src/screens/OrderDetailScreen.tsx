import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, BackHandler} from 'react-native';
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
import {isAndroid} from '../constants/Platform';

export const OrderDetailScreen = ({navigation, route}: any) => {
  const {order, navigationPath, resetRootNavigation, isOrderCreated} =
    route.params;

  const [currentOrder] = useState<Order>(order);
  const [showReview, setShowReview] = useState<boolean>(
    Boolean(currentOrder.review),
  );

  console.log(currentOrder.coupon_discount);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = useAppSelector(state => state.authToken.token);

  // previene backbutton del dispositivo android solo cuando la orden se a creado.
  useEffect(() => {
    if (!isOrderCreated) return;
    if (isAndroid) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );
      return () => backHandler.remove();
    }
  }, []);

  // previene back swipe del dispositivo ios solo cuando la orden se a creado.
  useEffect(() => {
    if (!isOrderCreated) return;
    if (!isAndroid) {
      navigation.setOptions({gestureEnabled: false});
    }
  }, []);

  if (isLoading) return <LoaderScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <CustomNavBar
        titleText={currentOrder.branch.name}
        primaryColorDefault={false}
        navigationPath={navigationPath}
        resetRootNavigation={resetRootNavigation}
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
                  billInfo={{
                    bill_entity: currentOrder.transaction?.bill_entity ?? '',
                    bill_type: currentOrder.transaction?.bill_type ?? '',
                    dui: currentOrder.transaction?.dui ?? '',
                    iva: currentOrder.transaction?.iva ?? '',
                  }}
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
                  discountAmount={currentOrder.coupon_discount}
                  hasDiscount={Number(currentOrder.coupon_discount) > 0}
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
