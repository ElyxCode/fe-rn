import {useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView, Platform} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {setToken} from '../services/auth/authSlice';

import {SubmitButton} from '../components/SubmitButton';

import {MapFlow} from './MapConfirmationScreen';

import LogoTitle from '../assets/logo_title_home.svg';
import WelcomeBoxCheck from '../assets/welcome_box_check.svg';
import WelcomeSecureWallet from '../assets/welcome_secure_wallet.svg';
import WelcomeBaggageSpanner from '../assets/welcome_baggage_spanner.svg';

import {colors} from '../styles/colors';
import {isAndroid} from '../constants/Platform';
import Messages from '../constants/Messages';

const svgImageHeight = 75;

export const WelcomeScreen = ({route, navigation}: any) => {
  const authToken = useAppSelector(state => state.authToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleRequestPermissionNotifications();
  }, []);

  const handleRequestPermissionNotifications = async () => {
    if (isAndroid) {
      if (Platform.Version >= '33') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Ferreplace App Notifications Permission',
              message: 'Ferreplace App needs to send notifications',
              buttonNegative: Messages.cancelButton,
              buttonPositive: Messages.okButton,
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            checkToken();
          } else {
            dispatch(setToken({...authToken, fcmToken: ''}));
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        checkToken();
      }
    } else {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        checkToken();
      } else {
        dispatch(setToken({...authToken, fcmToken: ''}));
      }
    }
  };

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log({fcmToken});
      dispatch(setToken({...authToken, fcmToken}));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.LogoContainer}>
        <LogoTitle />
      </View>
      <View style={styles.descriptionAppContainer}>
        <View>
          <Text>
            <Text style={styles.titleTextFirstLineFirstWord}>Comprar </Text>
            <Text style={styles.titleTextFirstLineSecondWord}>en</Text>
          </Text>
          <Text>
            <Text style={styles.titleTextSecondLineFirstWord}>
              Ferreterias{' '}
            </Text>
            <Text style={styles.titleTextSeconfLineSecondWord}>nunca</Text>
          </Text>
          <Text style={styles.titleTextThirdLine}>había sido tan fácil</Text>
        </View>
        <View>
          <View style={styles.featureDescriptionAppContainer}>
            <WelcomeBaggageSpanner height={svgImageHeight} />
            <View>
              <Text style={styles.textDescription}>Las mejores</Text>
              <Text style={styles.textDescription}>ferreterias en un</Text>
              <Text style={styles.textDescription}>solo lugar</Text>
            </View>
          </View>
          <View style={styles.featureDescriptionAppContainer}>
            <WelcomeBoxCheck height={svgImageHeight} />
            <View>
              <Text style={styles.textDescription}>Recibe tus pedidos</Text>
              <Text style={styles.textDescription}>en tu casa o</Text>
              <Text style={styles.textDescription}>proyecto</Text>
            </View>
          </View>
          <View style={styles.featureDescriptionAppContainer}>
            <WelcomeSecureWallet height={svgImageHeight} />
            <View>
              <Text style={styles.textDescription}>Paga de forma</Text>
              <Text style={styles.textDescription}>segura</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{margin: 30}}>
        <SubmitButton
          textButton="Comenzar"
          onPress={() => {
            navigation.navigate('MapConfirmationScreen', {
              mapFlow: MapFlow.WelcomeFlow,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
    justifyContent: 'space-between',
  },
  descriptionAppContainer: {
    alignItems: 'center',
  },
  LogoContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  titleTextFirstLineFirstWord: {
    color: colors.PrimaryTextColor,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  titleTextFirstLineSecondWord: {
    color: colors.SecondaryTextColor,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  titleTextSecondLineFirstWord: {
    color: colors.SecondaryTextColor,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  titleTextSeconfLineSecondWord: {
    color: colors.PrimaryTextColor,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  titleTextThirdLine: {
    color: colors.PrimaryTextColor,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  textDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  featureDescriptionAppContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    columnGap: 35,
  },
});
