import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';

import {CustomNavBar} from '../components/CustomNavBar';
import {CustomTextInput} from '../components/CustomTextInput';

import UserEditIcon from '../assets/user_edit_darkblue.svg';
import SmsTrackingIcon from '../assets/sms_tracking.svg';
import CallIcon from '../assets/call.svg';
import Profile2UserIcon from '../assets/profile-2user.svg';
import CalendarIcon from '../assets/calendar.svg';

const dropListItem = [
  {value: 'Albañil', label: 'Albañil'},
  {value: 'Ama de casa', label: 'Ama de casa'},
  {value: 'Arquitecto', label: 'Arquitecto'},
  {value: 'Carpintería', label: 'Carpintería'},
  {value: 'Cerrajería', label: 'Cerrajería'},
  {value: 'Decorador', label: 'Decorador'},
  {value: 'Diseñador de interiores', label: 'Diseñador de interiores'},
  {value: 'Electricista', label: 'Electricista'},
  {value: 'Ingeniero Civil', label: 'Ingeniero Civil'},
  {value: 'Maestro de obra', label: 'Maestro de obra'},
  {value: 'Otros', label: 'Otros'},
  {value: 'Pintor', label: 'Pintor'},
];

import {colors} from '../styles/colors';
import {SwitchControlButton} from '../components/SwitchControlButton';
import {SubmitButton} from '../components/SubmitButton';

export const EditProfileScreen = () => {
  const [value, setValue] = useState<string>('');
  // const [isFocus, setIsFocus] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Editar perfil</Text>
          <View style={styles.inputsContainer}>
            <View>
              <Text style={styles.inputTitleText}>Nombre</Text>
              <CustomTextInput InputIcon={UserEditIcon} />
            </View>
            <View>
              <Text style={styles.inputTitleText}>Correo electrónico</Text>
              <CustomTextInput InputIcon={SmsTrackingIcon} />
            </View>
            <View>
              <Text style={styles.inputTitleText}>Celular</Text>
              <CustomTextInput InputIcon={CallIcon} keyboardType="numeric" />
            </View>
            <View>
              <Text style={styles.inputTitleText}>Rol en la construcción</Text>
              <Dropdown
                style={[styles.roleContainer]}
                mode="modal"
                data={dropListItem}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Elige un rol'}
                search={false}
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
                renderLeftIcon={() => (
                  <Profile2UserIcon
                    height={25}
                    width={25}
                    style={{marginRight: 10}}
                  />
                )}
              />
            </View>
            <View>
              <Text style={styles.inputTitleText}>Fecha de nacimiento</Text>
              <CustomTextInput InputIcon={CalendarIcon} />
            </View>
          </View>
          <View style={styles.billingContainer}>
            <Text style={styles.billingTitleText}>
              Información de facturación
            </Text>
            <Text style={styles.billingSubtitleText}>
              ¿Que tipo de facturación deseas?
            </Text>
            <SwitchControlButton />
          </View>
          <SubmitButton textButton="Guardar" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  titleText: {
    color: colors.PrimaryColor,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    paddingBottom: 25,
    paddingTop: 10,
  },
  inputsContainer: {
    rowGap: 10,
  },
  inputTitleText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: colors.PrimaryColor,
    marginBottom: 5,
  },
  billingContainer: {
    paddingTop: 20,
    rowGap: 15,
  },
  billingTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.PrimaryColor,
  },
  billingSubtitleText: {
    fontSize: 14,
    color: colors.LightGrayColor,
    fontFamily: 'Poppins-Medium',
  },
  roleContainer: {
    backgroundColor: colors.White,
    borderColor: colors.PrimaryColor,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
