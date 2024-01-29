import React from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {setToken} from '../services/auth/authSlice';

import {SubmitButton} from '../components/SubmitButton';

import FingerScanIcon from '../assets/finger_scan.svg';

import Messages from '../constants/Messages';
import {isAndroid} from '../constants/Platform';
import {colors} from '../styles/colors';

export const BiometricDetailScreen = ({navigation}: any) => {
  const authToken = useAppSelector(state => state.authToken);
  const dispatch = useAppDispatch();

  const activeBiometric = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    const {biometryType, available} = await rnBiometrics.isSensorAvailable();

    if (isAndroid) {
      if (biometryType === BiometryTypes.Biometrics && available) {
        const {success} = await rnBiometrics.simplePrompt({
          promptMessage: Messages.inputTitleBiometricMessage,
        });

        if (success) {
          dispatch(setToken({...authToken, isLoggedIn: true, biometric: true}));
          navigation.navigate('HomeNavigation');
        } else {
          await AlertBiometricFailed();
        }

        return;
      }

      await AlertBiometricFeatureUnavailable();
    } else {
      if (biometryType === BiometryTypes.TouchID && available) {
        const {success} = await rnBiometrics.simplePrompt({
          promptMessage: Messages.inputTitleBiometricMessage,
        });

        if (success) {
          dispatch(setToken({...authToken, isLoggedIn: true, biometric: true}));
          navigation.navigate('HomeNavigation');
        } else {
          await AlertBiometricFailed();
        }
        return;
      }

      if (biometryType === BiometryTypes.FaceID && available) {
        const {success} = await rnBiometrics.simplePrompt({
          promptMessage: Messages.inputTitleBiometricMessage,
        });

        if (success) {
          dispatch(setToken({...authToken, isLoggedIn: true, biometric: true}));
          navigation.navigate('HomeNavigation');
        } else {
          await AlertBiometricFailed();
        }
        return;
      }
      await AlertBiometricFeatureUnavailable();
    }
  };

  const AlertBiometricFailed = async () =>
    new Promise(resolve => {
      Alert.alert(
        Messages.titleMessage,
        Messages.biometricFailed,
        [
          {
            text: Messages.okButton,
            onPress: () => {
              resolve('YES');
            },
          },
        ],
        {cancelable: false},
      );
    });

  const AlertBiometricFeatureUnavailable = async () =>
    new Promise(resolve => {
      Alert.alert(
        Messages.titleMessage,
        Messages.biometricFeatureUnavailable,
        [
          {
            text: Messages.okButton,
            onPress: () => {
              resolve('YES');
            },
          },
        ],
        {cancelable: false},
      );
    });

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
        onPress={() => activeBiometric()}
      />
      <Pressable
        onPress={() => navigation.navigate('HomeBranchScreen')}
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
