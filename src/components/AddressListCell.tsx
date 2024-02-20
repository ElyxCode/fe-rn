import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {Address} from '../model/Address';

import LocationIcon from '../assets/location.svg';
import Trash from '../assets/trash.svg';

import {colors} from '../styles/colors';

type AddressCellProps = {
  address: Address;
  onPressDelete: () => void;
  onPress: () => void;
};

export const AddressListCell = ({
  address,
  onPressDelete,
  onPress,
}: AddressCellProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {borderColor: address.active ? colors.PrimaryColor : 'white'},
      ]}>
      <LocationIcon />
      <View style={styles.containerText}>
        <Text style={styles.name} numberOfLines={1}>
          {address.name}
        </Text>
        <Text style={styles.stringAddress} numberOfLines={1}>
          {address.address}
        </Text>
      </View>
      <Trash onPress={() => onPressDelete()} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 1,
  },
  containerText: {
    flex: 1,
    paddingLeft: 16,
  },
  name: {
    color: colors.DarkGrayColor,
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  stringAddress: {
    color: colors.DarkGrayColor,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});
