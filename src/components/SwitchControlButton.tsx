import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {CustomTextInput} from './CustomTextInput';

import PersonalCardIcon from '../assets/personalcard.svg';
import ReceiptEditIcon from '../assets/receipt_edit.svg';

import {colors} from '../styles/colors';
import {isAndroid} from '../constants/Platform';

type SwitchControlButtonProps = {
  billingSelected: (value: string) => void;
  setDuiNumber: (value: string) => void;
  setFiscalNumber: (value: string) => void;
  dui: string;
  fiscal: string;
  personTypeSelected: (value: string) => void;
};

type BillingButtonProps = {
  name: string;
  value: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

export const BillingInfoLabel = {
  billing: {
    finalConsumer: 'Consumidor final',
    fiscalCredit: 'Crédito fiscal',
  },
  Person: {
    natural: 'Natural',
    juridico: 'Jurídico',
  },
};

export const BillingInfo = {
  billing: {
    finalConsumer: 'final',
    fiscalCredit: 'credit',
  },
  Person: {
    natural: 'natural',
    juridico: 'juridica',
  },
};

export const SwitchControlButton = ({
  billingSelected,
  setDuiNumber,
  setFiscalNumber,
  dui,
  fiscal,
  personTypeSelected,
}: SwitchControlButtonProps) => {
  const [selectedBilling, setSelectedBilling] = useState<string>(
    BillingInfo.billing.finalConsumer,
  );
  const [selectedTypePerson, setSelectedTypePerson] = useState<string>(
    BillingInfo.Person.natural,
  );

  useEffect(() => {
    if (selectedBilling === BillingInfo.billing.finalConsumer) {
      billingSelected(selectedBilling);
      personTypeSelected('');
      setFiscalNumber('');
      setDuiNumber(dui);
    } else {
      billingSelected(selectedBilling);
      setFiscalNumber(fiscal);
      personTypeSelected(selectedTypePerson);
      if (selectedTypePerson === BillingInfo.Person.juridico) {
        setDuiNumber('');
      }
    }
  }, [selectedBilling, selectedTypePerson]);

  const BillingButton = ({
    name,
    value,
    selected,
    setSelected,
  }: BillingButtonProps) => {
    return (
      <Pressable
        onPress={() => {
          setSelected(value);
        }}>
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
          name={BillingInfoLabel.billing.fiscalCredit}
          value={BillingInfo.billing.fiscalCredit}
          selected={selectedBilling}
          setSelected={setSelectedBilling}
        />
      </View>
      <View style={styles.inputDocumentNumberContainer}>
        <CustomTextInput
          keyboardType={isAndroid ? 'numeric' : 'number-pad'}
          onChangeText={(value: any) => {
            selectedBilling === BillingInfo.billing.finalConsumer
              ? setDuiNumber(value)
              : setFiscalNumber(value);
          }}
          value={
            selectedBilling === BillingInfo.billing.finalConsumer ? dui : fiscal
          }
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
              name={BillingInfoLabel.Person.natural}
              value={BillingInfo.Person.natural}
              selected={selectedTypePerson}
              setSelected={setSelectedTypePerson}
            />
            <BillingButton
              name={BillingInfoLabel.Person.juridico}
              value={BillingInfo.Person.juridico}
              selected={selectedTypePerson}
              setSelected={setSelectedTypePerson}
            />
          </View>
          {selectedTypePerson === BillingInfo.Person.natural ? (
            <View style={styles.inputDocumentNumberContainer}>
              <CustomTextInput
                keyboardType={isAndroid ? 'numeric' : 'number-pad'}
                InputIcon={PersonalCardIcon}
                onChangeText={setDuiNumber}
                value={dui}
              />
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
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    width: 150,
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
