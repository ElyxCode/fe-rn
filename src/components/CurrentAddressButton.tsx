import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {Address} from '../model/Address';

import LocationIcon from '../assets/location.svg';
import ArrowRightIcon from '../assets/arrow_right_blue.svg';

import {colors} from '../styles/colors';

type CurrentAddressButtonProps = {
  address: Address | undefined;
  isOrderDetail?: boolean;
  onPress?: () => void;
};

export const CurrentAddressButton = ({
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
          {isOrderDetail ? (
            address?.address !== undefined || address?.name !== undefined ? (
              <>
                <Text
                  style={styles.addressDescriptionText}
                  numberOfLines={1}
                  lineBreakMode="tail">
                  {address.name}
                </Text>
                <Text
                  style={styles.addressDescriptionText}
                  numberOfLines={1}
                  lineBreakMode="tail">
                  {address.address}
                </Text>
              </>
            ) : (
              <Text
                style={styles.addressDescriptionText}
                numberOfLines={1}
                lineBreakMode="tail">
                Agregar Dirección
              </Text>
            )
          ) : (
            <>
              <Text
                style={styles.addressDescriptionText}
                numberOfLines={1}
                lineBreakMode="tail">
                Dirección
              </Text>
              <Text
                style={styles.addressDescriptionText}
                numberOfLines={1}
                lineBreakMode="tail">
                {address?.address}
              </Text>
            </>
          )}
        </View>
        {!isOrderDetail ? <ArrowRightIcon height={25} width={25} /> : null}
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
    flex: 1,
    rowGap: 8,
  },
  addressDescriptionText: {
    fontSize: 12,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-Medium',
  },
});
