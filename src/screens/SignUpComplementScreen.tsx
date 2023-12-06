import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';
import {Dropdown} from 'react-native-element-dropdown';

import {CustomNavBar} from '../components/CustomNavBar';
import {CustomTextInput} from '../components/CustomTextInput';
import {SubmitButton} from '../components/SubmitButton';

import {LoaderScreen} from './LoaderScreen';

import {occupationsService} from '../services/occupation';

import {Occupation} from '../model/User';

import EditProfileIcon from '../assets/user_edit.svg';
import CalendarIcon from '../assets/calendar.svg';
import PersonalCardIcon from '../assets/personalcard.svg';
import Profile2UserIcon from '../assets/profile-2user.svg';

import {dateFormatPattern} from '../utils/utilities';
import {isAndroid} from '../constants/Platform';
import Messages from '../constants/Messages';
import {colors} from '../styles/colors';

export const SignUpComplementScreen = ({route, navigation}: any) => {
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      birthDate: '',
      dui: '',
      occupation: '',
    },
  });

  useEffect(() => {
    const getOccupationData = async () => {
      setIsLoading(true);
      const response = await occupationsService();
      if (response.ok) {
        setOccupations(response.data ?? []);
      }
      setIsLoading(false);
    };

    getOccupationData();
  }, []);

  const handleOnSubmit = async ({birthDate, dui, occupation: value}: any) => {
    setIsLoading(true);
    // console.log({birthDate, dui, value});
    navigation.navigate('SignUpWelcomeScreen');
    setIsLoading(false);
  };

  const handleOnError = (errors: any) => {
    if (errors.birthDate) {
      return Alert.alert(Messages.titleMessage, errors.birthDate.message, [
        {text: Messages.okButton},
      ]);
    }

    if (errors.dui) {
      return Alert.alert(Messages.titleMessage, errors.dui.message, [
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
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <ScrollView style={styles.container}>
        <EditProfileIcon height={45} width={45} style={{marginTop: 10}} />
        <Text style={[styles.titleText, {marginTop: 15}]}>Registrate</Text>
        <Text style={[styles.messageText, {marginTop: 10}]}>
          Completa tu perfil
        </Text>
        <View style={styles.formContainer}>
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
          <Controller
            control={control}
            rules={{required: Messages.requireDuiProfile}}
            render={({field: {onChange, value, onBlur}}) => (
              <CustomTextInput
                InputIcon={PersonalCardIcon}
                placeHolder="Dui"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType={isAndroid ? 'numeric' : 'number-pad'}
              />
            )}
            name="dui"
          />
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
        <SubmitButton
          onPress={handleSubmit(handleOnSubmit, handleOnError)}
          textButton="Confirmar"
          customStyles={{marginTop: 40, marginBottom: 30}}
        />
        <Pressable>
          <Text style={styles.completeLaterText}>Completar más tarde</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 41,
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: colors.PrimaryTextColor,
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: colors.DarkGrayColor,
  },
  formContainer: {
    marginTop: 25,
    rowGap: 15,
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
  completeLaterText: {
    fontSize: 16,
    color: colors.SecondaryTextColor,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
});
