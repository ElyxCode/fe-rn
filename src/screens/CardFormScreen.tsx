import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {LoaderScreen} from './LoaderScreen';

import {createCardService} from '../services/card/card';
import {setCardConfirmAdded} from '../services/card/cardSlice';

import {Card, CardRequest} from '../model/Card';

import {CustomNavBar} from '../components/CustomNavBar';
import {CustomTextInput} from '../components/CustomTextInput';
import {SubmitButton} from '../components/SubmitButton';

import CardEditIcon from '../assets/card_edit.svg';

import Messages from '../constants/Messages';

import {colors} from '../styles/colors';

import {
  normalizeCardNumber,
  normalizeExpirationCard,
  normalizeCvvCard,
  cardsPattern,
  expirationCardPattern,
  cvvPattern,
} from '../utils/utilities';

import {isAndroid} from '../constants/Platform';

export const CardFormScreen = ({navigation, route}: any) => {
  const {confirmOrder} = route.params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = useAppSelector(state => state.authToken.token);
  const dispatch = useAppDispatch();
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
    setIsLoading(true);
    const newCardRequest: CardRequest = {
      number: cardNumber.replace(/ /g, ''),
      month: expCard.split('/')[0],
      year: expCard.split('/')[1],
      cvc: cvv,
      name,
    };

    const response = await createCardService(token, newCardRequest);

    if (response.ok) {
      if (response.data?.last_numbers) {
        const AsyncAlert = async () =>
          new Promise(resolve => {
            Alert.alert(
              Messages.titleMessage,
              Messages.cardAddedSuccessMessage,
              [
                {
                  text: Messages.okButton,
                  onPress: () => {
                    if (confirmOrder) {
                      const newCard: Card = {
                        id: response.data?.id ?? -1,
                        name: response.data?.name ?? '',
                        last_numbers: response.data?.last_numbers ?? '',
                        month: newCardRequest.month,
                        year: newCardRequest.year,
                        verified: response.data?.verified ?? false,
                        active: response.data?.active ?? false,
                      };
                      dispatch(setCardConfirmAdded({...newCard}));
                    }
                    resolve('YES');
                    navigation.goBack();
                  },
                },
              ],
              {cancelable: false},
            );
          });

        return await AsyncAlert();
      }

      if (response.data?.errors) {
        let messageError =
          (response.data?.errors?.name ? response.data?.errors?.name[0] : '') +
          '\n' +
          (response.data?.errors?.number
            ? response.data?.errors?.number[0]
            : '') +
          '\n' +
          (response.data?.errors?.month
            ? response.data?.errors?.month[0]
            : '') +
          '\n' +
          (response.data?.errors?.year ? response.data?.errors?.year[0] : '') +
          '\n' +
          (response.data?.errors?.cvc ? response.data?.errors?.cvc[0] : '');
        setIsLoading(false);
        return Alert.alert(Messages.titleMessage, messageError, [
          {text: Messages.okButton},
        ]);
      }
    } else {
      setIsLoading(false);
      return Alert.alert(Messages.titleMessage, response.data?.message, [
        {text: Messages.okButton},
      ]);
    }

    if (response == null) {
      setIsLoading(false);
      return Alert.alert(
        Messages.titleMessage,
        Messages.UnAvailableServerMessage,
        [{text: Messages.okButton}],
      );
    }
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

  if (isLoading) return <LoaderScreen />;

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
