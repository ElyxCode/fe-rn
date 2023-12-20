import {View, StyleSheet, Text, SafeAreaView} from 'react-native';

import {SubmitButton} from '../components/SubmitButton';

import LogoTitle from '../assets/logo_title_home.svg';
import WelcomeBoxCheck from '../assets/welcome_box_check.svg';
import WelcomeSecureWallet from '../assets/welcome_secure_wallet.svg';
import WelcomeBaggageSpanner from '../assets/welcome_baggage_spanner.svg';

import {colors} from '../styles/colors';
import { MapconfirmationProps, MapFlow } from './MapConfirmationScreen';

const svgImageHeight = 75;

export const WelcomeScreen = ({route, navigation}: any) => {
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
            
            navigation.navigate('MapConfirmationScreen',{mapFlow: MapFlow.WelcomeFlow})
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
