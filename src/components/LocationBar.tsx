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
  const isLoggedIn = useAppSelector(state => state.authToken.isLoggedIn);
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
          if (!isLoggedIn) {
            navigation.navigate('MapConfirmationScreen', {
              mapFlow: MapFlow.HomeFlow,
            });
          } else {
            navigation.navigate('AddressNavigation' as never);
          }
        }}>
        <View>
          <Text style={styles.changeAddressText}>Cambiar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.White,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  changeAddressContainer: {
    paddingLeft: 5,
  },
  addressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.Black,
    paddingLeft: 10,
    flex: 1,
  },
  changeAddressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.SecondaryTextColor,
  },
});
