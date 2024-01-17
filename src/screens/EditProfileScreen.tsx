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
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {setUser} from '../services/user/userSlice';

import {CustomNavBar} from '../components/CustomNavBar';
import {CustomTextInput} from '../components/CustomTextInput';
import {LoaderScreen} from './LoaderScreen';
import {
  BillingInfo,
  SwitchBillControlButton,
} from '../components/SwitchBillControlButton';
import {SubmitButton} from '../components/SubmitButton';

import {updateUserService} from '../services/user/user';
import {occupationsService} from '../services/occupation';

import UserEditIcon from '../assets/user_edit_darkblue.svg';
import SmsTrackingIcon from '../assets/sms_tracking.svg';
import CallIcon from '../assets/call.svg';
import Profile2UserIcon from '../assets/profile-2user.svg';
import CalendarIcon from '../assets/calendar.svg';

import {Occupation, UserProfile} from '../model/User';

import Messages from '../constants/Messages';
import {isAndroid} from '../constants/Platform';

import {
  dateFormatPattern,
  emailFormatPattern,
  phoneFormatPattern,
  transformBirthDateToSend,
  transformBirthDateUTCTtoDDMMYYYY,
} from '../utils/utilities';

import {colors} from '../styles/colors';

export const EditProfileScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  const userData = useAppSelector(state => state.user.userData);
  const [dui, setDui] = useState<string>(userData.dui ?? '');
  const [fiscal, setFiscal] = useState<string>(userData.iva ?? '');
  const [billing, setBilling] = useState<string>('');
  const [typePerson, setTypePerson] = useState<string>('');
  const navigation = useNavigation();
  const token = useAppSelector(state => state.authToken.token);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  // llama servicio de ocupaciones para llenar el droplist
  useEffect(() => {
    const getOccupationData = async () => {
      const response = await occupationsService();
      if (response.ok) {
        setOccupations(response.data ?? []);
      }
    };

    getOccupationData();
  }, []);

  // setea los valores del usuario en los campos
  useEffect(() => {
    if (userData) {
      setValue('name', userData.name ?? '');
      setValue('email', userData.email ?? '');
      setValue('phone', userData.phone ?? '');
      setValue('occupation', userData.occupation?.id ?? '');
      setValue(
        'birthDate',
        transformBirthDateUTCTtoDDMMYYYY(userData.birthday ?? ''),
      );
    }
  }, [userData]);

  const handleOnSubmit = async ({
    name,
    email,
    phone,
    occupation: value,
    birthDate,
  }: any) => {
    setIsLoading(true);
    if (!dataBillingValidation()) {
      setIsLoading(false);
      return;
    }

    // prepara objeto usuario para enviar
    const data: UserProfile = {
      id: userData.id,
      name,
      email,
      occupation: value,
      dui: dui,
      birthday: transformBirthDateToSend(birthDate ?? ''),
      phone,
      nit: userData.nit,
      iva: fiscal ?? null,
      bill_type: billing !== '' ? billing : '',
      bill_entity: typePerson !== '' ? typePerson : '',
      notifications: userData.notifications,
    };
    await userModifyRequest(data);

    setIsLoading(false);
  };

  const userModifyRequest = async (userData: UserProfile) => {
    const response = await updateUserService(token, userData);
    console.log(response.originalError, token);
    if (response.ok) {
      const {user} = clearObjectData(response.data);
      dispatch(setUser({...user}));
      navigation.goBack();
    } else {
      if (response.data?.error) {
        return Alert.alert(Messages.titleMessage, response.data?.error, [
          {text: Messages.okButton},
        ]);
      }
      return Alert.alert(
        Messages.titleMessage,
        Messages.UnAvailableServerMessage,
        [{text: Messages.okButton}],
      );
    }
  };

  const clearObjectData = (user: any): any => {
    const {message, ...userProp} = user;
    return userProp;
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
    if (billing === BillingInfo.bill.finalConsumer && dui === '') {
      Alert.alert(Messages.titleMessage, Messages.requireDuiProfile, [
        {text: Messages.okButton},
      ]);
      return false;
    }

    if (billing === BillingInfo.bill.fiscalCredit && fiscal === '') {
      Alert.alert(Messages.titleMessage, Messages.requireFiscalNumber, [
        {text: Messages.okButton},
      ]);
      return false;
    }

    if (
      billing === BillingInfo.bill.fiscalCredit &&
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

  if (isLoading) return <LoaderScreen />;

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
                rules={{
                  required: Messages.requireEmailProfile,
                  pattern: {
                    value: emailFormatPattern,
                    message: Messages.requireEmailProfile,
                  },
                }}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    keyboardType="email-address"
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
                rules={{
                  required: Messages.requirePhoneProfile,
                  pattern: {
                    value: phoneFormatPattern,
                    message: Messages.phoneNumberFormatPatternMessage,
                  },
                }}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    placeHolder="Telefono"
                    InputIcon={CallIcon}
                    keyboardType={isAndroid ? 'numeric' : 'number-pad'}
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
                    data={occupations}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={'Elige un rol'}
                    search={false}
                    value={value}
                    onBlur={onBlur}
                    onChange={item => onChange(item.id)}
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
            <SwitchBillControlButton
              personSelected={value => setTypePerson(value)}
              billSelected={value => setBilling(value)}
              setDui={setDui}
              setIva={setFiscal}
              dui={dui}
              iva={fiscal}
              bill={userData.bill_type ?? ''}
              person={userData.bill_entity ?? ''}
            />
          </View>
          <SubmitButton
            textButton="Guardar"
            onPress={handleSubmit(handleOnSubmit, handleOnError)}
            customStyles={{marginBottom: 10}}
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
