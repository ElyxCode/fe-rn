import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../styles/colors';
import {CustomNavBar} from '../components/CustomNavBar';
import {SubmitButton} from '../components/SubmitButton';

export const SignUpWelcomeScreen = ({route, navigation}: any) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.PrimaryColor}}>
      {/* <CustomNavBar /> */}
      <View style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/ic_welcome_hand.png')}
            height={217}
            width={217}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.greetingText}>¡Hola, tito!</Text>
          <Text style={styles.descriptionText}>
            Ya puede iniciar a explorar y vivir una nueva experiencia de compra
            en ferreteria
          </Text>
        </View>
      </View>
      <SubmitButton
        onPress={() => {
          navigation.navigate('BiometricDetailScreen');
        }}
        textButton="Comenzar a navegar"
        customStyles={{
          backgroundColor: colors.SecondaryColor,
          marginHorizontal: 30,
          marginBottom: 20,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerText: {
    marginTop: 30,
    paddingHorizontal: 76,
    rowGap: 10,
  },
  greetingText: {
    fontSize: 24,
    color: colors.SecondaryTextColor,
    fontFamily: 'Poppins-Medium',
  },
  descriptionText: {
    fontSize: 14,
    color: colors.White,
    fontFamily: 'Poppins-Medium',
  },
});
