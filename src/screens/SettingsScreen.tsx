import React, {useState} from 'react';
import {
  Alert,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import {SvgProps} from 'react-native-svg';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {UserProfile} from '../model/User';

import {updateNotificationService} from '../services/user/user';
import {setUser} from '../services/user/userSlice';
import {setToken} from '../services/auth/authSlice';

import {CustomNavBar} from '../components/CustomNavBar';

import {LoaderScreen} from './LoaderScreen';

import FingerScanIcon from '../assets/finger_scan_settings.svg';
import DocumentIcon from '../assets/document.svg';
import SecurityIcon from '../assets/security_card.svg';
import ProfileDeleteIcon from '../assets/profile_delete.svg';
import NotificationBingIcon from '../assets/notification_bing.svg';
import ArrowRightIcon from '../assets/arrow_right_blue.svg';

import {clearObjectUserData} from '../utils/utilities';
import Messages from '../constants/Messages';
import {policyUri, termsUri} from '../constants/Resources';
import {isAndroid} from '../constants/Platform';
import {colors} from '../styles/colors';

type OptionsMenu = {
  OptionIcon: React.FC<SvgProps>;
  optionText: string;
  hasSwitch: boolean;
  navigationPath?: string | undefined;
  notificationValue?: boolean;
  biometricValue?: boolean;
  toggleNotification?: () => void;
  toggleBiometric?: () => void;
};

const options: OptionsMenu[] = [
  {
    OptionIcon: NotificationBingIcon,
    optionText: 'Notificaciones',
    hasSwitch: true,
  },
  {OptionIcon: FingerScanIcon, optionText: 'Face ID o huella', hasSwitch: true},
  {
    OptionIcon: DocumentIcon,
    optionText: 'Términos y condiciones',
    hasSwitch: false,
  },
  {
    OptionIcon: SecurityIcon,
    optionText: 'Políticas de privacidad',
    hasSwitch: false,
  },
  {
    OptionIcon: ProfileDeleteIcon,
    optionText: 'Eliminar cuenta',
    hasSwitch: false,
    navigationPath: 'DeleteAccountScreen',
  },
];

export const SettingsScreen = ({navigation}: any) => {
  const userData = useAppSelector(state => state.user.userData);
  const token = useAppSelector(state => state.authToken.token);
  const authToken = useAppSelector(state => state.authToken);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const toggleNotificationSwitch = () => {
    updateNotificatationsOption();
  };

  const toggleBiometricSwitch = () => {
    updateBiometricOption();
  };

  const updateBiometricOption = async () => {
    const biometrics = new ReactNativeBiometrics();
    const {available, biometryType} = await biometrics.isSensorAvailable();
    if (isAndroid) {
      if (biometryType === BiometryTypes.Biometrics && !available) {
        dispatch(setToken({...authToken, biometric: false}));
        return await AlertBiometricFeatureUnavailable();
      }
    } else {
      if (biometryType === BiometryTypes.TouchID && !available) {
        dispatch(setToken({...authToken, biometric: false}));
        return await AlertBiometricFeatureUnavailable();
      } else if (biometryType === BiometryTypes.FaceID && !available) {
        dispatch(setToken({...authToken, biometric: false}));
        return await AlertBiometricFeatureUnavailable();
      }
    }

    dispatch(setToken({...authToken, biometric: !authToken.biometric}));
  };

  const updateNotificatationsOption = async () => {
    setIsLoading(true);
    const currentUser: UserProfile = {
      ...userData,
      notifications: userData.notifications,
    };
    const resp = await updateNotificationService(token, currentUser);

    if (resp.ok) {
      const {user} = clearObjectUserData(resp.data);

      dispatch(setUser(user as UserProfile));
    } else {
      setIsLoading(false);
      const AsyncAlert = async () =>
        new Promise(resolve => {
          Alert.alert(
            Messages.titleMessage,
            Messages.UnAvailableServerMessage,
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

      return await AsyncAlert();
    }
    setIsLoading(false);
  };

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

  const OptionMenu = ({
    OptionIcon,
    optionText,
    hasSwitch,
    navigationPath,
    notificationValue,
    biometricValue,
    toggleNotification,
    toggleBiometric,
  }: OptionsMenu) => {
    return (
      <Pressable
        onPress={() => {
          if (
            optionText === 'Notificaciones' ||
            optionText === 'Face ID o huella'
          ) {
            !hasSwitch;
          }
          if (navigationPath !== undefined) {
            navigation.navigate(navigationPath);
          }

          if (optionText === 'Términos y condiciones') {
            Linking.openURL(termsUri).catch(err => {
              console.log(err);
            });
            return;
          }

          if (optionText === 'Políticas de privacidad') {
            Linking.openURL(policyUri).catch(err => {
              console.log(err);
            });
            return;
          }
        }}>
        <View style={styles.optionContainer}>
          <OptionIcon height={19} />
          <View style={styles.textContainer}>
            <Text style={styles.optionText}>{optionText}</Text>
            {hasSwitch ? (
              <Text
                style={[styles.optionText, {fontSize: hasSwitch ? 12 : 10}]}>
                {optionText === 'Notificaciones'
                  ? notificationValue
                    ? 'Activas'
                    : 'Desactivadas'
                  : biometricValue
                  ? 'Activa'
                  : 'Desactivada'}
              </Text>
            ) : null}
          </View>
          <View style={styles.switchContainer}>
            {hasSwitch ? (
              <Switch
                thumbColor={colors.SwitchThumbColor}
                value={
                  optionText === 'Notificaciones'
                    ? notificationValue
                    : biometricValue
                }
                onValueChange={
                  optionText === 'Notificaciones'
                    ? toggleNotification
                    : toggleBiometric
                }
              />
            ) : (
              <ArrowRightIcon height={19} fill={colors.PrimaryColor} />
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar titleText="Ajustes" />
      <View style={styles.container}>
        {options.map(option => (
          <OptionMenu
            key={option.optionText}
            OptionIcon={option.OptionIcon}
            optionText={option.optionText}
            navigationPath={option.navigationPath}
            hasSwitch={option.hasSwitch}
            notificationValue={userData.notifications}
            biometricValue={authToken.biometric}
            toggleNotification={toggleNotificationSwitch}
            toggleBiometric={toggleBiometricSwitch}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 10,
    paddingHorizontal: 22,
    marginTop: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    backgroundColor: colors.White,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 18,
    rowGap: 5,
  },
  optionText: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: colors.DarkGrayColor,
  },
  switchContainer: {},
});
