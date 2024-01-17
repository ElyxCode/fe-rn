import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useAwaitableComponent from 'use-awaitable-component';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {useIsFocused} from '@react-navigation/native';

import {
  Order,
  OrderCreateErrorResponse,
  OrderCreateResponse,
  OrderRequestDTO,
} from '../model/Order';
import {Quote, QuoteResponse} from '../model/Quote';
import {BillInfo} from '../model/BillInfo';
import {Card} from '../model/Card';

import {quoteService} from '../services/quote';
import {getCardsService, validationCardService} from '../services/card/card';
import {createOrderService, getOrderByIdService} from '../services/order/order';
import {clearCard, setCard} from '../services/card/cardSlice';
import {clearProduct} from '../services/product/productSlice';
import {
  clearOrderUserBillingTemp,
  clearOrderUserPhoneTemp,
  setOrderUserBillingTemp,
  setOrderUserPhoneTemp,
} from '../services/user/userSlice';

import {LoaderScreen} from './LoaderScreen';
import {alterPaymentMethod} from './CardsScreen';

import {CustomNavBar} from '../components/CustomNavBar';
import {CurrentAddressButton} from '../components/CurrentAddressButton';
import {CurrentPaymentButton} from '../components/CurrentPaymentButton';
import {CurrentBillingButton} from '../components/CurrentBillingButton';
import {ProductListOrder} from '../components/ProductListOrder';
import {AddProductButton} from '../components/AddProductButton';
import {SubmitButton} from '../components/SubmitButton';
import {CurrentPhoneButton} from '../components/CurrentPhoneButton';
import {PromotionCodeButton} from '../components/PromotionCodeButton';
import {CurrentTotalOrder} from '../components/CurrentTotalOrder';
import {CreditCardValidationModal} from '../components/CreditCardValidationModal';
import {CreditCardValidationErrorModal} from '../components/CreditCardValidationErrorModal';

import Messages from '../constants/Messages';
import {billFormatOrderRequest} from '../helpers/billFormatOrderRequest';
import {showServiceErrors} from '../helpers/showServiceErrors';
import {colors} from '../styles/colors';

export type tempCardExpDate = {
  month: string;
  year: string;
};

