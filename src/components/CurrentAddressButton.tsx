import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import LocationIcon from '../assets/location.svg';
import {colors} from '../styles/colors';

type CurrentAddressButtonProps = {
  currentAddressName?: string;
  currentAddress?: string;
  addressName?: string;
  address?: string;
  isOrderDetail?: boolean;
  onPress?: () => void;
};

export const CurrentAddressButton = ({
  currentAddressName,
  currentAddress,
  addressName,
  address,
  isOrderDetail = false,
  onPress,
}: CurrentAddressButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LocationIcon height={24} width={24} />
        </View>
        <View style={styles.addressDescriptionContainer}>
          {currentAddressName !== undefined || currentAddress !== undefined ? (
            <>
              <Text
                style={styles.addressDescriptionText}
                numberOfLines={1}
                lineBreakMode="tail">
                {isOrderDetail ? addressName : currentAddressName}
              </Text>
              <Text
                style={styles.addressDescriptionText}
                numberOfLines={1}
                lineBreakMode="tail">
                {isOrderDetail ? address : currentAddress}
              </Text>
            </>
          ) : (
            <Text
              style={styles.addressDescriptionText}
              numberOfLines={1}
              lineBreakMode="tail">
              Agregar Dirección
            </Text>
          )}
        </View>
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
  addressDescriptionContainer: {
    rowGap: 8,
  },
  addressDescriptionText: {
    fontSize: 12,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-Medium',
  },
});
