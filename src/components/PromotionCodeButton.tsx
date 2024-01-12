import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CardsIcon from '../assets/cards_primary.svg';
import ArrowRightIcon from '../assets/arrow_right_blue.svg';
import {colors} from '../styles/colors';

type PromotionCodeButtonProps = {
  onPress?: () => void;
  promotionCode: string;
};

export const PromotionCodeButton = ({
  onPress,
  promotionCode,
}: PromotionCodeButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <CardsIcon height={24} width={24} />
        </View>
        <View style={styles.promoCodeDescription}>
          <Text style={styles.promoCodeDescriptionText}>
            {promotionCode.length === 0 && 'Código promocional'}
          </Text>
        </View>
        <ArrowRightIcon height={25} width={25} />
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
});