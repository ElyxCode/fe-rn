import React from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';

import {CustomNavBar} from '../components/CustomNavBar';
import {CustomTextInput} from '../components/CustomTextInput';
import {SubmitButton} from '../components/SubmitButton';

import CardEditIcon from '../assets/card_edit.svg';

import Messages from '../constants/Messages';
import {isAndroid} from '../constants/Platform';

import {
  normalizeCardNumber,
  normalizeExpirationCard,
  normalizeCvvCard,
  cardsPattern,
  expirationCardPattern,
  cvvPattern,
} from '../utils/utilities';

import {colors} from '../styles/colors';

export const CardFormScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      cardNumber: '',
      expCard: '',
      cvv: '',
      name: '',
    },
  });

  const handleOnSubmit = async ({
    cardNumber,
    expCard,
    cvv,
    name,
  }: {
    cardNumber: string;
    expCard: string;
    cvv: string;
    name: string;
  }) => {
    const newCardRequest = {
      cardNumber: cardNumber.replace(/ /g, ''),
      month: expCard.split('/')[0],
      year: expCard.split('/')[1],
      cvv,
      name,
    };
    console.log({newCardRequest});
  };

  const handleOnError = (errors: any) => {
    console.log({errors});
    if (errors.cardNumber) {
      return Alert.alert(Messages.titleMessage, errors.cardNumber.message, [
        {text: Messages.okButton},
      ]);
    }

    if (errors.expCard) {
      return Alert.alert(Messages.titleMessage, errors.expCard.message, [
        {text: Messages.okButton},
      ]);
    }

    if (errors.cvv) {
      return Alert.alert(Messages.titleMessage, errors.cvv.message, [
        {text: Messages.okButton},
      ]);
    }

    if (errors.name) {
      return Alert.alert(Messages.titleMessage, errors.name.message, [
        {text: Messages.okButton},
      ]);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <ScrollView style={styles.container}>
        <Text style={styles.newCardTitleText}>Nueva tarjeta</Text>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            rules={{
              required: Messages.requiredCardNumber,
              pattern: {
                value: cardsPattern,
                message: Messages.requiredCardNumber,
              },
            }}
            render={({field: {onChange, value, onBlur}}) => (
              <CustomTextInput
                InputIcon={CardEditIcon}
                keyboardType={isAndroid ? 'numeric' : 'number-pad'}
                placeHolder="Número de tarjeta"
                value={value}
                onChangeText={(text: any) =>
                  onChange(normalizeCardNumber(text))
                }
                onBlur={onBlur}
              />
            )}
            name="cardNumber"
          />

          <View
            style={{
              flexDirection: 'row',
              columnGap: 20,
              marginTop: 25,
            }}>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>Nro. de vencimiento</Text>
              <Controller
                control={control}
                rules={{
                  required: Messages.requiredExpirationCard,
                  pattern: {
                    value: expirationCardPattern,
                    message: Messages.requiredExpirationCard,
                  },
                }}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    placeHolder="MM/AA"
                    keyboardType={isAndroid ? 'numeric' : 'number-pad'}
                    value={value}
                    onChangeText={(text: any) =>
                      onChange(normalizeExpirationCard(text))
                    }
                    onBlur={onBlur}
                  />
                )}
                name="expCard"
              />
            </View>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>CVV</Text>
              <Controller
                control={control}
                rules={{
                  required: Messages.requiredCvvCard,
                  pattern: {
                    value: cvvPattern,
                    message: Messages.requiredCvvCard,
                  },
                }}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    placeHolder="123"
                    keyboardType={isAndroid ? 'numeric' : 'number-pad'}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(text: any) =>
                      onChange(normalizeCvvCard(text))
                    }
                  />
                )}
                name="cvv"
              />
            </View>
          </View>
          <View style={{marginTop: 25, rowGap: 5}}>
            <Text style={styles.textInputLabel}>Nombre de tarjeta</Text>
            <Controller
              control={control}
              rules={{required: Messages.requiredCardName}}
              render={({field: {onChange, value, onBlur}}) => (
                <CustomTextInput
                  placeHolder="Ej: Tarjeta personal"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="name"
            />
          </View>
          <SubmitButton
            textButton="Guardar"
            customStyles={{marginTop: 25}}
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
    paddingHorizontal: 41,
  },
  newCardTitleText: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: colors.PrimaryTextColor,
    marginTop: 10,
  },
  formContainer: {
    // flex: 1,
    marginTop: 20,
  },
  textInputContainer: {
    flex: 1,
    rowGap: 5,
  },
  textInputLabel: {
    color: colors.PrimaryTextColor,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});
