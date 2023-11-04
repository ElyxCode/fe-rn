import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {useAppDispatch} from '../hooks/useRedux';

import {setToken} from '../services/auth/authSlice';

import {LoaderScreen} from './LoaderScreen';

import {CustomTextInput} from '../components/CustomTextInput';
import {SubmitButton} from '../components/SubmitButton';
import {ThirdPartyButton} from '../components/ThirdPartyButton';
import {CustomNavBar} from '../components/CustomNavBar';

import {loginServices} from '../services/auth/auth';

import UserTickIcon from '../assets/user_tick_darkgray.svg';
import LockIcon from '../assets/ic_lock.svg';
import SMSTrackingIcon from '../assets/sms_tracking.svg';
import GoogleLogoIcon from '../assets/google_logo.svg';
import AppleLogoIcon from '../assets/apple_logo.svg';

import {colors} from '../styles/colors';
import Messages from '../constants/Messages';
import {googleSingInConf} from '../constants/googleSignInConf';
import {ThirdPartyLoginService} from '../services/auth/authThirdParty';
import {isAndroid} from '../constants/Platform';

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
      navigation.navigate('UserOptionsMenuScreen');
    } else {
      console.log({error: response.data?.error});
      Alert.alert('Ferreplace', response.data?.error, [{text: 'Aceptar'}]);
    }

    setIsLoading(false);
  };

  const handleOnError = (errors: any) => {
    if (errors.email) {
      return Alert.alert(Messages.titleMessage, errors.email.message, [
        {text: Messages.okButton},
      ]);
    }

    if (errors.password) {
      Alert.alert(Messages.titleMessage, errors.password.message, [
        {text: Messages.okButton},
      ]);
    }
  };

  useEffect(() => {
    GoogleSignin.configure(googleSingInConf);
  }, []);

  const googleSignInThirdParty = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn(); // -> requerido
      const {accessToken} = await GoogleSignin.getTokens();

      if (
        accessToken !== '' &&
        accessToken !== undefined &&
        accessToken !== null
      ) {
        const response = await ThirdPartyLoginService('google', accessToken);
        if (response.ok) {
          dispatch(setToken(response.data?.token ?? '')); // guardo el token
          navigation.navigate('UserOptionsMenuScreen');
        } else {
          console.log({errorRespon: response.data?.error});
          Alert.alert('Ferreplace', response.data?.error, [{text: 'Aceptar'}]);
        }
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        // some other error happened
        console.log({errorGoogle: error});
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <>
          <CustomNavBar />
          <ScrollView style={styles.container}>
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
                onPress={() => googleSignInThirdParty()}
              />
              {!isAndroid ? (
                <ThirdPartyButton
                  textButton="Continuar con Apple"
                  ButtonIcon={AppleLogoIcon}
                  customBackgroundColor={colors.Black}
                  customTextColor={colors.White}
                />
              ) : null}
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'center',
                paddingBottom: 15,
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
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35,
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
