import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';

import {CustomNavBar} from '../components/CustomNavBar';
import {SubmitButton} from '../components/SubmitButton';

import UserTickIcon from '../assets/user_tick.svg';

import {colors} from '../styles/colors';

export const OptionsUnLoggedScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.PrimaryColor}}>
      <CustomNavBar titleText="Mis Opciones" primaryColorDefault={false} />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <UserTickIcon height={100} />
        </View>
        <View>
          <Text style={styles.primaryText}>Inicia sesión o </Text>
          <Text style={styles.primaryText}>registrate</Text>
          <Text style={styles.secondaryText}>
            y vive una nueva experiencia de
          </Text>
          <Text style={styles.secondaryText}>compra en ferreterias</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <SubmitButton
          textButton="Comenzar"
          customStyles={{backgroundColor: colors.SecondaryColor}}
          onPress={() => navigation.navigate('LoginScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  imageContainer: {
    marginBottom: 20,
  },
  primaryText: {
    textAlign: 'left',
    color: colors.SecondaryTextColor,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  secondaryText: {
    color: colors.White,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    marginBottom: 20,
    paddingHorizontal: 35,
  },
});
