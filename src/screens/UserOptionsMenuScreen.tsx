import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Linking,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {UserInfo} from '../components/UserInfo';
import {CustomNavBar} from '../components/CustomNavBar';

import {LoaderScreen} from './LoaderScreen';

import {getUserService} from '../services/user/user';
import {clearProduct} from '../services/product/productSlice';
import {clearCard, clearCardConfirmAdded} from '../services/card/cardSlice';
import {clearAddress} from '../services/address/addressSlice';
import {
  clearOrderUserBillingTemp,
  clearOrderUserPhoneTemp,
  setUser,
} from '../services/user/userSlice';
import {clearToken, thirdPartySocial} from '../services/auth/authSlice';

import ArrowRightIcon from '../assets/arrow_right.svg';
import BoxIcon from '../assets/box.svg';
import CardsIcon from '../assets/cards.svg';
import LocationIcon from '../assets/location-secondary-color.svg';
import MessageQuestionIcon from '../assets/message_question.svg';
import SettingIcon from '../assets/settings.svg';
import SignoutIcon from '../assets/logout.svg';

import {googleSingInConf} from '../constants/googleSignInConf';
import {WhatsAppUri} from '../constants/Resources';
import {colors} from '../styles/colors';

type MenuOptionItemProps = {
  OptionButtonIcon: React.FC<SvgProps>;
  optionName: string;
  screenPath: string;
};

const menuOptions: MenuOptionItemProps[] = [
  {
    optionName: 'Mis Ordenes',
    OptionButtonIcon: BoxIcon,
    screenPath: 'OrderListScreen',
  },
  {
    optionName: 'Métodos de Pago',
    OptionButtonIcon: CardsIcon,
    screenPath: 'CardNavigation',
  },
  {
    optionName: 'Direcciones de envío',
    OptionButtonIcon: LocationIcon,
    screenPath: 'AddressNavigation',
  },
  {optionName: 'Ayuda', OptionButtonIcon: MessageQuestionIcon, screenPath: ''},
  {
    optionName: 'Ajustes de la app',
    OptionButtonIcon: SettingIcon,
    screenPath: 'SettingsScreen',
  },
];

export const UserOptionsMenuScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {token, social} = useAppSelector(state => state.authToken);
  const user = useAppSelector(state => state.user.userData);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // llama servicio para obtener usuario
  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      const response = await getUserService(token);
      if (response.ok) {
        dispatch(setUser({...response.data}));
      } else {
        console.log({errorStatus: response.status});
        console.log({error: response.data?.error});
      }
      setIsLoading(false);
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (social === thirdPartySocial.google) {
      GoogleSignin.configure(googleSingInConf);
    }
  }, []);

  const signOut = () => {
    setIsLoading(true);
    if (social === thirdPartySocial.google) {
      googleSignOut();
    }

    dispatch(clearToken());
    dispatch(clearProduct());
    dispatch(clearCard());
    dispatch(clearAddress());
    dispatch(clearOrderUserBillingTemp());
    dispatch(clearOrderUserPhoneTemp());
    dispatch(clearCardConfirmAdded());

    navigation.navigate('WelcomeScreen' as never);
    setIsLoading(true);
  };

  const googleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error({signOutGoogleError: error});
    }
  };

  const MenuOptionItem = ({
    OptionButtonIcon,
    optionName,
    screenPath,
  }: MenuOptionItemProps) => {
    return (
      <Pressable
        onPress={() => {
          if (optionName === 'Ayuda') {
            Linking.openURL(WhatsAppUri).catch(err => {
              console.log(err);
            });
            return;
          }
          navigation.navigate(screenPath as never);
        }}>
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
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <>
          <CustomNavBar primaryColorDefault={false} titleText="Mis Opciones" />
          <View style={styles.container}>
            <Pressable
              onPress={() => navigation.navigate('EditProfileScreen' as never)}>
              <UserInfo
                userName={user.name}
                userEmail={user.email}
                userTelNumber={user.phone}
              />
            </Pressable>
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
                ItemSeparatorComponent={() => (
                  <View style={{height: 20}}></View>
                )}
                scrollEnabled={false}
              />
            </View>
            <View style={styles.signoutContainer}>
              <Pressable onPress={() => signOut()}>
                <View style={styles.signoutItemcontainer}>
                  <SignoutIcon height={24} />
                  <Text style={styles.logoutText}>Cerrar sesión</Text>
                </View>
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
