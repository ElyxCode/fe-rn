import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import LocationIcon from '../assets/location.svg';
import {colors} from '../styles/colors';

type CurrentAddressButtonProps = {
  addressName?: string;
  address?: string;
  onPress?: () => void;
};

export const CurrentAddressButton = ({
  addressName,
  address,
  onPress,
}: CurrentAddressButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LocationIcon height={24} width={24} />
        </View>
        <View style={styles.addressDescriptionContainer}>
          <Text
            style={styles.addressDescriptionText}
            numberOfLines={1}
            lineBreakMode="tail">
            {addressName}
          </Text>
          <Text
            style={styles.addressDescriptionText}
            numberOfLines={1}
            lineBreakMode="tail">
            {address}
          </Text>
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
