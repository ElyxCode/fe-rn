import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {CustomTextInput} from './CustomTextInput';

import PersonalCardIcon from '../assets/personalcard.svg';
import ReceiptEditIcon from '../assets/receipt_edit.svg';

import {colors} from '../styles/colors';

type BillingButtonProps = {
  name: string;
  value: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const BillingInfo = {
  billing: {
    finalConsumer: 'Consumidor final',
    fiscalCredit: 'Crédito fiscal',
  },
  Person: {
    natural: 'Natural',
    juridico: 'Jurídico',
  },
};

export const SwitchControlButton = () => {
  const [selectedBilling, setSelectedBilling] = useState<string>('');
  const [selectedTypePerson, setSelectedTypePerson] = useState<string>('');

  const BillingButton = ({
    name,
    value,
    selected,
    setSelected,
  }: BillingButtonProps) => {
    return (
      <Pressable onPress={() => setSelected(value)}>
        <View
          style={[
            styles.buttonContainer,
            {
              backgroundColor:
                selected === value ? colors.SecondaryColor : colors.White,
              borderColor:
                selected === value
                  ? colors.SecondaryColor
                  : colors.PrimaryColor,
            },
          ]}>
          <Text
            style={[
              styles.buttonTitleText,
              {
                color:
                  selected === value ? colors.White : colors.PrimaryTextColor,
              },
            ]}>
            {name}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <BillingButton
          name={'Consumidor\n        final'}
          value={BillingInfo.billing.finalConsumer}
          selected={selectedBilling}
          setSelected={setSelectedBilling}
        />
        <BillingButton
          name={BillingInfo.billing.fiscalCredit}
          value={BillingInfo.billing.fiscalCredit}
          selected={selectedBilling}
          setSelected={setSelectedBilling}
        />
      </View>
      <View style={styles.inputDocumentNumberContainer}>
        <CustomTextInput
          InputIcon={
            selectedBilling === BillingInfo.billing.finalConsumer
              ? PersonalCardIcon
              : ReceiptEditIcon
          }
        />
      </View>
      {selectedBilling === BillingInfo.billing.fiscalCredit ? (
        <View style={styles.personTypeContainer}>
          <Text style={styles.inputTitleText}>Tipo de Persona</Text>
          <View style={styles.buttonsContainer}>
            <BillingButton
              name={BillingInfo.Person.natural}
              value={BillingInfo.Person.natural}
              selected={selectedTypePerson}
              setSelected={setSelectedTypePerson}
            />
            <BillingButton
              name={BillingInfo.Person.juridico}
              value={BillingInfo.Person.juridico}
              selected={selectedTypePerson}
              setSelected={setSelectedTypePerson}
            />
          </View>
          {selectedTypePerson === BillingInfo.Person.natural ? (
            <View style={styles.inputDocumentNumberContainer}>
              <CustomTextInput InputIcon={PersonalCardIcon} />
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.White,
  },
  buttonTitleText: {
    color: colors.PrimaryTextColor,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  inputDocumentNumberContainer: {
    marginBottom: 20,
    marginTop: 5,
  },
  inputTitleText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: colors.PrimaryColor,
    marginBottom: 15,
  },
  personTypeContainer: {
    marginBottom: 10,
  },
});
