import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import {SvgProps} from 'react-native-svg';

import FingerScanIcon from '../assets/finger_scan_settings.svg';
import DocumentIcon from '../assets/document.svg';
import SecurityIcon from '../assets/security_card.svg';
import ProfileDeleteIcon from '../assets/profile_delete.svg';
import NotificationBingIcon from '../assets/notification_bing.svg';
import ArrowRightIcon from '../assets/arrow_right_blue.svg';

import {colors} from '../styles/colors';
import {CustomNavBar} from '../components/CustomNavBar';
import {useNavigation} from '@react-navigation/native';

type OptionsMenu = {
  OptionIcon: React.FC<SvgProps>;
  optionText: string;
  hasSwitch: boolean;
  navigationPath?: string | undefined;
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
  const OptionMenu = ({
    OptionIcon,
    optionText,
    hasSwitch,
    navigationPath,
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
        }}>
        <View style={styles.optionContainer}>
          <OptionIcon height={19} />
          <View style={styles.textContainer}>
            <Text style={styles.optionText}>{optionText}</Text>
            {hasSwitch ? (
              <Text
                style={[styles.optionText, {fontSize: hasSwitch ? 12 : 10}]}>
                Activo
              </Text>
            ) : null}
          </View>
          <View style={styles.switchContainer}>
            {hasSwitch ? (
              <Switch thumbColor={colors.SwitchThumbColor} />
            ) : (
              <ArrowRightIcon height={19} fill={colors.PrimaryColor} />
            )}
          </View>
        </View>
      </Pressable>
    );
  };

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
