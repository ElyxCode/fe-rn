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

import ArrowRightIcon from '../assets/arrow_right.svg';
import BoxIcon from '../assets/box.svg';
import CardsIcon from '../assets/cards.svg';
import LocationIcon from '../assets/location-secondary-color.svg';
import MessageQuestionIcon from '../assets/message_question.svg';
import SettingIcon from '../assets/settings.svg';
import SignoutIcon from '../assets/logout.svg';

import {colors} from '../styles/colors';

type MenuOptionItemProps = {
  OptionButtonIcon: React.FC<SvgProps>;
  optionName: string;
};

const menuOptions: MenuOptionItemProps[] = [
  {optionName: 'Mis Ordenes', OptionButtonIcon: BoxIcon},
  {optionName: 'Métodos de Pago', OptionButtonIcon: CardsIcon},
  {optionName: 'Direcciones de envío', OptionButtonIcon: LocationIcon},
  {optionName: 'Ayuda', OptionButtonIcon: MessageQuestionIcon},
  {optionName: 'Ajustes de la app', OptionButtonIcon: SettingIcon},
];

const MenuOptionItem = ({
  OptionButtonIcon,
  optionName,
}: MenuOptionItemProps) => {
  return (
    <Pressable onPress={() => console.log(optionName)}>
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

export const UserOptionsMenuScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <CustomNavBar primaryColorDefault={false} titleText="Mis Opciones" />
        <UserInfo
          userName={'Ricardo'}
          userEmail="richi@mail.com"
          userTelNumber="12345678"
        />
        <View style={styles.menuOptionsContainer}>
          <FlatList
            data={menuOptions}
            renderItem={({item}) => (
              <MenuOptionItem
                OptionButtonIcon={item.OptionButtonIcon}
                optionName={item.optionName}
              />
            )}
            keyExtractor={item => item.optionName}
            ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
            scrollEnabled={false}
          />
        </View>
        <View style={styles.signoutContainer}>
          <Pressable onPress={() => console.log('signout')}>
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