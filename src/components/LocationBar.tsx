import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import GpsIcon from '../assets/location.svg';

import {colors} from '../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {isAndroid} from '../constants/Platform';
import {MapFlow} from '../screens/MapConfirmationScreen';
import {useAppSelector} from '../hooks/useRedux';

type locationProps = {
  name: string;
};

export const LocationBar = ({name}: locationProps) => {
  const token = useAppSelector(state => state.authToken.token);
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.container, {borderRadius: isAndroid ? 30 : 20}]}>
      <View style={styles.addressContainer}>
        <GpsIcon fill={colors.PrimaryColor} />
        <Text style={styles.addressText} lineBreakMode="tail" numberOfLines={1}>
          {name}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.changeAddressContainer}
        onPress={() => {
          if (!token) {
            navigation.navigate('MapConfirmationScreen', {
              mapFlow: MapFlow.HomeFlow,
            });
          } else {
            navigation.navigate('AddressNavigation' as never);
          }
        }}>
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
    width: 250,
  },
  changeAddressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.SecondaryTextColor,
  },
});
