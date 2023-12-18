import {Route} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CustomNavBar} from '../components/CustomNavBar';
import {StepperComponent} from '../components/StepperComponent';
import {SubmitButton} from '../components/SubmitButton';
import {processDescription} from '../helpers/processDescription';
import {Product} from '../model/product';
import {ProductProps} from '../model/ProductProps';
import {colors} from '../styles/colors';
import {useAppDispatch} from '../hooks/useRedux';
import {addProduct} from '../services/product/productSlice';

export const ProductDetailScreen = ({route, navigation}: any) => {
  const {product}: {product: Product} = route.params.ProductProps;
  console.log({product});
  const descriptionItems = processDescription(product.description);
  const [itemCount, setItemCount] = useState(1);
  const dispatch = useAppDispatch();

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
              onPress={() => {
                dispatch(
                  addProduct({
                    product,
                    itemAmount: itemCount,
                  }),
                );
                navigation.goBack();
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
