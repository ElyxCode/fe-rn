import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {updateDeviceIdService} from '../services/user/user';

import {SubmitButton} from '../components/SubmitButton';

import {getPlatformDevice} from '../utils/utilities';
import {colors} from '../styles/colors';

export const SignUpWelcomeScreen = ({route, navigation}: any) => {
  const {token, name, email} = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.PrimaryColor}}>
      <View style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/ic_welcome_hand.png')}
            height={217}
            width={217}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.greetingText}>¡Hola, {name}!</Text>
          <Text style={styles.descriptionText}>
            Ya puede iniciar a explorar y vivir una nueva experiencia de compra
            en ferreteria
          </Text>
        </View>
      </View>
      <SubmitButton
        onPress={async () => {
          // navigation.navigate('BiometricDetailScreen');
          //TODO:push notification
          await updateDeviceIdService(
            token,
            name,
            email,
            '',
            getPlatformDevice(),
          );
          navigation.navigate('HomeBranchScreen');
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
