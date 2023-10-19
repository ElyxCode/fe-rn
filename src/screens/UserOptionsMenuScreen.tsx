import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {UserInfo} from '../components/UserInfo';
import {CustomNavBar} from '../components/CustomNavBar';

import {clearUserData} from '../services/user/userSlice';
import {clearToken} from '../services/auth/authSlice';

import ArrowRightIcon from '../assets/arrow_right.svg';
import BoxIcon from '../assets/box.svg';
import CardsIcon from '../assets/cards.svg';
import LocationIcon from '../assets/location-secondary-color.svg';
import MessageQuestionIcon from '../assets/message_question.svg';
import SettingIcon from '../assets/settings.svg';
import SignoutIcon from '../assets/logout.svg';

import {colors} from '../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

type MenuOptionItemProps = {
  OptionButtonIcon: React.FC<SvgProps>;
  optionName: string;
  screenPath: string;
};

const menuOptions: MenuOptionItemProps[] = [
  {optionName: 'Mis Ordenes', OptionButtonIcon: BoxIcon, screenPath: ''},
  {optionName: 'Métodos de Pago', OptionButtonIcon: CardsIcon, screenPath: ''},
  {
    optionName: 'Direcciones de envío',
    OptionButtonIcon: LocationIcon,
    screenPath: '',
  },
  {optionName: 'Ayuda', OptionButtonIcon: MessageQuestionIcon, screenPath: ''},
  {
    optionName: 'Ajustes de la app',
    OptionButtonIcon: SettingIcon,
    screenPath: 'SettingsScreen',
  },
];

export const UserOptionsMenuScreen = () => {
  const user = useAppSelector(state => state.user.userData);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const MenuOptionItem = ({
    OptionButtonIcon,
    optionName,
    screenPath,
  }: MenuOptionItemProps) => {
    return (
      <Pressable onPress={() => navigation.navigate(screenPath as never)}>
        <View style={styles.menuOptionsItemContainer}>
          <OptionButtonIcon height={21} fill={colors.SecondaryColor} />
          <View style={{flex: 1}}>
            <Text style={styles.optionNameText}>{optionName}</Text>
          </View>
          <ArrowRightIcon height={16} />
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.PrimaryColor}}>
      <CustomNavBar primaryColorDefault={false} titleText="Mis Opciones" />
      <View style={styles.container}>
        <UserInfo
          userName={user.name}
          userEmail={user.email}
          userTelNumber={user.phone}
        />
        <View style={styles.menuOptionsContainer}>
          <FlatList
            data={menuOptions}
            renderItem={({item}) => (
              <MenuOptionItem
                OptionButtonIcon={item.OptionButtonIcon}
                optionName={item.optionName}
                screenPath={item.screenPath}
              />
            )}
            keyExtractor={item => item.optionName}
            ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
            scrollEnabled={false}
          />
        </View>
        <View style={styles.signoutContainer}>
          <Pressable
            onPress={() => {
              dispatch(clearUserData());
              dispatch(clearToken());
              navigation.navigate('WelcomeScreen' as never);
            }}>
            <View style={styles.signoutItemcontainer}>
              <SignoutIcon height={24} />
              <Text style={styles.logoutText}>Cerrar sesión</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    backgroundColor: colors.PrimaryColor,
  },
  menuOptionsContainer: {
    marginTop: 27,
  },
  menuOptionsItemContainer: {
    flexDirection: 'row',
    backgroundColor: colors.PrimaryLightColor,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 9,
    alignItems: 'center',
  },
  optionNameText: {
    fontSize: 12,
    color: colors.White,
    fontFamily: 'Poppins-SemiBold',
    paddingLeft: 10,
  },
  signoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  signoutItemcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: colors.White,
    paddingLeft: 5,
  },
});
