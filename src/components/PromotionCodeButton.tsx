import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CardsIcon from '../assets/cards_primary.svg';
import ArrowRightIcon from '../assets/arrow_right_blue.svg';
import TrashIcon from '../assets/trash_primary.svg';
import {colors} from '../styles/colors';

type PromotionCodeButtonProps = {
  onPress?: () => void;
  onPressDelete?: () => void;
  promotionCode: string;
  validPromotionCode: boolean;
};

export const PromotionCodeButton = ({
  onPress,
  promotionCode,
  onPressDelete,
  validPromotionCode,
}: PromotionCodeButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <CardsIcon height={24} width={24} />
        </View>
        <View style={styles.promoCodeDescription}>
          <Text style={styles.promoCodeDescriptionText}>
            Código promocional
          </Text>
          {promotionCode ? (
            <>
              <Text style={styles.promoCodeDescriptionText}>
                {promotionCode}
              </Text>
              {!validPromotionCode && promotionCode && (
                <Text style={styles.promoCodeErrorText}>
                  Código de descuento inválido
                </Text>
              )}
            </>
          ) : null}
        </View>
        {promotionCode ? (
          <Pressable onPress={onPressDelete}>
            <TrashIcon height={25} width={25} />
          </Pressable>
        ) : (
          <ArrowRightIcon height={25} width={25} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: colors.White,
    alignItems: 'center',
    padding: 17,
  },
  logoContainer: {
    height: 24,
    paddingRight: 23,
  },
  promoCodeDescription: {
    flex: 1,
    rowGap: 8,
  },
  promoCodeDescriptionText: {
    fontSize: 12,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-Medium',
  },
  promoCodeErrorText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: colors.RedColor,
  },
});
