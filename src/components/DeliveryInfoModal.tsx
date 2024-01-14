import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CloseCircleIcon from '../assets/close_circle.svg';

import {colors} from '../styles/colors';

export const DeliveryInfoModal = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.popUpContainer}>
        <View style={styles.closeButtonContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <CloseCircleIcon height={25} width={25} />
          </Pressable>
        </View>
        <View style={styles.popUpBody}>
          <Text style={styles.titleText}>Costo de envío</Text>
          <Text style={styles.descriptionText}>
            El costo de envío se calcula multiplicando en costo de gasolina
            actual con la distancia en kilómetros entre el comercio y la
            dirección seleccionada
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.PopUpBackground,
  },
  popUpContainer: {
    backgroundColor: colors.White,
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
  },
  popUpBody: {
    rowGap: 20,
    paddingHorizontal: 30,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.DarkGrayColor,
  },
  descriptionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: colors.DarkGrayColor,
    paddingBottom: 33,
    paddingRight: 10,
  },
});
