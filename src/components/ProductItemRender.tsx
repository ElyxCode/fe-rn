import { ProductProps } from "../model/ProductProps";
import {Image, StyleSheet, Text, View} from 'react-native'
import { colors } from "../styles/colors";
export const ProductItemRender = ({
    id,
    image,
    productName,
    normalPrice,
    specialPrice,
    brandProduct,
  }: ProductProps) => {
    return (
      <View style={styles.productContainer}>
        <View style={styles.imageProductContainer}>
          <Image source={{uri: image}} style={{height: 80, width: 80}} />
        </View>
        <View style={styles.productInfoContainer}>
          <Text
            style={styles.productNameText}
            numberOfLines={1}
            lineBreakMode="tail">
            {productName}
          </Text>
          <View style={styles.priceProductContainer}>
            <Text
              style={[
                styles.priceText,
                {
                  textDecorationLine: specialPrice ? 'line-through' : 'none',
                  color: specialPrice
                    ? colors.DarkGrayColor
                    : colors.PrimaryTextColor,
                },
              ]}>
              ${normalPrice}
            </Text>
            {specialPrice ? (
              <Text
                style={[
                  styles.priceText,
                  {
                    textDecorationLine: specialPrice ? 'none' : 'line-through',
                    color: specialPrice
                      ? colors.PrimaryTextColor
                      : colors.DarkGrayColor,
                  },
                ]}>
                ${specialPrice}
              </Text>
            ) : null}
          </View>
          <Text style={styles.brandText}>{brandProduct}</Text>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        backgroundColor: colors.White,
        borderRadius: 10,
        marginHorizontal: 20,
        padding: 5,
      },imageProductContainer: {
        height: 80,
      }, productInfoContainer: {
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingVertical: 5,
        width: 250,
      },productNameText: {
        
        fontSize: 12,
        color: colors.DarkGrayColor,
        fontFamily: 'Poppins-Medium',
      },priceProductContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
      }, priceText: {
        fontSize: 12,
        color: colors.DarkGrayColor,
        fontFamily: 'Poppins-Medium',
      },
      brandText: {
        fontSize: 12,
        color: colors.PrimaryTextColor,
        fontFamily: 'Poppins-Medium',
      },
  })