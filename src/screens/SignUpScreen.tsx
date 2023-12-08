import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {useAppDispatch} from '../hooks/useRedux';

import {CustomTextInput} from '../components/CustomTextInput';
import {SubmitButton} from '../components/SubmitButton';
import {ThirdPartyButton} from '../components/ThirdPartyButton';
import {CustomNavBar} from '../components/CustomNavBar';

import {LoaderScreen} from './LoaderScreen';

import {signUpServices} from '../services/auth/auth';
import {ThirdPartyLoginService} from '../services/auth/authThirdParty';
import {setToken, thirdPartySocial} from '../services/auth/authSlice';

import {SignupErrors} from '../model/User';

import UserTagIcon from '../assets/user_tag.svg';
import UserEditIcon from '../assets/user_edit_darkblue.svg';
import SmsTrackingIcon from '../assets/sms_tracking.svg';
import CallIcon from '../assets/call.svg';
import LockIcon from '../assets/ic_lock.svg';
import GoogleIcon from '../assets/google_logo.svg';
import AppleIcon from '../assets/apple_logo.svg';

import Messages from '../constants/Messages';
import {isAndroid} from '../constants/Platform';
import {googleSingInConf} from '../constants/googleSignInConf';
import {
  emailFormatPattern,
  passwordValidation,
  phoneFormatPattern,
} from '../utils/utilities';

import {colors} from '../styles/colors';

export const SignUpScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  const handleOnSubmit = async ({
    name,
    email,
    phone,
    password,
  }: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    setIsLoading(true);
    if (!passwordValidation(password)) {
      setIsLoading(false);
      return Alert.alert(
        Messages.titleMessage,
        Messages.PasswordValidationMessage,
        [{text: Messages.okButton}],
      );
    }

    const response = await signUpServices(name, email, phone, password);
    if (response.ok) {
      if (response.data?.errors) {
        showServicesError(response.data?.errors);
        setIsLoading(false);
        return;
      }

      if (response.data?.status === 'success') {
        Alert.alert(Messages.titleMessage, response.data.message, [
          {text: Messages.okButton},
        ]);

        navigation.goBack();
        setIsLoading(false);
        return;
      }
    }

    if (response === null) {
      setIsLoading(false);
      return Alert.alert(
        Messages.titleMessage,
        Messages.UnAvailableServerMessage,
        [{text: Messages.okButton}],
      );
    }
  };

  useEffect(() => {
    GoogleSignin.configure(googleSingInConf);
  }, []);

  const googleSignInThirdParty = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn(); // -> requerido para tener tokens
      const {accessToken} = await GoogleSignin.getTokens();

      if (
        accessToken !== '' &&
        accessToken !== undefined &&
        accessToken !== null
      ) {
        const response = await ThirdPartyLoginService('google', accessToken);
        if (response.ok) {
          dispatch(
            setToken({
              token: response.data?.token ?? '',
              social: thirdPartySocial.google,
            }),
          ); // guardo el token
          navigation.navigate('SignUpComplementScreen', {
            userData: response.data?.user,
          });
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

  const showServicesError = (errors: SignupErrors) => {
    if (errors.name) {
      return Alert.alert(Messages.titleMessage, errors.name.toString(), [
        {text: Messages.okButton},
      ]);
    }

    if (errors.email) {
      return Alert.alert(Messages.titleMessage, errors.email.toString(), [
        {text: Messages.okButton},
      ]);
    }

    if (errors.phone) {
      return Alert.alert(Messages.titleMessage, errors.phone.toString(), [
        {text: Messages.okButton},
      ]);
    }

    if (errors.password) {
      return Alert.alert(Messages.titleMessage, errors.password.toString(), [
        {text: Messages.okButton},
      ]);
    }
  };

  const handleOnError = (errors: any) => {
    if (errors.name) {
      return Alert.alert(Messages.titleMessage, errors.name.message, [
        {text: Messages.okButton},
      ]);
    }

    if (errors.email) {
      return Alert.alert(Messages.titleMessage, errors.email.message, [
        {text: Messages.okButton},
      ]);
    }

    if (errors.phone) {
      Alert.alert(Messages.titleMessage, errors.phone.message, [
        {text: Messages.okButton},
      ]);
    }

    if (errors.password) {
      Alert.alert(Messages.titleMessage, errors.password.message, [
        {text: Messages.okButton},
      ]);
    }
  };

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <ScrollView style={styles.container}>
        <UserTagIcon height={75} />
        <Text style={styles.titleText}>Registrate</Text>
        <View style={styles.textInputContainer}>
          <Controller
            control={control}
            rules={{required: Messages.requireNameProfile}}
            render={({field: {onChange, value, onBlur}}) => (
              <CustomTextInput
                InputIcon={UserEditIcon}
                placeHolder="Nombre"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            rules={{
              required: Messages.requireEmailMessage,
              pattern: {
                value: emailFormatPattern,
                message: Messages.requireEmailProfile,
              },
            }}
            render={({field: {onChange, value, onBlur}}) => (
              <CustomTextInput
                InputIcon={SmsTrackingIcon}
                placeHolder="Correo electrónico"
                keyboardType="email-address"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: Messages.requirePhoneProfile,
              pattern: {
                value: phoneFormatPattern,
                message: Messages.phoneNumberFormatPatternMessage,
              },
            }}
            render={({field: {onChange, value, onBlur}}) => (
              <CustomTextInput
                InputIcon={CallIcon}
                placeHolder="Celular"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType={isAndroid ? 'numeric' : 'number-pad'}
              />
            )}
            name="phone"
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
        <View style={styles.buttonsContainer}>
          <SubmitButton
            textButton="Registrar"
            onPress={handleSubmit(handleOnSubmit, handleOnError)}
          />
          <ThirdPartyButton
            textButton="Continuar con Google"
            ButtonIcon={GoogleIcon}
            onPress={() => googleSignInThirdParty()}
          />
          {!isAndroid ? (
            <ThirdPartyButton
              textButton="Continuar con Apple"
              ButtonIcon={AppleIcon}
              customBackgroundColor={colors.Black}
              customTextColor={colors.White}
            />
          ) : null}
        </View>
      </ScrollView>
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
    color: colors.PrimaryTextColor,
    fontFamily: 'Poppins-SemiBold',
  },
  textInputContainer: {
    rowGap: 15,
    marginTop: 35,
  },
  buttonsContainer: {
    marginTop: 40,
    marginBottom: 10,
    rowGap: 10,
  },
});
