import {Image, StyleSheet, Text, View} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import {ProductProps} from '../model/ProductProps';

import {colors} from '../styles/colors';
import {formatter} from '../utils/utilities';

export const ProductItemRender = ({
  product,
  navigation,
  setOpenModal,
}: ProductProps) => {
  return (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => {
        if (setOpenModal) {
          setOpenModal(true);
        }
        navigation.navigate('ProductDetailScreen', {
          ProductProps: {product, navigation},
        });
      }}>
      <View style={styles.imageProductContainer}>
        <Image source={{uri: product?.image}} style={{height: 80, width: 80}} />
      </View>
      <View style={styles.productInfoContainer}>
        <Text
          style={styles.productNameText}
          numberOfLines={1}
          lineBreakMode="tail">
          {product?.name ?? ''}
        </Text>
        <View style={styles.priceProductContainer}>
          <Text
            style={[
              styles.priceText,
              {
                textDecorationLine: product?.price_with_discount
                  ? 'line-through'
                  : 'none',
                color: product?.price_with_discount
                  ? colors.DarkGrayColor
                  : colors.PrimaryTextColor,
              },
            ]}>
            {formatter.format(Number(product?.price)) ?? ''}
          </Text>
          {product?.price_with_discount ? (
            <Text
              style={[
                styles.priceText,
                {
                  textDecorationLine: product.price_with_discount
                    ? 'none'
                    : 'line-through',
                  color: product.price_with_discount
                    ? colors.PrimaryTextColor
                    : colors.DarkGrayColor,
                },
              ]}>
              {formatter.format(Number(product?.price_with_discount)) ?? ''}
            </Text>
          ) : null}
        </View>
        <Text style={styles.brandText}>{product?.brand.name ?? ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    backgroundColor: colors.White,
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 5,
  },
  imageProductContainer: {
    height: 80,
  },
  productInfoContainer: {
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingVertical: 5,
    flex: 1,
  },
  productNameText: {
    fontSize: 12,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-Medium',
  },
  priceProductContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  priceText: {
    fontSize: 12,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-Medium',
  },
  brandText: {
    fontSize: 12,
    color: colors.PrimaryTextColor,
    fontFamily: 'Poppins-Medium',
  },
});
