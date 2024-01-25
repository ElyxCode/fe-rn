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

import CloseCircleIcon from '../assets/close_circle.svg';

import {colors} from '../styles/colors';

export type CreditCardValidationErrorModalProps = {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PhoneRequiredModal = ({
  visible,
  setIsVisible,
}: CreditCardValidationErrorModalProps) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.popUpContainer}>
          <View style={styles.closeButtonContainer}>
            <Pressable onPress={() => setIsVisible(false)}>
              <CloseCircleIcon height={25} width={25} />
            </Pressable>
          </View>
          <View style={styles.popUpBody}>
            <Text style={styles.titleText}>Ferreplace</Text>
            <Text style={styles.descriptionText}>
              Para completar la orden y poder contactarte, es necesario que
              ingreses tu número de teléfono
            </Text>

            <Text
              style={styles.acceptButtonText}
              onPress={() => setIsVisible(false)}>
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
    marginVertical: 20,
  },
  acceptButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.SecondaryTextColor,
    marginBottom: 5,
  },
});
