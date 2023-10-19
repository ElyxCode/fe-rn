import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import {useAppDispatch} from '../hooks/useRedux';

import {setToken} from '../services/auth/authSlice';
import {setUser} from '../services/user/userSlice';

import {LoaderScreen} from './LoaderScreen';

import {CustomTextInput} from '../components/CustomTextInput';
import {SubmitButton} from '../components/SubmitButton';
import {ThirdPartyButton} from '../components/ThirdPartyButton';
import {CustomNavBar} from '../components/CustomNavBar';

import {loginServices} from '../services/auth/auth';

import {UserProfile} from '../model/User';

import UserTickIcon from '../assets/user_tick_darkgray.svg';
import LockIcon from '../assets/ic_lock.svg';
import SMSTrackingIcon from '../assets/sms_tracking.svg';
import GoogleLogoIcon from '../assets/google_logo.svg';
import AppleLogoIcon from '../assets/apple_logo.svg';

import {colors} from '../styles/colors';
import Messages from '../constants/Messages';

export const LoginScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleOnSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    const response = await loginServices(email, password);
    if (response.ok) {
      console.log({user: response.data?.user});
      dispatch(setToken(response.data?.token ?? '')); // guardo el token
      dispatch(setUser(response.data?.user as UserProfile)); // guardo perfil de usuario
      navigation.navigate('UserOptionsMenuScreen');
    } else {
      console.log({error: response.data?.error});
      Alert.alert('Ferreplace', response.data?.error, [{text: 'Aceptar'}]);
    }

    setIsLoading(false);
  };

  const handleOnError = (errors: any) => {
    if (errors.email) {
      return Alert.alert('Ferreplace', errors.email.message, [
        {text: 'Aceptar'},
      ]);
    }

    if (errors.password) {
      Alert.alert(Messages.titleMessage, errors.password.message, [
        {text: Messages.okButton},
      ]);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <>
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
              <Controller
                control={control}
                rules={{required: Messages.requireEmailMessage}}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    InputIcon={SMSTrackingIcon}
                    placeHolder="Correo Electrónico"
                    fill={colors.PrimaryColor}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="email"
              />

              <Controller
                control={control}
                rules={{required: Messages.requirePasswordMessage}}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    InputIcon={LockIcon}
                    placeHolder="Contraseña"
                    isPassword={true}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="password"
              />
            </View>
            <Text style={styles.recoverPassword}>Recuperar Contraseña</Text>
            <View style={styles.buttonsContainer}>
              <SubmitButton
                textButton="Iniciar Sesión"
                onPress={handleSubmit(handleOnSubmit, handleOnError)}
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
        </>
      )}
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
