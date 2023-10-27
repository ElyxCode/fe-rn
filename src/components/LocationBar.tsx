import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import GpsIcon from '../assets/location.svg';

import {colors} from '../styles/colors';
import { useNavigation } from '@react-navigation/native';

type locationProps={
    name:string
}

export const LocationBar = ({name}:locationProps) => {
 const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.addressContainer}>
        <GpsIcon fill={colors.PrimaryColor} />
        <Text style={styles.addressText}>{name}</Text>
      </View>
      <TouchableOpacity style={styles.changeAddressContainer} onPress={() => {navigation.navigate('MapConfirmationScreen' as never) }}>
        <Text style={styles.changeAddressText}>Cambiar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.White,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20, // todo: agregar 30 en android con validacion
    marginHorizontal: 10,
    marginBottom: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  changeAddressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.Black,
  },
  changeAddressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.SecondaryTextColor,
  },
});
