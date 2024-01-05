import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import CallIcon from '../assets/call.svg';
import ArrowRightIcon from '../assets/arrow_right_blue.svg';

import {colors} from '../styles/colors';

type CurrentPhoneButtonProp = {
  onPress?: () => void;
  phoneNumber: string;
};

export const CurrentPhoneButton = ({
  onPress,
  phoneNumber = '',
}: CurrentPhoneButtonProp) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <CallIcon height={24} width={24} />
        </View>
        <View style={styles.phoneDescription}>
          <Text style={styles.phoneDescriptionText}>
            Información de contacto
          </Text>
          <Text style={styles.phoneDescriptionText}>{phoneNumber}</Text>
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
  phoneDescription: {
    flex: 1,
    rowGap: 8,
  },
  phoneDescriptionText: {
    fontSize: 12,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-Medium',
  },
});
