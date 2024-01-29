import {Route, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {CustomNavBar} from '../components/CustomNavBar';
import {StepperComponent} from '../components/StepperComponent';
import {SubmitButton} from '../components/SubmitButton';

import {addProduct, clearProduct} from '../services/product/productSlice';

import {Product} from '../model/product';

import {processDescription} from '../helpers/processDescription';

import Messages from '../constants/Messages';
import {colors} from '../styles/colors';

export const ProductDetailScreen = ({route, navigation}: any) => {
  const {product}: {product: Product} = route.params.ProductProps;
  const descriptionItems = processDescription(product.description);
  const [itemCount, setItemCount] = useState(1);
  const isLoggedIn = useAppSelector(state => state.authToken.isLoggedIn);
  const productsCart = useAppSelector(state => state.productsCart);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  console.log({product});
  useEffect(() => {
    if (!isLoggedIn && isFocused) {
      dispatch(clearProduct());
    }
  }, [isFocused]);

  const showDiferentBranchMessage = async (): Promise<boolean> => {
    const AsyncAlert = async () =>
      new Promise(resolve => {
        Alert.alert(
          Messages.titleMessage,
          Messages.orderStartedMessage,
          [
            {
              text: 'Si',
              onPress: () => resolve('si'),
            },
            {
              text: 'No',
              onPress: () => resolve('no'),
            },
          ],
          {cancelable: false, onDismiss: () => 'no'},
        );
      });

    if ((await AsyncAlert()) === 'si') {
      return true;
    }

    return false;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: product.image}}
            height={162}
          />
        </View>
        <View style={styles.screenContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.brandName}>{product.brand.name}</Text>

          <Text
            style={{
              fontSize: 14,
              color: colors.DarkGrayColor,
              fontFamily: 'Poppins-Medium',
            }}>
            Descripción
          </Text>
          <View>
            {descriptionItems.map((item, index) => (
              <Text style={styles.description} key={index}>
                *{item}
              </Text>
            ))}
          </View>

          <View style={styles.stepper}>
            <StepperComponent
              itemCount={itemCount}
              setItemCount={setItemCount}
              product={product}></StepperComponent>
          </View>

          <View style={styles.submitButton}>
            <SubmitButton
              textButton="Agregar al carrito"
              onPress={async () => {
                if (!isLoggedIn) {
                  navigation.navigate('SignInNavigation');
                  dispatch(
                    addProduct({
                      product,
                      itemAmount: itemCount,
                    }),
                  );
                } else {
                  if (
                    productsCart.products.length !== 0 &&
                    product.branch.id !==
                      productsCart.products[productsCart.products.length - 1]
                        .branch.id
                  ) {
                    const choice = await showDiferentBranchMessage();
                    if (choice) {
                      dispatch(clearProduct());
                    } else {
                      return;
                    }
                  }
                  if (itemCount > product.stock) {
                    Alert.alert(
                      Messages.titleMessage,
                      Messages.exceededProductStockMessage + product.stock,
                      [{text: Messages.okButton}],
                    );
                    return;
                  }
                  dispatch(
                    addProduct({
                      product,
                      itemAmount: itemCount,
                    }),
                  );
                  navigation.goBack();
                }
              }}></SubmitButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  screenContainer: {
    paddingHorizontal: 40,
    flex: 1,
  },
  imageContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  image: {
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: colors.DarkGrayColor,
    paddingTop: 10,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: colors.PrimaryColor,
  },
  brandName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: colors.PrimaryColor,
  },
  description: {
    fontSize: 12,
    color: colors.DarkGrayColor,
  },
  submitButton: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  stepper: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 30,
  },
});
