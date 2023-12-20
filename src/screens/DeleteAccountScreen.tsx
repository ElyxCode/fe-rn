import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {CustomNavBar} from '../components/CustomNavBar';

import DeleteAccountIcon from '../assets/profile_delete_cyan.svg';
import {colors} from '../styles/colors';
import {SubmitButton} from '../components/SubmitButton';

export const DeleteAccountScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <ScrollView style={styles.container}>
        <DeleteAccountIcon height={45} width={45} style={{marginTop: 10}} />
        <Text style={styles.deleteAccountTitleText}>Eliminación de cuenta</Text>
        <Text style={styles.deleteAccountMessageText}>
          Al eliminar tu cuenta se eliminará tu historial de pedidos y la
          información de tu cuenta
        </Text>
      </ScrollView>
      <View style={{marginHorizontal: 20, marginBottom: 15}}>
        <SubmitButton
          textButton={'Eliminar cuenta'}
          customStyles={{
            backgroundColor: colors.RedColor,
          }}
          onPress={() => navigation.navigate('DeleteAccountModal')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  deleteAccountTitleText: {
    fontSize: 24,
    color: colors.PrimaryTextColor,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
    marginBottom: 15,
  },
  deleteAccountMessageText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: colors.DarkGrayColor,
  },
});
