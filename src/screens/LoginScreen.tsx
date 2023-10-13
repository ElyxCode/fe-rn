import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Pressable} from 'react-native';

import {CustomTextInput} from '../components/CustomTextInput';
import {SubmitButton} from '../components/SubmitButton';
import {ThirdPartyButton} from '../components/ThirdPartyButton';
import {CustomNavBar} from '../components/CustomNavBar';

import UserTickIcon from '../assets/user_tick_darkgray.svg';
import LockIcon from '../assets/ic_lock.svg';
import SMSTrackingIcon from '../assets/sms_tracking.svg';
import GoogleLogoIcon from '../assets/google_logo.svg';
import AppleLogoIcon from '../assets/apple_logo.svg';

import {colors} from '../styles/colors';

export const LoginScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <View style={styles.container}>
        <UserTickIcon height={'75'} fill={colors.DarkGrayColor} />
        <Text style={styles.titleText}>Inicia sesión</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            y vive una nueva experiencia de{' '}
          </Text>
          <Text style={styles.descriptionText}>compra en ferreteria</Text>
        </View>
        <View style={styles.inputTextContainer}>
          <CustomTextInput
            InputIcon={SMSTrackingIcon}
            placeHolder="Correo Electrónico"
            fill={colors.PrimaryColor}
          />
          <CustomTextInput
            InputIcon={LockIcon}
            placeHolder="Contraseña"
            isPassword={true}
          />
        </View>
        <Text style={styles.recoverPassword}>Recuperar Contraseña</Text>
        <View style={styles.buttonsContainer}>
          <SubmitButton
            textButton="Iniciar Sesión"
            onPress={() => navigation.navigate('UserOptionsMenuScreen')}
          />
          <ThirdPartyButton
            textButton="Continuar con Google"
            ButtonIcon={GoogleLogoIcon}
          />
          <ThirdPartyButton
            textButton="Continuar con Apple"
            ButtonIcon={AppleLogoIcon}
            customBackgroundColor={colors.Black}
            customTextColor={colors.White}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={styles.noAccountMessage}>
            ¿Aún no tienes una cuenta?
          </Text>
          <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={[styles.noAccountMessage, styles.registerMessage]}>
              Registrarme
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 35,
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: colors.PrimaryTextColor,
  },
  descriptionContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  inputTextContainer: {
    rowGap: 20,
  },
  recoverPassword: {
    textAlign: 'right',
    color: colors.SecondaryColor,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
    marginBottom: 35,
  },
  buttonsContainer: {
    rowGap: 10,
  },
  noAccountMessage: {
    color: colors.DarkGrayColor,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  registerMessage: {
    marginLeft: 5,
    color: colors.SecondaryColor,
  },
});
