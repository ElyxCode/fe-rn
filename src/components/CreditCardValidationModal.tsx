import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
} from 'react-native';

import {useForm, Controller} from 'react-hook-form';

import CloseCircleIcon from '../assets/close_circle.svg';

import {isAndroid} from '../constants/Platform';
import {normalizeExpirationCard} from '../utils/utilities';
import {colors} from '../styles/colors';

export type CreditCardValidationModalProps = {
  visible: boolean;
  onSubmit: (val: any) => void;
  onCancel: (err: any) => void;
  lastNumber: string;
};

export const CreditCardValidationModal = ({
  visible,
  lastNumber,
  onSubmit,
  onCancel,
}: CreditCardValidationModalProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      expCard: '',
    },
  });

  const handleCancel = () => {
    onCancel('');
  };

  const handleOnSubmit = ({expCard}: {expCard: string}) => {
    onSubmit(expCard);
    expCard = '';
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.popUpContainer}>
          <View style={styles.closeButtonContainer}>
            <Pressable onPress={() => handleCancel()}>
              <CloseCircleIcon height={25} width={25} />
            </Pressable>
          </View>
          <View style={styles.popUpBody}>
            <Text style={styles.titleText}>Ferreplace</Text>
            <Text style={styles.descriptionText}>
              Para comprar ingresa la fecha de vencimiento de tu tarjeta
              seleccionada **** {lastNumber}
            </Text>
            <Controller
              control={control}
              rules={{}}
              render={({field: {onChange, value, onBlur}}) => (
                <TextInput
                  onChangeText={(text: any) =>
                    onChange(normalizeExpirationCard(text))
                  }
                  onBlur={onBlur}
                  value={value}
                  style={styles.textInput}
                  placeholder="MM/YY"
                  keyboardType={isAndroid ? 'numeric' : 'number-pad'}
                />
              )}
              name="expCard"
            />

            <Text
              style={styles.acceptButtonText}
              onPress={handleSubmit(handleOnSubmit)}>
              Aceptar
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.PopUpBackground,
  },
  popUpContainer: {
    backgroundColor: colors.White,
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
  },
  popUpBody: {
    rowGap: 20,
    paddingHorizontal: 30,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.DarkGrayColor,
    textAlign: 'center',
  },
  descriptionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: colors.DarkGrayColor,
    textAlign: 'center',
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.PrimaryColor,
    alignItems: 'center',
    textAlign: 'center',
    height: 40,
    color: colors.Black,
  },
  acceptButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.SecondaryTextColor,
    marginBottom: 5,
  },
});
