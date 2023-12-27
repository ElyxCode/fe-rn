import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {
  setProductAmount,
  decrementProduct,
  incrementProduct,
  removeProduct,
} from '../services/product/productSlice';

import {Product} from '../model/product';

import {CustomNavBar} from '../components/CustomNavBar';
import {SubmitButton} from '../components/SubmitButton';

import TrashIcon from '../assets/trash_primary.svg';
import StepperAdd from '../assets/stepper_add_button.svg';
import StepperDecrement from '../assets/stepper_decrement_button.svg';

import Messages from '../constants/Messages';
import {isAndroid} from '../constants/Platform';
import {formatter} from '../utils/utilities';
import {colors} from '../styles/colors';
import {LoaderScreen} from './LoaderScreen';

type ProductItemRenderProps = {
  productItem: Product;
};

export const ShoppingCartScreen = () => {
  const productsCart = useAppSelector(state => state.productsCart);
  const [branchName, setBranchName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [exceedsStock, setExceedsStock] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setBranchName(
      productsCart.products[productsCart.products.length - 1].branch.name ?? '',
    );
  }, []);

  const ProductItemRender = ({productItem}: ProductItemRenderProps) => {
    const [itemAmount, setItemAmount] = useState<string>(
      productItem.quantity.toString() ?? '1',
    );
    const handleItemAmount = (value: number) => {
      if (value === 0 || value < 1) {
        setItemAmount('1');
        value = 1;
      }

      setExceedsStock(productStockValidation(Number(itemAmount)));

      dispatch(
        setProductAmount({
          product: productItem,
          itemAmount: value,
        }),
      );
    };

    const productStockValidation = (amountProduct: number) => {
      if (amountProduct > productItem.stock) {
        Alert.alert(
          Messages.titleMessage,
          Messages.exceededProductStockMessage + productItem.stock,
          [{text: Messages.okButton}],
        );
        return true;
      }
      return false;
    };

    return (
      <View style={styles.productContainer}>
        <View style={{rowGap: 10}}>
          <View style={styles.amountItemContainer}>
            <TextInput
              value={itemAmount.toString()}
              onChangeText={text => {
                setItemAmount(() => {
                  return text
                    .replace('-', '')
                    .replace(' ', '')
                    .replace(',', '')
                    .replace('.', '');
                });
              }}
              onEndEditing={({nativeEvent: {text}}) =>
                handleItemAmount(Number(text))
              }
              style={styles.textInput}
              keyboardType={isAndroid ? 'numeric' : 'number-pad'}
            />
          </View>

          <View style={styles.stepperContainer}>
            <StepperDecrement
              height={13}
              width={13}
              onPress={() => {
                setExceedsStock(productStockValidation(Number(itemAmount) - 1));
                dispatch(decrementProduct(productItem.id));
              }}
            />
            <StepperAdd
              height={13}
              width={13}
              onPress={() => {
                if (productStockValidation(Number(itemAmount) + 1)) return;
                dispatch(incrementProduct(productItem.id));
              }}
            />
          </View>
        </View>
        <View style={styles.productDescriptionContainer}>
          <Text style={styles.descriptionText}>{productItem.name}</Text>
          <Text style={styles.descriptionText}>
            {formatter.format(
              productItem.price_with_discount
                ? Number(productItem.price_with_discount)
                : Number(productItem.price),
            )}
          </Text>
          <Text style={[styles.descriptionText, {fontSize: 12}]}>
            {productItem.brand.name}
          </Text>
        </View>
        <View style={styles.deleteIconContainer}>
          <TrashIcon
            height={24}
            width={24}
            onPress={() => dispatch(removeProduct(productItem.id))}
          />
        </View>
      </View>
    );
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar titleText={branchName} />
      <ScrollView style={styles.container}>
        <View style={styles.productsListContainer}>
          {productsCart.products.map(item => (
            <ProductItemRender key={item.id} productItem={item} />
          ))}
        </View>
        <View style={styles.subtotalContainer}>
          <Text style={[styles.subtotalText, {color: colors.PrimaryTextColor}]}>
            Subtotal
          </Text>
          <Text
            style={[styles.subtotalText, {color: colors.SecondaryTextColor}]}>
            {formatter.format(Number(productsCart.totalValue))}
          </Text>
        </View>
      </ScrollView>
      <SubmitButton
        onPress={() => {
          if (exceedsStock || productsCart.products.length === 0) return;
          console.log('continuo');
        }}
        textButton="Pagar"
        activeOpacity={
          exceedsStock || productsCart.products.length === 0 ? 1 : 0.9
        }
        customStyles={{
          marginHorizontal: 20,
          marginBottom: 20,
          backgroundColor:
            exceedsStock || productsCart.products.length === 0
              ? colors.disbledButtonColor
              : colors.PrimaryColor,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  subtotalText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  productsListContainer: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: colors.White,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  amountItemContainer: {
    backgroundColor: colors.lightBackgroundColor,
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDescriptionContainer: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'space-between',
    rowGap: 5,
  },
  descriptionText: {
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
  deleteIconContainer: {
    paddingRight: 10,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
  },
  textInput: {
    textAlign: 'center',
  },
});
