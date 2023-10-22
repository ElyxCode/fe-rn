import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import {useForm, Controller} from 'react-hook-form';

import {CustomNavBar} from '../components/CustomNavBar';
import {CustomTextInput} from '../components/CustomTextInput';
import {
  BillingInfo,
  SwitchControlButton,
} from '../components/SwitchControlButton';
import {SubmitButton} from '../components/SubmitButton';

import UserEditIcon from '../assets/user_edit_darkblue.svg';
import SmsTrackingIcon from '../assets/sms_tracking.svg';
import CallIcon from '../assets/call.svg';
import Profile2UserIcon from '../assets/profile-2user.svg';
import CalendarIcon from '../assets/calendar.svg';

import Messages from '../constants/Messages';

import {colors} from '../styles/colors';

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

const dateFormatPattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

export const EditProfileScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dui, setDui] = useState<string>('');
  const [fiscal, setFiscal] = useState<string>('');
  const [billing, setBilling] = useState<string>('');
  const [typePerson, setTypePerson] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      occupation: '',
      birthDate: '',
    },
  });

  const handleOnSubmit = async ({
    name,
    email,
    phone,
    occupation: value,
    birthDate,
  }: any) => {
    setIsLoading(true);
    if (!dataBillingValidation()) return;
    console.log({
      name,
      email,
      phone,
      occupation: value,
      birthDate: transformBirthDate(birthDate),
      dui,
      fiscal,
      billing,
      typePerson,
    });

    setIsLoading(false);
  };

  const handleOnError = (errors: any) => {
    if (errors.name) {
      return Alert.alert(Messages.titleMessage, errors.name.message, [
        {text: Messages.okButton},
      ]);
    }

    if (errors.email) {
      return Alert.alert(Messages.titleMessage, errors.email.message, [
        {text: Messages.okButton},
      ]);
    }

    if (errors.phone) {
      return Alert.alert(Messages.titleMessage, errors.phone.message, [
        {text: Messages.okButton},
      ]);
    }

    if (errors.role) {
      return Alert.alert(Messages.titleMessage, errors.role.message, [
        {text: Messages.okButton},
      ]);
    }

    if (errors.occupation) {
      return Alert.alert(Messages.titleMessage, errors.occupation.message, [
        {text: Messages.okButton},
      ]);
    }

    if (errors.birthDate) {
      return Alert.alert(Messages.titleMessage, errors.birthDate.message, [
        {text: Messages.okButton},
      ]);
    }
  };

  const dataBillingValidation = (): boolean => {
    if (billing === BillingInfo.billing.finalConsumer && dui === '') {
      Alert.alert(Messages.titleMessage, Messages.requireDuiProfile, [
        {text: Messages.okButton},
      ]);
      return false;
    }

    if (billing === BillingInfo.billing.fiscalCredit && fiscal === '') {
      Alert.alert(Messages.titleMessage, Messages.requireFiscalNumber, [
        {text: Messages.okButton},
      ]);
      return false;
    }

    if (
      billing === BillingInfo.billing.fiscalCredit &&
      typePerson === BillingInfo.Person.natural &&
      dui === ''
    ) {
      Alert.alert(Messages.titleMessage, Messages.requireDuiProfile, [
        {text: Messages.okButton},
      ]);
      return false;
    }

    return true;
  };

  const transformBirthDate = (dateFormat: string): string => {
    let date: string[] = dateFormat.split('/');
    // console.log(date[2] + '-' + date[1] + '-' + date[0]);
    return date[2] + '-' + date[1] + '-' + date[0];
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Editar perfil</Text>
          <View style={styles.inputsContainer}>
            <View>
              <Text style={styles.inputTitleText}>Nombre</Text>
              <Controller
                control={control}
                rules={{required: Messages.requireNameProfile}}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    placeHolder="Nombre"
                    InputIcon={UserEditIcon}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="name"
              />
            </View>
            <View>
              <Text style={styles.inputTitleText}>Correo electrónico</Text>
              <Controller
                control={control}
                rules={{required: Messages.requireEmailProfile}}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    placeHolder="Correo Electrónico"
                    InputIcon={SmsTrackingIcon}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="email"
              />
            </View>
            <View>
              <Text style={styles.inputTitleText}>Celular</Text>
              <Controller
                control={control}
                rules={{required: Messages.requirePhoneProfile}}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    placeHolder="Telefono"
                    InputIcon={CallIcon}
                    keyboardType="numeric"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="phone"
              />
            </View>
            <View>
              <Text style={styles.inputTitleText}>Rol en la construcción</Text>
              <Controller
                control={control}
                rules={{required: Messages.requireRoleProfile}}
                render={({field: {onChange, value, onBlur}}) => (
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
                    onBlur={onBlur}
                    onChange={({value}) => onChange(value)}
                    renderLeftIcon={() => (
                      <Profile2UserIcon
                        height={25}
                        width={25}
                        style={{marginRight: 10}}
                      />
                    )}
                  />
                )}
                name="occupation"
              />
            </View>
            <View>
              <Text style={styles.inputTitleText}>Fecha de nacimiento</Text>
              <Controller
                control={control}
                rules={{
                  required: Messages.requireBirthDayProfile,
                  pattern: {
                    value: dateFormatPattern,
                    message: 'Ingresa formato de fecha correcto',
                  },
                }}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    placeHolder="DD/MM/YYYY"
                    InputIcon={CalendarIcon}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="birthDate"
              />
            </View>
          </View>
          <View style={styles.billingContainer}>
            <Text style={styles.billingTitleText}>
              Información de facturación
            </Text>
            <Text style={styles.billingSubtitleText}>
              ¿Que tipo de facturación deseas?
            </Text>
            <SwitchControlButton
              personTypeSelected={value => setTypePerson(value)}
              billingSelected={value => setBilling(value)}
              setDuiNumber={setDui}
              setFiscalNumber={setFiscal}
              dui={dui}
              fiscal={fiscal}
            />
          </View>
          <SubmitButton
            textButton="Guardar"
            onPress={handleSubmit(handleOnSubmit, handleOnError)}
          />
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
