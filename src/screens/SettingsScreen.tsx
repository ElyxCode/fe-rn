import React, {useEffect, useState} from 'react';
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

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {UserProfile} from '../model/User';

import {
  updateNotificationService,
  updateUserService,
} from '../services/user/user';
import {setUser} from '../services/user/userSlice';

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
  const [enableBiometric, setEnableBiometric] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const toggleNotificationSwitch = () => {
    updateNotificatationsOption();
  };

  const toggleBiometricSwitch = () =>
    setEnableBiometric(previousState => !previousState);

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
            biometricValue={enableBiometric}
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
