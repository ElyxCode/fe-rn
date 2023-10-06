import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {CustomTextInput} from '../components/CustomTextInput';
import {SubmitButton} from '../components/SubmitButton';
import {ThirdPartyButton} from '../components/ThirdPartyButton';

import UserTagIcon from '../assets/user_tag.svg';
import UserEditIcon from '../assets/user_edit_darkblue.svg';
import SmsTrackingIcon from '../assets/sms_tracking.svg';
import CallIcon from '../assets/call.svg';
import LockIcon from '../assets/ic_lock.svg';
import GoogleIcon from '../assets/google_logo.svg';
import AppleIcon from '../assets/apple_logo.svg';

import {colors} from '../styles/colors';
import {BackButtonBar} from '../components/BackButtonBar';

export const SignUpScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <BackButtonBar />
      <View style={styles.container}>
        <UserTagIcon height={75} />
        <Text style={styles.titleText}>Registrate</Text>
        <View style={styles.textInputContainer}>
          <CustomTextInput InputIcon={UserEditIcon} placeHolder="Nombre" />
          <CustomTextInput
            InputIcon={SmsTrackingIcon}
            placeHolder="Correo electrónico"
          />
          <CustomTextInput InputIcon={CallIcon} placeHolder="Celular" />
          <CustomTextInput InputIcon={LockIcon} placeHolder="Contraseña" />
        </View>
        <View style={styles.buttonsContainer}>
          <SubmitButton textButton="Registrar" />
          <ThirdPartyButton
            textButton="Continuar con Google"
            ButtonIcon={GoogleIcon}
          />
          <ThirdPartyButton
            textButton="Continuar con Apple"
            ButtonIcon={AppleIcon}
            customBackgroundColor={colors.Black}
            customTextColor={colors.White}
          />
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
    color: colors.PrimaryTextColor,
    fontFamily: 'Poppins-SemiBold',
  },
  textInputContainer: {
    rowGap: 15,
    marginTop: 35,
  },
  buttonsContainer: {
    marginTop: 40,
    rowGap: 10,
  },
});
