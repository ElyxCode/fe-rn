import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {SubmitButton} from '../components/SubmitButton';

import FingerScanIcon from '../assets/finger_scan.svg';

import {colors} from '../styles/colors';

export const BiometricDetailScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.PrimaryColor}}>
      <View style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <FingerScanIcon height={90} width={90} />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.titleText}>Activa tu Face ID o huella</Text>
          <Text style={styles.descriptionText}>
            Inicia sesión utilizando tu Face ID o huella. Puedes activar esta
            opción más tarde en ajustes de la app
          </Text>
        </View>
      </View>
      <SubmitButton
        textButton="Activar"
        customStyles={{
          backgroundColor: colors.SecondaryColor,
          marginHorizontal: 36,
          marginBottom: 38,
        }}
      />
      <Pressable
        onPress={() => {}}
        style={{alignItems: 'center', marginBottom: 40}}>
        <Text style={styles.doItLaterText}>Activar más tarde</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerText: {
    paddingHorizontal: 53,
    paddingTop: 68,
    rowGap: 10,
  },
  titleText: {
    fontSize: 24,
    color: colors.SecondaryTextColor,
    fontFamily: 'Poppins-Medium',
  },
  descriptionText: {
    fontSize: 14,
    color: colors.White,
    fontFamily: 'Poppins-Medium',
  },
  doItLaterText: {
    color: colors.SecondaryTextColor,
    fontFamily: 'Poppins-Medium',
    alignItems: 'center',
  },
});
