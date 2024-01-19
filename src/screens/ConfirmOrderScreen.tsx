import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';

import useAwaitableComponent from 'use-awaitable-component';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {
  Order,
  OrderCreateErrorResponse,
  OrderCreateResponse,
  OrderRequestDTO,
} from '../model/Order';
import {Quote, QuoteResponse, QuoteResponseError} from '../model/Quote';
import {BillInfo} from '../model/BillInfo';
import {Card, ValidationCardError, ValidationCardResponse} from '../model/Card';

import {quoteService} from '../services/quote';
import {getCardsService, validationCardService} from '../services/card/card';
import {createOrderService, getOrderByIdService} from '../services/order/order';
import {
  clearCard,
  clearCardConfirmAdded,
  setCard,
} from '../services/card/cardSlice';
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
import {PhoneRequiredModal} from '../components/PhoneRequiredModal';

import Messages from '../constants/Messages';
import {billFormatOrderRequest} from '../helpers/billFormatOrderRequest';
import {showServiceErrors} from '../helpers/showServiceErrors';
import {colors} from '../styles/colors';

export type TempCardExpDate = {
  month: string;
  year: string;
};

export type DiscountCode = {
  code: string;
  valid: boolean;
};

export const ConfirmOrderScreen = ({navigation}: any) => {
  const productsCart = useAppSelector(state => state.productsCart);
  const currentAddress = useAppSelector(state => state.currentAddress);
  const currentCard = useAppSelector(state => state.currentCard.card);
  const recentCardAdded = useAppSelector(
    state => state.currentCard.cardConfirmAdded,
  );
  const currentUser = useAppSelector(state => state.user.userData);
  const orderUserPhoneTemp = useAppSelector(
    state => state.user.orderUserPhoneTemp?.phoneNumber,
  );
  const orderUserBillingTemp = useAppSelector(
    state => state.user.orderUserBillingTemp?.billingInfo,
  );
  const token = useAppSelector(state => state.authToken.token);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quoteError, setQuoteError] = useState<string>('');
  const [visibleCardExpValErrorModal, setVisibleCardExpValErrorModal] =
    useState<boolean>(false);
  const [phoneRequiredModal, setPhoneRequiredModal] = useState<boolean>(false);
  const [showDistanceDiscount, setShowDistanceDiscount] =
    useState<boolean>(true);
  const [callAddressButton, setCallAddressButton] = useState<boolean>(true);

  const [branchName, setBranchName] = useState<string>('');

  const [discountCode, setDiscountCode] = useState<DiscountCode>({
    code: '',
    valid: false,
  });
  const [quoteData, setQuoteData] = useState<QuoteResponse>(
    {} as QuoteResponse,
  );

  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();

  const [status, execute, resolve, reject, reset] = useAwaitableComponent();
  const showModal = status === 'awaiting';

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
    if (
      currentCard.last_numbers === alterPaymentMethod.transferencia ||
      currentCard.last_numbers === alterPaymentMethod.efectivo
    )
      return;
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
    calculateQuote();
  }, [isFocused, discountCode.code]);

  const calculateQuote = async () => {
    if (!isFocused) return;

    setIsLoading(true);

    const quote: Quote = {
      branchId:
        productsCart.products[
          productsCart.products.length - 1
        ].branch.id.toString(),
      addressId: currentAddress.address.id.toString(),
      discountCode: discountCode.code,
      products: productsCart.products,
    };

    const response = await quoteService(quote);
    if (response.ok) {
      if ((response.data as QuoteResponseError).errors) {
        setQuoteError((response.data as QuoteResponseError).errors.address_id);
        setQuoteData({} as QuoteResponse);
        setIsLoading(false);
        return;
      }
      setDiscountCode({
        ...discountCode,
        valid: (response.data as QuoteResponse).coupon_valid,
      });
      setQuoteData(response.data as QuoteResponse);
      setQuoteError('');

      if (callAddressButton && isFocused) {
        await freeShipping(response.data as QuoteResponse);
      }
    }
    setIsLoading(false);
  };

  const freeShipping = async (quoteResponse: QuoteResponse) => {
    // if (!quoteResponse.special_discount) return;

    if (
      Number(
        productsCart.products[productsCart.products.length - 1].branch
          .distance_for_free,
      ) !== 0
    ) {
      if (quoteResponse.special_discount) {
        await handleFreeShippingAlert(Messages.freeShippingForDistanceMessage);
        return;
      }

      if (
        quoteResponse.coupon_valid &&
        Number(quoteResponse.distance) <=
          Number(
            productsCart.products[productsCart.products.length - 1].branch
              .distance_for_free,
          ) &&
        showDistanceDiscount
      ) {
        await handleFreeShippingAlert(
          Messages.freeShippingWithTwoPromotionsMessage,
        );
        setShowDistanceDiscount(false);
        return;
      }

      if (quoteResponse.coupon_valid) {
        setShowDistanceDiscount(false);
        return;
      }

      await handleFreeShippingAlert(Messages.notFreeShippingForDistanceMessage);
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
      return Boolean((response?.data as ValidationCardResponse).valid);
    } else {
      return response?.data as ValidationCardError;
    }
  };

  const confirmOrder = async () => {
    if (orderUserPhoneTemp === undefined || orderUserPhoneTemp.length === 0) {
      setPhoneRequiredModal(true);
      return;
    }

    if (currentCard.last_numbers === alterPaymentMethod.transferencia) {
      transferFlow();
      return;
    }

    if (currentCard.last_numbers === alterPaymentMethod.efectivo) {
      cashFlow();
      return;
    }

    if (
      currentCard !== undefined &&
      recentCardAdded !== undefined &&
      currentCard.id === recentCardAdded.id &&
      currentCard.last_numbers === recentCardAdded.last_numbers
    ) {
      await cardFlow(recentCardAdded.month ?? '', recentCardAdded.year ?? '');
    } else {
      const result = await handleCardExpDateValidationModal();

      if (String(result).length === 0) return;

      const validationCard = await cardValidation(
        currentCard.id.toString(),
        String(result).split('/')[0],
        String(result).split('/')[1],
      );

      if ((validationCard as ValidationCardError).error) {
        const AsyncAlert = async () =>
          new Promise(resolve => {
            Alert.alert(
              Messages.titleMessage,
              (validationCard as ValidationCardError).error,
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
        return;
      }

      if (!validationCard) {
        setVisibleCardExpValErrorModal(true);
        return;
      }
      await cardFlow(
        String(result).split('/')[0] ?? '',
        String(result).split('/')[1] ?? '',
      );
    }
  };

  const transferFlow = () => {
    navigation.navigate('TransferScreen', {
      quoteData: quoteData,
      billing: orderUserBillingTemp,
      discountCode,
      phoneNumber: orderUserPhoneTemp ?? currentUser.phone ?? '',
    });
  };

  const cashFlow = async () => {
    setIsLoading(true);
    const orderRequest: OrderRequestDTO = {
      addressId: currentAddress.address.id,
      branchId: productsCart.products[0].branch.id,
      products: productsCart.products,
      couponCode: discountCode.code,
      method: 'cash',
      billInfo: billFormatOrderRequest(
        orderUserBillingTemp ?? ({} as BillInfo),
      ),
      phone: orderUserPhoneTemp ?? currentUser.phone ?? '',
    };

    await createOrder(orderRequest);
    setIsLoading(false);
  };

  const cardFlow = async (month: string, year: string) => {
    setIsLoading(true);
    const orderRequest: OrderRequestDTO = {
      addressId: currentAddress.address.id,
      branchId: productsCart.products[0].branch.id,
      products: productsCart.products,
      couponCode: discountCode.code,
      method: 'card',
      cardId: currentCard.id.toString(),
      card: currentCard,
      billInfo: billFormatOrderRequest(
        orderUserBillingTemp ?? ({} as BillInfo),
      ),
      phone: orderUserPhoneTemp ?? '',
      cardMonth: month,
      cardYear: year,
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
    } else {
      if ((response.data as OrderCreateErrorResponse).errors) {
        showServiceErrors((response.data as OrderCreateErrorResponse).errors);
        return;
      }

      const AsyncAlert = async () =>
        new Promise(resolve => {
          Alert.alert(
            Messages.titleMessage,
            Messages.UnAvailableServerMessage,
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
    }
  };

  const handlePromotionCode = (text: string) => {
    setDiscountCode({...discountCode, code: text});
  };

  const handleFreeShippingAlert = async (description: string) => {
    const AsyncAlert = async () =>
      new Promise(resolve => {
        Alert.alert(
          Messages.titleMessage,
          description,
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
  };

  const clearData = (method: string) => {
    if (method === 'card') {
      dispatch(clearProduct());
      dispatch(clearOrderUserBillingTemp());
      dispatch(clearOrderUserPhoneTemp());
      dispatch(clearCardConfirmAdded());
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
            onPress={() => {
              setCallAddressButton(true);
              navigation.navigate('AddressNavigation');
            }}
          />
          <CurrentPaymentButton
            paymentName={currentCard.last_numbers}
            onPress={() => {
              setCallAddressButton(false);
              navigation.navigate('CardNavigation', {
                screen: 'CardsScreen',
                params: {confirmOrder: true},
              });
            }}
          />
          <CurrentBillingButton
            billInfo={orderUserBillingTemp ?? ({} as BillInfo)}
            onPress={() => {
              setCallAddressButton(false);
              navigation.navigate('BillingInfoModal', {
                billingData: orderUserBillingTemp ?? ({} as BillInfo),
              });
            }}
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
                price={item.sale_price}
              />
            ))
          ) : (
            <View style={styles.noProductTextContainer}>
              <Text>No tienes productos</Text>
            </View>
          )}
          <AddProductButton
            text="Agregar producto"
            onPress={() => {
              navigation.navigate('BranchConfirmOrderNavigation', {
                screen: 'BranchDetailScreen',
                params: {
                  branchId:
                    productsCart.products[productsCart.products.length - 1]
                      .branch.id,
                },
              });
            }}
          />
        </View>
        {quoteError.length !== 0 && (
          <View style={styles.quoteErrorContainer}>
            <Text style={styles.quoteErrorText}>{quoteError}</Text>
          </View>
        )}
        <View style={styles.promotionCodeContainer}>
          <PromotionCodeButton
            promotionCode={discountCode.code}
            onPress={() => {
              setCallAddressButton(true);
              navigation.navigate('PromoCodeModal', {
                setPromotionCode: (text: string) => handlePromotionCode(text),
              });
            }}
            onPressDelete={() => {
              setDiscountCode({code: '', valid: false});
              setCallAddressButton(true);
              setShowDistanceDiscount(true);
            }}
            validPromotionCode={discountCode.valid}
          />
        </View>
        <View style={styles.totalInfoContainer}>
          <CurrentTotalOrder
            subtotal={quoteData.subtotal ?? 0}
            subtotalWithDiscount={quoteData.subtotal_with_discount ?? 0}
            totalAmount={quoteData.total ?? 0}
            specialDiscount={quoteData.special_discount ?? 0}
            discount={quoteData.discount ?? 0}
            deliveryTotal={quoteData.transport ?? 0}
            discountCode={discountCode.code}
            hasDiscount={discountCode.valid}
            discountAmount={quoteData.promo}
          />
        </View>
      </ScrollView>
      <CreditCardValidationModal
        onSubmit={resolve}
        onCancel={reject}
        visible={showModal}
        lastNumber={currentCard.last_numbers}
      />
      <CreditCardValidationErrorModal
        visible={visibleCardExpValErrorModal}
        setIsVisible={setVisibleCardExpValErrorModal}
      />
      <PhoneRequiredModal
        visible={phoneRequiredModal}
        setIsVisible={setPhoneRequiredModal}
      />
      <SubmitButton
        textButton="Confirmar pedido"
        activeOpacity={
          currentAddress.address === undefined ||
          currentCard.last_numbers === undefined
            ? 1
            : 0.9
        }
        customStyles={{
          marginHorizontal: 35,
          marginBottom: 10,
          backgroundColor:
            currentAddress.address === undefined ||
            currentCard.last_numbers === undefined ||
            quoteError.length !== 0
              ? colors.disbledButtonColor
              : colors.PrimaryColor,
        }}
        onPress={() => {
          if (
            currentAddress.address === undefined ||
            currentCard.last_numbers === undefined ||
            quoteError.length !== 0
          )
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
  quoteErrorText: {
    color: colors.RedColor,
    fontSize: 16,
  },
  quoteErrorContainer: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