export const ConfirmOrderScreen = ({navigation}: any) => {
  const productsCart = useAppSelector(state => state.productsCart);
  const currentAddress = useAppSelector(state => state.currentAddress);
  const currentCard = useAppSelector(state => state.currentCard);
  const currentUser = useAppSelector(state => state.user.userData);
  const orderUserPhoneTemp = useAppSelector(
    state => state.user.orderUserPhoneTemp?.phoneNumber,
  );
  const orderUserBillingTemp = useAppSelector(
    state => state.user.orderUserBillingTemp?.billingInfo,
  );
  const token = useAppSelector(state => state.authToken.token);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleCardExpValErrorModal, setVisibleCardExpValErrorModal] =
    useState<boolean>(false);

  const [branchName, setBranchName] = useState<string>('');
  const [tempMonthYearCard, setTempMonthYearCard] = useState<tempCardExpDate>(
    {} as tempCardExpDate,
  );

  const [discountCode, setDiscountCode] = useState<string>('');
  const [quoteData, setQuoteData] = useState<QuoteResponse>(
    {} as QuoteResponse,
  );

  const [currentPayment, setCurrentPayment] = useState<string>(
    currentCard.active ? currentCard.last_numbers : '',
  );

  const dispatch = useAppDispatch();

  const [status, execute, resolve, reject, reset] = useAwaitableComponent();
  const showModal = status === 'awaiting';

  const isFocused = useIsFocused();

  useEffect(() => {
    setBranchName(
      productsCart.products[productsCart.products.length - 1].branch.name ?? '',
    );
  }, []);

  useEffect(() => {
    if (orderUserBillingTemp === undefined) {
      const bill: BillInfo = {
        bill_type: currentUser.bill_type ?? '',
        bill_entity: currentUser.bill_entity ?? '',
        dui: currentUser.dui ?? '',
        iva: currentUser.iva ?? '',
      };
      dispatch(setOrderUserBillingTemp({billingInfo: bill}));
    }
  }, []);

  useEffect(() => {
    if (orderUserPhoneTemp === undefined ?? orderUserPhoneTemp?.length === 0) {
      dispatch(setOrderUserPhoneTemp({phoneNumber: currentUser.phone ?? ''}));
    }
  }, []);

  useEffect(() => {
    if (currentCard.id === -1) {
      setIsLoading(true);
      const getCards = async () => {
        const resp = await getCardsService(token);

        dispatch(
          setCard((resp.data?.find(i => i.active) as Card) ?? ({} as Card)),
        );
      };
      getCards();
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    calculateQuote();
    console.log('called quote');

    setIsLoading(false);
  }, [currentAddress.address]);

  const calculateQuote = async () => {
    const quote: Quote = {
      branchId:
        productsCart.products[
          productsCart.products.length - 1
        ].branch.id.toString(),
      addressId: currentAddress.address.id.toString(),
      discountCode: discountCode,
      products: productsCart.products,
    };

    const response = await quoteService(quote);
    if (response.ok) {
      setQuoteData(response.data as QuoteResponse);
    }
  };

  const handleCardExpDateValidationModal = async () => {
    try {
      return await execute();
    } catch (err) {
      return err;
    } finally {
      reset();
    }
  };

  const cardValidation = async (
    cardId: string,
    cardMonth: string,
    cardYear: string,
  ) => {
    const response = await validationCardService(
      token,
      cardId,
      cardMonth,
      cardYear,
    );
    if (response.ok) {
      return Boolean(response?.data['valid']);
    }
    return false;
  };

  const confirmOrder = async () => {
    if (orderUserPhoneTemp === undefined || orderUserPhoneTemp.length === 0) {
      navigation.navigate('PhoneNumberModal');
      return;
    }

    if (currentCard.last_numbers === alterPaymentMethod.transferencia) {
      navigation.navigate('TransferScreen', {
        quoteData: quoteData,
        billing: orderUserBillingTemp,
        discountCode,
        phoneNumber: orderUserPhoneTemp ?? currentUser.phone ?? '',
      });
      return;
    }

    if (currentCard.last_numbers === alterPaymentMethod.efectivo) {
      setIsLoading(true);
      const orderRequest: OrderRequestDTO = {
        addressId: currentAddress.address.id,
        branchId: productsCart.products[0].branch.id,
        products: productsCart.products,
        couponCode: discountCode,
        method: 'cash',
        billInfo: billFormatOrderRequest(
          orderUserBillingTemp ?? ({} as BillInfo),
        ),
        phone: orderUserPhoneTemp ?? currentUser.phone ?? '',
      };

      await createOrder(orderRequest);
      setIsLoading(false);
      return;
    }

    const result = await handleCardExpDateValidationModal();
    if (String(result).length === 0) return;
    const validationCard = await cardValidation(
      currentCard.id.toString(),
      String(result).split('/')[0],
      String(result).split('/')[1],
    );
    if (!validationCard) {
      setVisibleCardExpValErrorModal(true);
      return;
    }

    setIsLoading(true);
    const orderRequest: OrderRequestDTO = {
      addressId: currentAddress.address.id,
      branchId: productsCart.products[0].branch.id,
      products: productsCart.products,
      couponCode: discountCode,
      method: 'card',
      cardId: currentCard.id.toString(),
      card: currentCard,
      billInfo: billFormatOrderRequest(
        orderUserBillingTemp ?? ({} as BillInfo),
      ),
      phone: orderUserPhoneTemp ?? '',
      cardMonth: String(result).split('/')[0] ?? '',
      cardYear: String(result).split('/')[1] ?? '',
    };

    await createOrder(orderRequest);
    setIsLoading(false);
  };

  const createOrder = async (orderRequest: OrderRequestDTO) => {
    const response = await createOrderService(token, orderRequest);
    if (response.ok) {
      if ((response.data as OrderCreateErrorResponse).errors) {
        showServiceErrors((response.data as OrderCreateErrorResponse).errors);
        setIsLoading(false);
        return;
      }

      if ((response.data as OrderCreateResponse).order.state === 'rechazado') {
        const AsyncAlert = async () =>
          new Promise(resolve => {
            Alert.alert(
              Messages.titleMessage,
              (response.data as OrderCreateResponse).order
                .cancellation_reason ?? '',
              [
                {
                  text: Messages.okButton,
                  onPress: () => {
                    resolve('YES');
                  },
                },
              ],
              {cancelable: false},
            );
          });

        await AsyncAlert();
        setIsLoading(false);
        return;
      }

      const AsyncAlert = async () =>
        new Promise(resolve => {
          Alert.alert(
            orderRequest.method === 'cash'
              ? Messages.orderCreatedSuccessMessage
              : Messages.orderCreatedSuccessTitle,
            orderRequest.method === 'cash'
              ? Messages.orderCreatedSuccessCashMessage
              : Messages.orderCreatedSuccessMessage,
            [
              {
                text: Messages.okButton,
                onPress: () => {
                  resolve('YES');
                },
              },
            ],
            {cancelable: false},
          );
        });

      await AsyncAlert();

      const resp = await getOrderByIdService(
        token,
        (response.data as OrderCreateResponse).order.id.toString(),
      );

      clearData(orderRequest.method);

      navigation.navigate('OrderDetailScreen', {
        order: resp.data as Order,
        navigationPath: 'HomeNavigation',
        resetRootNavigation: true,
        isOrderCreated: true,
      });
    }
  };

  const clearData = (method: string) => {
    if (method === 'card') {
      dispatch(clearProduct());
      dispatch(clearOrderUserBillingTemp());
      dispatch(clearOrderUserPhoneTemp());
    } else {
      dispatch(clearProduct());
      dispatch(clearCard());
      dispatch(clearOrderUserBillingTemp());
      dispatch(clearOrderUserPhoneTemp());
    }
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar titleText={branchName} />
      <ScrollView style={styles.container}>
        <View style={styles.infoUserContainer}>
          <CurrentAddressButton
            address={currentAddress.address}
            onPress={() => navigation.navigate('AddressNavigation')}
          />
          <CurrentPaymentButton
            paymentName={currentCard.last_numbers}
            onPress={() =>
              navigation.navigate('CardNavigation', {
                screen: 'CardsScreen',
                params: {confirmOrder: true},
              })
            }
          />
          <CurrentBillingButton
            billInfo={orderUserBillingTemp ?? ({} as BillInfo)}
            onPress={() =>
              navigation.navigate('BillingInfoModal', {
                billingData: orderUserBillingTemp ?? ({} as BillInfo),
              })
            }
          />
          <CurrentPhoneButton
            phoneNumber={orderUserPhoneTemp ?? currentUser.phone ?? ''}
            onPress={() => navigation.navigate('PhoneNumberModal')}
          />
        </View>
        <View style={styles.productsContainer}>
          <Text style={styles.titleSection}>Productos</Text>
          {productsCart.products !== null &&
          productsCart.products.length !== 0 ? (
            productsCart.products.map(item => (
              <ProductListOrder
                key={item.id}
                quantity={item.quantity.toString()}
                productName={item.name}
                brand={item.brand.name}
                price={item.price}
              />
            ))
          ) : (
            <View style={styles.noProductTextContainer}>
              <Text>No tienes productos</Text>
            </View>
          )}
          <AddProductButton text="Agregar producto" />
        </View>
        <View style={styles.promotionCodeContainer}>
          <PromotionCodeButton promotionCode={discountCode} />
        </View>
        <View style={styles.totalInfoContainer}>
          <CurrentTotalOrder
            subtotal={quoteData.subtotal}
            subtotalWithDiscount={quoteData.subtotal_with_discount}
            totalAmount={quoteData.total}
            specialDiscount={quoteData.special_discount}
            discount={quoteData.discount}
            deliveryTotal={quoteData.transport}
          />
        </View>
      </ScrollView>
      <CreditCardValidationModal
        onSubmit={resolve}
        onCancel={reject}
        visible={showModal}
        lastNumber={currentCard.last_numbers}
        setTempMonthYearCard={setTempMonthYearCard}
      />
      <CreditCardValidationErrorModal
        visible={visibleCardExpValErrorModal}
        setIsVisible={setVisibleCardExpValErrorModal}
      />

      <SubmitButton
        textButton="Confirmar pedido"
        activeOpacity={
          currentAddress.address === undefined || currentCard.id === -1
            ? 1
            : 0.9
        }
        customStyles={{
          marginHorizontal: 35,
          marginBottom: 10,
          backgroundColor:
            currentAddress.address === undefined || currentCard.id === -1
              ? colors.disbledButtonColor
              : colors.PrimaryColor,
        }}
        onPress={() => {
          if (currentAddress.address === undefined || currentCard.id === -1)
            return;
          confirmOrder();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoUserContainer: {
    paddingHorizontal: 25,
    rowGap: 10,
  },
  productsContainer: {
    paddingHorizontal: 25,
  },
  titleSection: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: colors.PrimaryTextColor,
    paddingTop: 25,
    paddingBottom: 5,
  },
  noProductTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
  promotionCodeContainer: {
    paddingHorizontal: 25,
    marginVertical: 10,
  },
  totalInfoContainer: {
    paddingHorizontal: 25,
    marginBottom: 10,
  },
});
